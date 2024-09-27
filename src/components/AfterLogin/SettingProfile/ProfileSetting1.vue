<template>
  <div style="height:inherit;">
    <div class="container-fluid row justify-content-center align-content-center" style="width:auto; margin-bottom:20px;">
      <div style="display:flex; align-items: center; justify-content: space-between; align-items: start; background-color: white; padding-left:2px; align-items: center;">
        <div class="back_btn" style="margin-right:10px; align-items: center; display:flex; justify-content: center; justify-items: center; height:50px; " @click="goToBeforeLogin">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </div>
        <div class="skip_btn" style="min-height:100%;align-content:center">
          건너뛰기
        </div>
      </div>
    </div>
    <div style="display:flex">
      <img src="https://img.icons8.com/ios-filled/50/cat-footprint.png" alt="" style="margin-left:21%">
    </div>
    <div class="progress-container" style="padding-left:15%; padding-right:15%">
      <div class="progress-bar step-1"></div>
      <div class="progress-bar step-3"></div>
      <div class="progress-bar step-3"></div>
      <div class="progress-bar step-3"></div>
      <div class="progress-bar step-3"></div>
      <div class="progress-bar step-3"></div>
      <div class="progress-bar step-3"></div>
    </div>

    <div style="margin-top:10em;display:flex; flex-direction: column; align-items: center;">
      <div style="font-size:3em">
        반려견의 이름을 
      </div>
      <div style="font-size:3em">
        알려주세요
      </div>

      
      <div style="display:flex;align-items: center; justify-content: center; margin-top:3em; border-radius: 40px; border:1px solid lightgray;height:50px;width:70%">
        <input type="text" style="border-width:0;height:40px;width:30%;text-align:center;outline: none;font-size:1.5em">
      </div>

      <div style="position: absolute; margin-bottom:20px;bottom: 0; left: 50%; transform: translateX(-50%); width: 60%; background-color: #1860C3; color: white; text-align: center; padding: 10px; border-radius: 20px;font-size:2.5em;">
        다음
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    goToBeforeLogin(){
      this.$router.push('/');
    }
  }
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

html, body{
  height:100%;
}
.container{
  height:100%;
}
.skip_btn:hover{
  background-color: lightgray;
}
.back_btn:hover {
  background-color: lightgray;
}
.progress-container {
  display: flex;
  justify-content: space-between;
  margin-top:10px;
}

.progress-bar {
  width: 30%;
  height: 10px;
  background-color: lightgray;
  position: relative;
  border-radius: 10px;
}

.step-1::before,
.step-2::before,
.step-3::before {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}

.step-1 {
  background-color: blue;
}

.step-2 {
  background-color: blue;
}

.step-3 {
  background-color: gray;
}

</style>