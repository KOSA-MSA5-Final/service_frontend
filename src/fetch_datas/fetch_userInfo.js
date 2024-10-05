import { defineStore } from 'pinia';
import axios from 'axios';

// 유저의 Member 정보와 모든 프로필들을 가져오는 함수

export const fetch_userInfo = defineStore('userInfoAll', {
    state: () => ({
        contents: [], // 여기에 메시지를 받아오기 위해 다른 state를 추가할 수도 있음.
    }),
    actions: {
        async fetchContents() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://localhost:8081/auth/userinfo-all', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
                    },
                });
                this.contents = Array.isArray(response.data) ? response.data : []; // 데이터가 배열인지 확인
                console.log('Fetched content:', this.contents); // 확인용 로그
            } catch (err) {
                console.error('Fetch ERROR!', err);
            }
        },
    },
});
