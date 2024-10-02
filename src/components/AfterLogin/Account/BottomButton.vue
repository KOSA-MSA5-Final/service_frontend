<template>
    <div v-if="isAddAddressPage" @click="goToSave" class="saveAddressBtn">
        <div>&nbsp; 저장하기</div>
    </div>

    <div v-if="isSettingPage" @click="goToAddAddress" class="addAddressBtn">
        <div>&nbsp; 주소 추가 하기</div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup() {
        const route = useRoute(); // 현재 라우트를 감지
        const router = useRouter(); // 라우터 인스턴스 사용

        // 현재 경로가 '/1'인지를 확인
        const isSettingPage = computed(() => route.path === '/address-setting');
        const isAddAddressPage = computed(() => route.path === '/address-setting/add');
        const isAddressSearchPage = computed(() => route.path === '/address-setting/add/search');
        const goToAddAddress = () => {
            router.push({ name: 'AddAddressPage' });
        };

        return {
            isSettingPage,
            isAddAddressPage,
            isAddressSearchPage,
            goToAddAddress,
        };
    },
    methods: {},
};
</script>

<style>
.saveAddressBtn {
    display: flex;
    justify-content: center;
    height: 70px;
    align-items: center;
    background-color: #1860c3;
    color: white;
}
.addAddressBtn {
    display: flex;
    justify-content: center;
    height: 70px;
    align-items: center;
    background-color: #1860c3;
    color: white;
}
#bottomBar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1860c3;
    color: white;
    height: 80px;
}
/* .nextBtn {
    cursor: pointer;
    border: 1px solid #1860c3;
    font-size: 15px;
    padding: 10px 0px;
    border-radius: 5px;
    width: 50%;
    background-color: #2276e9;
    color: white;
    text-align: center;
}
.nextBtn:hover {
    opacity: 80%;
} */
</style>
