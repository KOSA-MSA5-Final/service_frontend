import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

// Vue 애플리케이션을 생성
const app = createApp(App);

// Axios를 글로벌 프로퍼티로 추가
app.config.globalProperties.$axios = axios;

// Vue Router가 있다면 여기에 추가
// app.use(routes);

// Vue 애플리케이션을 #app 요소에 마운트
app.mount('#app');
