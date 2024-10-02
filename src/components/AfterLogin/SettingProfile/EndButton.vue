<template>
    <div>
        <div class="btnContainer">
            <div class="prevBtnDiv" @click="goToBeforeLogin">이전</div>
            <div class="nextBtnDiv" @click="goToNextPage">프로필 생성하기</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            routeMap: {
                '/setProfile/1': '/setProfile/2',
                '/setProfile/2': '/setProfile/3',
                '/setProfile/3': '/setProfile/4',
                '/setProfile/4': '/setProfile/5',
                '/setProfile/5': '/setProfile/6',
                '/setProfile/6': '/setProfile/7',
                '/setProfile/7': '/setProfile/8',
                '/setProfile/8': '/main', //마지막에서 메인 페이지로 돌아감
            },
            beforeRouteMap: {
                '/setProfile/1': '/main', //맨처음에서 메인 페이지로 돌아감
                '/setProfile/2': '/setProfile/1',
                '/setProfile/3': '/setProfile/2',
                '/setProfile/4': '/setProfile/3',
                '/setProfile/5': '/setProfile/4',
                '/setProfile/6': '/setProfile/5',
                '/setProfile/7': '/setProfile/6',
                '/setProfile/8': '/setProfile/7',
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

<style scoped>
.btnContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    text-align: center;
    align-content: center;
}
.prevBtnDiv {
    flex: 1;
    background-color: #d9d9d9;
    align-content: center;
    cursor: pointer;
    text-align: center;
    height: inherit;
    font-size: 15px;
}
.nextBtnDiv {
    flex: 1.5;
    background-color: #ffbf6b;
    height: inherit;
    color: black;
    align-content: center;
    cursor: pointer;
    text-align: center;
    font-size: 15px;
}
.prevBtnDiv:hover {
    opacity: 80%;
}
.nextBtnDiv:hover {
    opacity: 80%;
}
</style>
