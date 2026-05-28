import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        search: resolve(__dirname, 'search.html'),
        book: resolve(__dirname, 'book.html'),
        reader: resolve(__dirname, 'reader.html'),
        browse: resolve(__dirname, 'browse.html'),
        about: resolve(__dirname, 'about.html'),
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});