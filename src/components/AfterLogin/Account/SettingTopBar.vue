<template>
    <div id="topBar2">
        <div id="mgng-back" class="back_btn" @click="goToBack">
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
        <div id="mgng-title">
            <div v-if="isSettingPage">주소록 관리</div>
            <div v-if="isAddAddressPage">주소록 추가</div>
            <div v-if="isAddressSearchPage">주소 검색</div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {
        const route = useRoute(); // 현재 라우트 정보를 얻음
        const router = useRouter(); // 라우터 인스턴스 사용

        // 현재 경로 확인
        const isSettingPage = computed(() => route.path === '/address-setting');
        const isAddAddressPage = computed(() => route.path === '/address-setting/add');
        const isAddressSearchPage = computed(() => route.path === '/address-setting/search');

        // 뒤로가기 함수
        const goToBack = () => {
            router.go(-1);
        };

        return {
            isSettingPage,
            isAddAddressPage,
            isAddressSearchPage,
            goToBack,
        };
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
