<template>
    <div>
        <h1>User Information</h1>
        <div v-if="userInfo">
            <p><strong>Username:</strong> {{ userInfo.username }}</p>
            <p><strong>Email:</strong> {{ userInfo.email }}</p>
            <p><strong>Name:</strong> {{ userInfo.name }}</p>
            <p><strong>Role:</strong> {{ userInfo.role }}</p>
            <p><strong>Phone Number:</strong> {{ userInfo.telNum }}</p>
        </div>
        <div v-else>
            <p>Loading user information...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userInfo: null // 사용자 정보를 저장할 변수
        };
    },
    async mounted() {
        console.log("안녕");
        await this.fetchUserInfo(); // 컴포넌트가 마운트될 때 사용자 정보 가져오기
    },
    methods: {
        async fetchUserInfo() {
            console.log("나야");
            const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
            console.log(token);
            try {
                const response = await axios.get('http://localhost:8081/auth/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
                    },
                });

                this.userInfo = response.data; // 사용자 정보 저장
                console.log('User Info:', this.userInfo); // 사용자 정보 출력
            } catch (error) {
                console.error('Failed to fetch user info:', error.response.data);
            }
        }
    }
};
</script>

<style scoped>
/* 스타일을 여기에 추가할 수 있습니다 */
</style>
