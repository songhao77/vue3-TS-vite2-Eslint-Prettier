import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     '@': resolve('./src'),
  //     comps: resolve('./src/components')
  //   }
  // },
  server: {
    port: 9020,
    proxy: {
      '/api': {
        target: 'http://aider.meizu.com',
        // target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
