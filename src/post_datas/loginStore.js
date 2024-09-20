import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = 'http://localhost:9000';

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
                } else {
                    console.error('토큰을 가져오지 못했습니다.');
                }
            } catch (error) {
                console.error('로그인이 실패했습니다', error);
                alert("아이디나 패스워드가 다릅니다");
            }
        }
    }
});
