import { spawn } from 'child_process';
import { createSpinner } from 'nanospinner';

const runCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: 'inherit' });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    proc.on('error', (err) => {
      reject(err);
    });
  });
};

const main = async () => {
  const spinner = createSpinner('Running database migrations...').start();
  
  try {
    await runCommand('npx', ['drizzle-kit', 'push']);
    spinner.success({ text: 'Database migrations completed successfully' });
  } catch (error) {
    spinner.error({ text: `Database migration failed: ${error.message}` });
    process.exit(1);
  }
};

main();