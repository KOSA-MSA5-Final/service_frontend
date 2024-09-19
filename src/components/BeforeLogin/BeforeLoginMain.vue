<template>
    <div id="login-button">
        <button id="login" @click="goToMain">Login</button>
    </div>

    <div id="signup-button">
        <button id="signup" @click="goToMain">SignUp</button>
    </div>
</template>

<script>
export default {
    name: 'BeforeLoginMain',
    methods: {
        goToMain() {
            // 메인 페이지로 이동
            this.$router.push('/main');
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
