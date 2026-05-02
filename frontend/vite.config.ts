import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'MyCard',
      fileName: () => 'main.js',
      formats: ['es'],
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [],
      output: {
        inlineDynamicImports: true,
      },
    },
    minify: true,
    target: 'esnext',
    
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.runtime.esm-bundler.js',
    },
  },
})
