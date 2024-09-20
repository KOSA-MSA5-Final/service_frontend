<template>
  <div class="gradient-custom">
    <section class="d-flex vh-100">
      <div class="container-fluid row justify-content-center align-content-center">
        <div class="card bg-dark" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">
            <h2 class="text-white">SIGN UP</h2>
            <p class="text-white-50 mt-2 mb-5">서비스 사용을 위한 회원 가입</p>

            <div class="mb-2">
              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label class="form-label text-white">Email address</label>
                  <input type="email" v-model="email" class="form-control" />
                </div>
                <div class="mb-3">
                  <label class="form-label text-white">Password</label>
                  <input type="password" v-model="password" class="form-control" />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
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
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      axios
        .post('http://localhost:9000/auth/user', {
          email: this.email,
          password: this.password
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

.gradient-custom {
  background: linear-gradient(to right, rgba(254, 238, 229, 1), rgba(229, 193, 197, 1));
}
</style>
