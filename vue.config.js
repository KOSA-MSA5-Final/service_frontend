const { defineConfig } = require('@vue/cli-service');
const fs = require('fs');
const path = require('path');

const host = "localhost";
const port = "8081";

let httpsOptions = null;
try {
  httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, ".cert", "localhost-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, ".cert", "localhost.pem")),
  };
} catch (err) {
  console.error("HTTPS 인증서 파일을 읽는 중 오류 발생:", err.message);
  console.error("HTTPS 서버를 시작할 수 없습니다. 인증서 파일 경로를 확인하세요.");
}

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, '../resources/static'),
  devServer: {
    https: httpsOptions,
    host: host,
    port: 8080, // Vue CLI의 기본 포트입니다. 필요하다면 변경하세요.
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
        target: `http://${host}:${port}`, // 로그인 서버
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
