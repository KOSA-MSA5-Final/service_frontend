<template>
    <div id="afterLoginMain">
        <TopBar />

        <div id="router-pages">
            <router-view></router-view>
        </div>

        <div v-if="isPageOne">
            <NextButton />
        </div>
        <div v-else>
            <PrevNextButton />
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'; // 현재 경로를 감지하기 위해 사용'
import { computed } from 'vue'; // computed 함수 import
import NextButton from './NextButton.vue';
import PrevNextButton from './PrevNextButton.vue';
import TopBar from './TopBar.vue';

export default {
    components: {
        TopBar,
        PrevNextButton,
        NextButton,
    },
    data() {
        return {};
    },
    setup() {
        const route = useRoute(); // 현재 라우트를 감지

        // 현재 경로가 '/1'인지를 확인
        const isPageOne = computed(() => route.path === '/setProfile/1');

        return {
            isPageOne,
        };
    },
};
</script>

<style scoped>
#afterLoginMain {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh; /* 전체 화면을 차지 */
}
#router-pages {
    background-color: #cee2f5;
    flex-grow: 1;
    overflow-y: auto;
    height: -webkit-fill-available;
    /* 스크롤바 숨기기 */
    scrollbar-width: none;
}
</style>
