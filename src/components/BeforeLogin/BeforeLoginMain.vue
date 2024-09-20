<template>
    <div id="login-button">
        <button id="login" @click="goToLogin">Login</button>
    </div>

    <div id="signup-button">
        <button id="signup" @click="goToSignup">SignUp</button>
    </div>
</template>

<script>
export default {
    name: 'BeforeLoginMain',
    methods: {
        goToMain() {
            // 메인 페이지로 이동
            this.$router.push('/main');
        },
        goToLogin() {
            // 메인 페이지로 이동
            this.$router.push('/login');
        },
        goToSignup() {
            // 메인 페이지로 이동
            this.$router.push('/signup');
        }
    }
}
</script>

<style scoped>
#login-button, #signup-button {
    display: flex;
    justify-content: center;
    margin: 20px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
</style>
