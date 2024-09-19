import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routes/index'; // 라우터 가져오기
import axios from 'axios';

const app = createApp(App);

// Axios 전역 설정
app.config.globalProperties.$axios = axios;

// 라우터 사용
app.use(router);

// 애플리케이션 마운트
app.mount('#app');
