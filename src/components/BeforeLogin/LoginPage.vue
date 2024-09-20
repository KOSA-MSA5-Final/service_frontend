<template>
  <div class="gradient-custom">
    <section class="d-flex vh-100">
        <div class="container-fluid row justify-content-center align-content-center">
            <div class="card bg-dark" style="border-radius: 1rem;">
                <div class="card-body p-5 text-center">
                    <h2 class="text-white">LOGIN</h2>
                    <p class="text-white-50 mt-2 mb-5">서비스를 사용하려면 로그인을 해주세요!</p>

                    <div class = "mb-2">
                        <form @submit.prevent="login">
                            <div class="mb-3">
                                <label class="form-label text-white">Email address</label>
                                <input type="email" v-model="email" class="form-control" name="username">
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-white">Password</label>
                                <input type="password" v-model="password" class="form-control" name="password">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>

                        <button type="button" class="btn btn-secondary mt-3" onclick="location.href='/signup'">회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            email: '',
            password: ''
        }  
    },
    methods: {
        async login(event) {
            event.preventDefault();  // 기본 폼 제출 동작 막기

            try {
                const response = await axios.post('http://localhost:9000/auth/login', {
                    email: this.email,
                    password: this.password
                });

                // 응답이 정상적으로 오는지 확인
                console.log(response); // response 전체를 출력하여 확인

                if (response && response.data && response.data.accessToken) {
                    const token = response.data.accessToken;
                    console.log('로그인 성공: ', token);

                    // 토큰을 로컬스토리지에 저장
                    localStorage.setItem('token', token);

                    // 로그인 성공 후 리다이렉트
                    window.location.href = '/main';  // 로그인 후 메인 페이지로 리다이렉트
                } else {
                    console.error('토큰을 가져오지 못했습니다.');
                }

            } catch (error) {
                console.error('로그인이 실패했습니다', error);
            }
        }
    }
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

.gradient-custom {
    background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}
</style>