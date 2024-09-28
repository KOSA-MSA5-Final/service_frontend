import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = 'http://localhost:8081';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        email: '',
        password: ''
    }),
    actions: {
        async login() {
            try {
                const response = await axios.post(`${baseUrl}/auth/login`, {
                    email: this.email,
                    password: this.password
                });

                if (response && response.data && response.data.accessToken) {
                    this.token = response.data.accessToken;
                    localStorage.setItem('token', this.token);
                    window.location.href = '/main'; // 로그인 성공 후 메인 페이지로 리다이렉트
                    console.log(this.email);
                } else {
                    console.error('토큰을 가져오지 못했습니다.');
                }
            } catch (error) {
                if (error.response) {
                    // 요청이 만들어졌고 서버가 상태 코드로 응답했습니다
                    console.error('요청이 만들어졌고 서버가 상태 코드로 응답했습니다', error.response.data);
                    alert(`로그인이 실패했습니다: ${error.response.data.message}`);
                } else {
                    // 요청이 만들어지지 않았거나 오류가 발생함
                    console.error('요청이 만들어지지 않았거나 오류가 발생함', error.message);
                    alert('로그인이 실패했습니다');
                }
            }
        }
    }
});
