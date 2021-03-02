import type { UserConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

const pathResolve = (dir: string) => {
  return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('src'),
}

const viteConfig: UserConfig = {
  root: process.cwd(),
  base: './',
  alias,
  css: {
    // sass: {
    //   includePaths: ['path/to/sass/deps'],
    // },
  },

  optimizeDeps: {
    include: ['axios', '@kangc/v-md-editor/lib/theme/vuepress.js'],
  },
  server: {
    port: 9526,
    proxy: {
      // with options
      '/api': {
        target: 'http://localhost:3000/web/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/uploads': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    },
    hmr: { overlay: true }
  },
  plugins: [vue()],
}

export default viteConfig
