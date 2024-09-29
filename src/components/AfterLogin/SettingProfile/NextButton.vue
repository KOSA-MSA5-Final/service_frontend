<template>
<div @click="goToNextPage" class="nextBtn">
    다음
</div>
</template>

<script>
export default {
    data(){
        return{
            //현재 경로를 다음 경로로 매핑
            routeMap:{
                '/setProfile1': '/setProfile2',
                '/setProfile2': '/setProfile3',
                '/setProfile3': '/setProfile4',
                '/setProfile4': '/setProfile5',
                '/setProfile5': '/setProfile6',
                '/setProfile6': '/setProfile7',
                '/setProfile7': '/setProfile8',
                '/setProfile8': '/main' //마지막에서 메인 페이지로 돌아감
            },

        }
    },
    methods:{
        goToNextPage(){
            //현재 경로에 따라 다음 경로 설정
            const currentPath = this.$route.path;

            //현재 경로에 맞는 다음 경로로 이동 (매핑된 경로가 없으면 기본값으로 첫 경로로 이동)
            const nextPath = this.routeMap[currentPath] || '/';
            this.$router.push(nextPath);
        }
    }
}
</script>

<style>
.nextBtn{
    cursor : pointer; 
    position: absolute; 
    margin-bottom:20px;
    bottom: 0; 
    left: 50%; 
    transform: translateX(-50%); 
    width: 60%; 
    background-color: #1860C3;
    color: white; 
    text-align: center; 
    padding: 10px; 
    border-radius: 20px;
    font-size:2.5em;
}
.nextBtn:hover{
    opacity:80%;
}
</style>