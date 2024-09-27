<template>
  <div style="padding:10px;">
    <div class="container-fluid row justify-content-center align-content-center" style="width:auto; margin-bottom:20px;">
      <div style="display:flex; align-items: start; background-color: white; border-bottom: 1px solid #ebebeb; padding-left:2px;">
        <div class="back_btn" style="margin-right:10px; align-items: center; display:flex; justify-content: center; justify-items: center; height:40px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </div>
      </div>
    </div>
    <form @submit.prevent="submitForm">
      <div class="mb-3" style="text-align:left">
        <label class="form-label text-dark">사용자 이름을 입력해주세요</label>
        <input type="text" v-model="name" class="form-control" required />
      </div>
      <div class="mb-3" style="text-align:left">
        <label class="form-label text-dark">이메일을 입력해주세요</label>
        <input type="email" v-model="email" class="form-control" required />
      </div>
      <div class="mb-3" style="text-align:left">
        <label class="form-label text-dark">비밀번호를 입력해주세요</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <div class="mb-3" style="text-align:left">
        <label class="form-label text-dark">비밀번호를 한번 더 입력해주세요</label>
        <input type="password" v-model="confirmPassword" class="form-control" required />
        <div v-if="passwordMismatch" class="text-danger" style="font-size: 0.8em;">비밀번호가 일치하지 않습니다.</div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>    
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '', // 비밀번호 확인을 위한 데이터 추가
      name: '',
    };
  },
  computed: {
    passwordMismatch() {
      return this.password && this.confirmPassword && this.password !== this.confirmPassword;
    },
  },
  methods: {
    submitForm() {
      if (this.password !== this.confirmPassword) {
        console.error("비밀번호가 일치하지 않습니다.");
        return;
      }

      axios
        .post('http://localhost:8081/auth/register', {
          email: this.email,
          password: this.password,
          name: this.name,
        })
        .then((response) => {
          // 회원가입 성공 후 리디렉션 처리
          window.location.href = 'http://localhost:80/login';
          console.log(response.data);
        })
        .catch(error => {
          console.error("회원가입 실패", error);
        });
    }
  }
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

.back_btn:hover {
  background-color: lightgray;
}
</style>
