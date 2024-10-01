<template>
    <div class="button-container">
        <div
            style="
                display: flex;
                flex-direction: row;
                position: absolute;
                bottom: 0;
                margin-bottom: 15px;
                width: 75%;
                align-items: center;
            "
        >
            <div class="prevBtnDiv" @click="goToBeforeLogin" style="">이전</div>
            <div style="flex: 0.1"></div>
            <div class="nextBtnDiv" @click="goToNextPage" style="">다음</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            routeMap: {
                '/main/setProfile1': '/main/setProfile2',
                '/main/setProfile2': '/main/setProfile3',
                '/main/setProfile3': '/main/setProfile4',
                '/main/setProfile4': '/main/setProfile5',
                '/main/setProfile5': '/main/setProfile6',
                '/main/setProfile6': '/main/setProfile7',
                '/main/setProfile7': '/main/setProfile8',
                '/main/setProfile8': '/main', //마지막에서 메인 페이지로 돌아감
            },
            beforeRouteMap: {
                '/msin/setProfile1': '/main', //맨처음에서 메인 페이지로 돌아감
                '/main/setProfile2': '/main/setProfile1',
                '/main/setProfile3': '/main/setProfile2',
                '/main/setProfile4': '/main/setProfile3',
                '/main/setProfile5': '/main/setProfile4',
                '/main/setProfile6': '/main/setProfile5',
                '/main/setProfile7': '/main/setProfile6',
                '/main/setProfile8': '/main/setProfile7',
            },
        };
    },
    methods: {
        goToNextPage() {
            //현재 경로에 따라 다음 경로 설정
            const currentPath = this.$route.path;

            //현재 경로에 맞는 다음 경로로 이동 (매핑된 경로가 없으면 기본값으로 첫 경로로 이동)
            const nextPath = this.routeMap[currentPath] || '/';
            this.$router.push(nextPath);
        },
        goToBeforeLogin() {
            //현재 경로에 따라 이전 경로 설정
            const currentPath = this.$route.path;
            //현재 경로에 맞는 이전 경로로 이동(매핑된경로가 없으면 기본값으로 첫경로로 이동)
            const beforePath = this.beforeRouteMap[currentPath] || '';
            this.$router.push(beforePath);
        },
    },
};
</script>

<style>
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.prevBtnDiv {
    flex: 1;
    background-color: #d9d9d9;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    padding: 10px;
    border: 1px solid black;
    font-size: 2.5em;
}
.nextBtnDiv {
    flex: 1.5;
    background-color: #1860c3;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    padding: 10px;
    border: 1px solid black;
    font-size: 2.5em;
}
.prevBtnDiv:hover {
    opacity: 80%;
}
.nextBtnDiv:hover {
    opacity: 80%;
}
</style>
