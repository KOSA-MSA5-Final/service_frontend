<template>
    <div id="topBar">
        <div id="mgng-name" class="skip_btn" @click="goToBeforeLogin">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
            >
                <path
                    fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
            </svg>
        </div>
        <div id="mgng-img" class="back_btn">건너뛰기</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //현재 경로를 이전 경로로 매핑
            routeMap: {
                '/main/setProfile1': '/main', //맨처음에서 메인 페이지로 돌아감
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
        goToBeforeLogin() {
            //현재 경로에 따라 이전 경로 설정
            const currentPath = this.$route.path;

            //현재 경로에 맞는 이전 경로로 이동(매핑된경로가 없으면 기본값으로 첫경로로 이동)
            const beforePath = this.routeMap[currentPath] || '';
            this.$router.push(beforePath);
        },
    },
};
</script>

<style scoped>
#topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    height: 80px;
    margin-bottom: 5px;
    padding: 0 15px;
}

#mgng-name {
    text-align: left;
}
#mgng-img {
    text-align: right;
}
.skip_btn:hover {
    background-color: lightgray;
}
.back_btn:hover {
    background-color: lightgray;
}
</style>
