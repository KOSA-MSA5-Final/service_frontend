<template>
<div style="height:inherit;">
    <div class="container-fluid row justify-content-center align-content-center" style="width:auto; margin-bottom:20px;">
    <div style="display:flex; align-items: center; justify-content: space-between; align-items: start; background-color: white; padding-left:2px; align-items: center;">
        <div class="back_btn" style="margin-right:10px; align-items: center; display:flex; justify-content: center; justify-items: center; height:50px; " @click="goToSetting1">
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
    <img src="https://img.icons8.com/ios-filled/50/cat-footprint.png" alt="" style="margin-left:32%">
    </div>
    <div class="progress-container" style="padding-left:15%; padding-right:15%">
    <div class="progress-bar step-1"></div>
    <div class="progress-bar step-1"></div>
    <div class="progress-bar step-3"></div>
    <div class="progress-bar step-3"></div>
    <div class="progress-bar step-3"></div>
    <div class="progress-bar step-3"></div>
    <div class="progress-bar step-3"></div>
    </div>

    <div style="margin-top:30px; display:flex; flex-direction: column; align-items: center;">
    <div style="font-size:2em">
        반려견의 종류를
    </div>
    <div style="font-size:2em">
        선택해주세요
    </div>
    <div style="font-size:1em; margin-bottom:10px;">
        반려동물별 맞춤서비스를 제공해드려요
    </div>

    <div style="display:flex; width:80%; align-content: center;">
        <div class="menuTab active">
            <img width="50" height="50" src="https://img.icons8.com/keek/100/dog.png" alt="dog"/>            
            강아지
        </div>
        <div class="menuTab">
            <img width="50" height="50" src="https://img.icons8.com/keek/100/cat.png" alt="cat"/>
            고양이
        </div>
    </div>
    <div style="border:1px solid black;align-items: center; width:80%; display:flex; justify-content: center;flex-direction: column;">
        <div class="searchDiv">
            <div style="margin-left:20px;margin-right:20px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </div>
            <input class="searchInput" type="text">
        </div>
        <div>
            기타/ 가정용 반려강아지 /믹스
        </div>
    </div>

    <div style="display:flex; flex-direction: row; ">
        <div>이전</div>
        <div>다음</div>
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
    goToSetting1(){
        this.$router.push('/setProfile1');
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


/* 탭 */
.menuTab{
    border:1px solid black;
    width:50%;
    border-radius: 20px 20px 0px 0px
}
.menuTab.active{
    background-color: #71A9DB;
    color: white;
}

/* 서치 */
.searchDiv{
    margin-top:1em; 
    display:flex;
    align-items: center; 
    justify-items: center;
    border-radius: 40px; 
    border:1px solid lightgray;height:50px;width:90%;
    background-color: lightgray;
}
.searchInput{
    border-width:0;
    height:40px;
    width:40%;
    outline: none;
    font-size:1.5em;
    background-color:lightgray;
}
.bottomBtn1{
    position: absolute; margin-bottom:20px;bottom: 2.5em; left: 50%; transform: translateX(-50%); width: 60%; background-color: #1860C3; color: white; text-align: center; padding: 10px; border-radius: 20px;font-size:2.5em;
}
.bottomBtn2{
    position: absolute; margin-bottom:20px;bottom: 0; left: 50%; transform: translateX(-50%); width: 60%; background-color: #1860C3; color: white; text-align: center; padding: 10px; border-radius: 20px;font-size:2.5em;
}
</style>