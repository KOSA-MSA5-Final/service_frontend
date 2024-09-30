<template>
  <div style="padding:10px;">
    <div class="container-fluid row justify-content-center align-content-center" style="width:auto; margin-bottom:20px;">
      <div style="display:flex; align-items: start; background-color: white; border-bottom: 1px solid #ebebeb; padding-left:2px;" @click="goToBeforeLogin">
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
        <label class="form-label text-dark">사용하실 아이디를 입력해주세요</label>
        <input type="text" v-model="username" class="form-control" required />
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
      <div id="verify-email" v-if="!isVerified">
        <div class="input-group mb-3">
          <input v-model="email" type="email" class="form-control" placeholder="이메일" required>
          <button class="btn btn-outline-secondary" type="button" @click="sendVerificationCode" :disabled="emailSent">
            {{ emailSent ? '인증코드 전송됨' : '인증코드 받기' }}
          </button>
        </div>
        <div v-if="emailSent" class="input-group mb-3">
          <input v-model="inputVerificationCode" class="form-control" placeholder="인증코드 입력" />
          <button class="btn btn-outline-secondary" type="button" @click="verifyCode">인증하기</button>
        </div>
        <button class="btn btn-link" @click="sendVerificationCode" v-if="emailSent">인증코드 재전송</button>
      </div>
      
      <button type="submit" class="btn btn-primary" :disabled="!isVerified">회원가입</button>
    </form>
  </div>    
</template>

<script>
import axios from 'axios';
import https from 'https';
import { send_email } from '@/fetch_datas/send_email'; // 경로 수정

export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      confirmPassword: '', 
      name: '',
      emailSent: false,
      inputVerificationCode: '',
      verificationCode: '',
      isVerified: false,
    };
  },
  computed: {
    passwordMismatch() {
      return this.password && this.confirmPassword && this.password !== this.confirmPassword;
    },
  },
  methods: {
    async sendVerificationCode() {
      try {
        const emailStore = send_email();
        this.verificationCode = await emailStore.sendVerificationEmail(this.email);
        this.emailSent = true;
        alert('인증코드가 이메일로 전송되었습니다.');
      } catch (error) {
        console.error('인증코드 전송 실패:', error);
        alert('인증코드 전송에 실패했습니다. 다시 시도해주세요.');
      }
    },
    verifyCode() {
      if (this.inputVerificationCode === this.verificationCode) {
        this.isVerified = true;
        alert('이메일이 성공적으로 인증되었습니다.');
      } else {
        alert('잘못된 인증코드입니다. 다시 시도해주세요.');
      }
    },
    submitForm() {
      if (this.password !== this.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (!this.isVerified) {
        alert("이메일 인증이 필요합니다.");
        return;
      }

      axios.post('https://localhost:8081/auth/register', {
        email: this.email,
        password: this.password,
        username: this.username,
        name: this.name,
      }, {
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false
        })
      })
      .then(() => {
        alert('회원가입이 완료되었습니다.');
        this.$router.push('/');
      })
      .catch(error => {
        console.error("회원가입 실패", error);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      });
    },
    goToBeforeLogin(){
      this.$router.push('/');
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
