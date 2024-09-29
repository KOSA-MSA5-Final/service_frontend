<template>
<div style="display:flex; flex-direction: row; position:absolute; bottom:0; margin-bottom:15px; width:75%; align-items: center;">
    <div class="prevBtnDiv" @click="goToBeforeLogin" style="">이전</div>
    <div style="flex:0.1"></div>
    <div class="nextBtnDiv" @click="goToNextPage"  style="">다음</div>
</div>
</template>

<script>
export default {
    data(){
        return{
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
            beforeRouteMap:{
                '/setProfile1': '/', //맨처음에서 메인 페이지로 돌아감
                '/setProfile2': '/setProfile1',
                '/setProfile3': '/setProfile2',
                '/setProfile4': '/setProfile3',
                '/setProfile5': '/setProfile4',
                '/setProfile6': '/setProfile5',
                '/setProfile7': '/setProfile6',
                '/setProfile8': '/setProfile7' 
            }
        }
    },
    methods:{
        goToNextPage(){
            //현재 경로에 따라 다음 경로 설정
            const currentPath = this.$route.path;

            //현재 경로에 맞는 다음 경로로 이동 (매핑된 경로가 없으면 기본값으로 첫 경로로 이동)
            const nextPath = this.routeMap[currentPath] || '/';
            this.$router.push(nextPath);
        },
        goToBeforeLogin(){
            //현재 경로에 따라 이전 경로 설정
            const currentPath = this.$route.path;
            //현재 경로에 맞는 이전 경로로 이동(매핑된경로가 없으면 기본값으로 첫경로로 이동)
            const beforePath = this.beforeRouteMap[currentPath] || '';
            this.$router.push(beforePath);
        },
    }
}
</script>

<style>
.prevBtnDiv{
    flex:1;
    background-color: #D9D9D9; 
    border-radius: 20px;
    cursor : pointer; 
    text-align: center; 
    padding: 10px;  
    border:1px solid black;
    font-size:2.5em;
}
.nextBtnDiv{
    flex:3;
    background-color: #1860C3;
    color:white;
    border-radius: 20px;
    cursor : pointer; 
    text-align: center; 
    padding: 10px;  
    border:1px solid black;
    font-size:2.5em;
}
.prevBtnDiv:hover{
    opacity: 80%;
}
.nextBtnDiv:hover{
    opacity: 80%;
}
</style>