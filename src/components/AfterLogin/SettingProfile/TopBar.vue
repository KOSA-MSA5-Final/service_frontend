<template>
    <div class="subContainer">
        <div class="back_btn" @click="goToBeforeLogin">
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
        <div class="skip_btn">건너뛰기</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //현재 경로를 이전 경로로 매핑
            routeMap: {
                '/setProfile1': '/', //맨처음에서 메인 페이지로 돌아감
                '/setProfile2': '/setProfile1',
                '/setProfile3': '/setProfile2',
                '/setProfile4': '/setProfile3',
                '/setProfile5': '/setProfile4',
                '/setProfile6': '/setProfile5',
                '/setProfile7': '/setProfile6',
                '/setProfile8': '/setProfile7',
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

<style>
.subContainer {
    position: absolute;
    bottom: 93%;
    width: -webkit-fill-available;
    margin-right: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: start;
    background-color: white;
    padding-left: 2px;
    align-items: center;
    height: 60px; /* 높이를 설정하여 요소가 보이도록 */
}
.skip_btn {
    min-height: 100%;
    align-content: center;
}
.skip_btn:hover {
    background-color: lightgray;
}
.back_btn {
    margin-right: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    justify-items: center;
    height: 50px;
}
.back_btn:hover {
    background-color: lightgray;
}
</style>
