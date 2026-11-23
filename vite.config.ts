import { defineConfig } from 'vite';
import { readdirSync } from 'fs';
import path from 'path';

const htmlInputs = Object.fromEntries(
  readdirSync(__dirname)
    .filter((file) => file.endsWith('.html'))
    .map((file) => [path.basename(file, '.html'), path.resolve(__dirname, file)])
);

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: '_vite',
    sourcemap: false,
    rollupOptions: {
      input: htmlInputs,
    },
  },
});
