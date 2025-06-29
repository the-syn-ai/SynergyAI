// Basic Vite configuration for server import
export default {
  root: 'client',
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: true,
  },
  define: {
    'process.env': {},
  },
}; 