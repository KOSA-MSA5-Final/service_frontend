<template>
    <div id="topBar2">
        <div id="mgng-back" class="back_btn" @click="goToBeforeLogin">
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
        <div id="mgng-title">프로필 추가</div>
        <div id="mgng-skip" class="skip_btn">건너뛰기</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //현재 경로를 이전 경로로 매핑
            routeMap: {
                '/setProfile/1': '/main/settings', //맨처음에서 메인 페이지로 돌아감
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
#topBar2 {
    display: flex;
    align-items: center;
    background-color: white;
    height: 70px;
    margin-bottom: 5px;
    padding: 0 15px;
}
#mgng-title {
    flex: 4;
}
#mgng-back {
    text-align: left;
}
#mgng-skip {
    text-align: right;
}
.skip_btn {
    color: lightgray;
}
.skip_btn:hover {
    background-color: rgb(150, 150, 150);
}
.back_btn:hover {
    background-color: lightgray;
}
</style>
