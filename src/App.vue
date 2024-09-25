<template> 
  <div id="app">
    <div class="container">
      <router-view /> <!-- 라우팅된 컴포넌트를 이곳에 렌더링 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  width: 100%;
  min-width: 500px;
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

@media screen and (max-width: 600px) {
  .container {
    width: 600px; /* 모바일에서도 600px 유지 */
  }
}
</style>
