<template>
    <div>
        <div
            style="
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f8f8f8;
                height: 80px;
                padding: 10px;
            "
        >
            <div class="prevBtnDiv" @click="goToBeforeLogin">이전</div>
            <div style="flex: 0.1"></div>
            <div class="nextBtnDiv" @click="goToNextPage">다음</div>
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
    font-size: 12px;
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
    font-size: 12px;
}
.prevBtnDiv:hover {
    opacity: 80%;
}
.nextBtnDiv:hover {
    opacity: 80%;
}
</style>
