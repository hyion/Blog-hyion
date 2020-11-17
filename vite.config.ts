  
import path from 'path';

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

module.exports = {
  // hostname: '0.0.0.0',
  base: './',
  port: 9527,
  open: false, // 是否自动在浏览器打开
  https: false, // 是否开启 https
  ssr: false, // 服务端渲染
  alias: {
    '/@/': pathResolve('./src'),
    '/@/views': pathResolve('./src/views'),
    '/@/api': pathResolve('./src/api'),
    '/@/components': pathResolve('./src/components'),
    '/@/utils': pathResolve('./src/utils')
  },
  proxy: {
    // '/lsbdb': 'http://10.192.195.96:3088/',
    // string shorthand
    // '/foo': 'http://localhost:4567/foo',
    // // with options
    '/api': {
      target: 'http://localhost:3000/web/api',
      changeOrigin: true,
      rewrite: {
        '^/api': '/'
      },
      // rewrite: path => path.replace(/^\/api/, '')
    },
    '/uploads': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
    },
  },
  optimizeDeps: {
    include: ['axios']
  },
  cssPreprocessOptions: {
    sass: {
      includePaths: ['path/to/sass/deps']
    }
  },
}
