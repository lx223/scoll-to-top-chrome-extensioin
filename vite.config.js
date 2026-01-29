import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { cpSync, unlinkSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    {
      name: 'copy-extension',
      closeBundle() {
        cpSync(resolve(__dirname, 'src'), resolve(__dirname, 'dist'), {
          recursive: true,
        });
        for (const name of ['_vite_tmp.js', '_vite_entry.js']) {
          const p = resolve(__dirname, 'dist', name);
          if (existsSync(p)) unlinkSync(p);
        }
      },
    },
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/_vite_entry.js'),
      output: {
        entryFileNames: '_vite_tmp.js',
      },
    },
  },
});
