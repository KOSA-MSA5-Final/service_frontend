const { defineConfig } = require('@vue/cli-service');
const host = "localhost"; // back-end host
const port = "8080"; // back-end port

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../resources/static', // Build Directory
  devServer: {
    hot: true,
    proxy: {
      '/api/': {
        target: `http://${host}:${port}`,
        changeOrigin: true,
      },
      '/ws/': {
        target: `ws://${host}:${port}`,
        changeOrigin: false,
        ws: true,
      }, 
      '/auth': {
        target: 'http://localhost:9000', // 로그인 서버
        changeOrigin: true,
        pathRewrite: { '^/auth': '' }
      }
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.d\.ts$/, // TypeScript 정의 파일을 무시하도록 설정
          loader: 'ignore-loader',
        },
      ],
    },
  },
});
