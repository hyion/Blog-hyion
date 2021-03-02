import type { UserConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

const pathResolve = (dir: string) => {
  return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
  '@': pathResolve('src'),
}

const viteConfig = {
  root: process.cwd(),
  port: '9526',
  base: './',
  open: false,
  alias,
  cssPreprocessOptions: {
    sass: {
      includePaths: ['path/to/sass/deps'],
    },
  },

  optimizeDeps: {
    include: ['axios', '@kangc/v-md-editor/lib/theme/vuepress.js'],
  },
  server: {
    proxy: {
      // string shorthand
      // '/foo': 'http://localhost:4567/foo',
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
      // with RegEx
      // '^/fallback/.*': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/fallback/, '')
      // }
    },
  },
  plugins: [vue()],
  hmr: {overlay: false}
}

export default viteConfig
