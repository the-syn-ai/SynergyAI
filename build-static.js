#!/usr/bin/env node

/**
 * Build script to create a static version of SynergyAI website
 * suitable for shared hosting providers like Hostinger
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create static build directory
const staticDir = path.join(__dirname, 'static-build');
const clientDir = path.join(__dirname, 'client');

// Ensure static build directory exists
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

console.log('🚀 Building static version for Hostinger deployment...');

// Copy client files
console.log('📁 Copying client files...');
copyDirectory(path.join(clientDir, 'src'), path.join(staticDir, 'src'));
copyDirectory(path.join(clientDir, 'public'), path.join(staticDir, 'public'));

// Copy and modify index.html
console.log('📄 Processing index.html...');
const indexHtml = fs.readFileSync(path.join(clientDir, 'index.html'), 'utf-8');
fs.writeFileSync(path.join(staticDir, 'index.html'), indexHtml);

// Create package.json for static build
console.log('📦 Creating package.json...');
const staticPackageJson = {
  "name": "synergyai-static",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/react": "^18.3.20",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vite": "^5.4.10"
  },
  "dependencies": {
    "@headlessui/react": "^2.2.0",
    "@hookform/resolvers": "^3.9.1",
    "@radix-ui/react-accordion": "^1.2.1",
    "@radix-ui/react-alert-dialog": "^1.1.2",
    "@radix-ui/react-avatar": "^1.1.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-popover": "^1.1.2",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "@radix-ui/react-tooltip": "^1.1.3",
    "@tanstack/react-query": "^5.60.5",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "framer-motion": "^11.18.2",
    "lucide-react": "^0.453.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.1",
    "react-icons": "^5.4.0",
    "sonner": "^2.0.1",
    "tailwind-merge": "^2.5.4",
    "tailwindcss-animate": "^1.0.7",
    "wouter": "^3.3.5",
    "zod": "^3.23.8"
  }
};

fs.writeFileSync(
  path.join(staticDir, 'package.json'),
  JSON.stringify(staticPackageJson, null, 2)
);

// Create vite.config.js for static build
console.log('⚡ Creating Vite config...');
const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
})`;

fs.writeFileSync(path.join(staticDir, 'vite.config.js'), viteConfig);

// Copy configuration files
console.log('⚙️ Copying configuration files...');
const configFiles = ['tailwind.config.ts', 'postcss.config.js', 'tsconfig.json'];
configFiles.forEach(file => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(staticDir, file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
  }
});

// Create mock API responses for static version
console.log('🔧 Creating mock API responses...');
const mockApiDir = path.join(staticDir, 'public', 'api');
if (!fs.existsSync(mockApiDir)) {
  fs.mkdirSync(mockApiDir, { recursive: true });
}

// Mock website analysis API
const mockAnalysisResponse = {
  performance: {
    score: 85,
    metrics: {
      fcp: '1.2s',
      lcp: '2.1s',
      cls: '0.05',
      fid: '45ms'
    }
  },
  seo: {
    score: 92,
    issues: ['Consider adding more internal links'],
    recommendations: ['Add schema markup', 'Optimize meta descriptions']
  },
  accessibility: {
    score: 88,
    issues: ['Some images missing alt text'],
    recommendations: ['Add ARIA labels', 'Improve color contrast']
  },
  security: {
    score: 78,
    headers: {},
    issues: ['Missing security headers'],
    recommendations: ['Add CSP headers', 'Implement HSTS']
  },
  suggestions: [
    'Optimize images for better performance',
    'Add structured data markup',
    'Improve mobile responsiveness'
  ],
  summary: 'Good performance overall. Focus on security and accessibility improvements.'
};

fs.writeFileSync(
  path.join(mockApiDir, 'analyze-website.json'),
  JSON.stringify(mockAnalysisResponse, null, 2)
);

// Create deployment instructions
console.log('📋 Creating deployment instructions...');
const deploymentInstructions = `# SynergyAI - Static Deployment Instructions for Hostinger

## 🚀 Quick Deployment Steps:

### 1. Build the Static Site:
\`\`\`bash
cd static-build
npm install
npm run build
\`\`\`

### 2. Upload to Hostinger:
- Upload the contents of \`static-build/dist/\` to your Hostinger \`public_html\` folder
- Make sure \`index.html\` is in the root of \`public_html\`

### 3. Configure Domain:
- Point your domain to the Hostinger hosting
- Ensure SSL certificate is enabled

## 📁 File Structure After Upload:
\`\`\`
public_html/
├── index.html
├── assets/
│   ├── css/
│   └── js/
└── api/
    └── analyze-website.json
\`\`\`

## 🔧 Features in Static Version:
✅ Full responsive design
✅ All UI components and animations
✅ Contact forms (will need form handler)
✅ Mock website analysis (replace with real API later)
✅ SEO optimized
✅ Fast loading

## 🌐 Form Handling:
For contact forms to work, you'll need to:
1. Use Hostinger's form handler
2. Or integrate with services like Formspree, Netlify Forms, or EmailJS

## 📞 Support:
- The static version maintains all visual features
- Real-time AI analysis will show demo data
- All animations and interactions work perfectly
`;

fs.writeFileSync(path.join(staticDir, 'DEPLOYMENT.md'), deploymentInstructions);

console.log('✅ Static build complete!');
console.log('📁 Files created in: ./static-build/');
console.log('📖 Read DEPLOYMENT.md for upload instructions');

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
} 