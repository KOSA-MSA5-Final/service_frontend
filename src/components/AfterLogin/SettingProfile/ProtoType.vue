<template>
    <div id="afterLoginMain">
        <TopBar2 />

        <div id="router-pages">
            <router-view></router-view>
        </div>

        <!-- /setProfile/1일 때 NextButton을 표시 -->
        <div v-if="isPageOne">
            <NextButton />
        </div>

        <!-- /setProfile/2일 때 PrevNextButton을 표시 -->
        <div v-else-if="isPageTwo">
            <PrevNextButton />
        </div>

        <!-- /setProfile/3일 때 EndButton을 표시 -->
        <div v-else-if="isPageThree">
            <PrevNextButton2 />
        </div>

        <!-- /setProfile/3일 때 EndButton을 표시 -->
        <div v-else-if="isPageFour">
            <EndButton />
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'; // 현재 경로를 감지하기 위해 사용
import { computed } from 'vue'; // computed 함수 import
import NextButton from './NextButton.vue';
import PrevNextButton from './PrevNextButton.vue';
import PrevNextButton2 from './PrevNextButton2.vue';

import EndButton from './EndButton.vue';

import TopBar2 from './TopBar2.vue';

export default {
    components: {
        TopBar2,
        PrevNextButton,
        NextButton,
        EndButton,
        PrevNextButton2,
    },
    setup() {
        const route = useRoute(); // 현재 라우트를 감지

        // 현재 경로에 따른 컴포넌트 표시
        const isPageOne = computed(() => route.path === '/setProfile/1');
        const isPageTwo = computed(() => route.path === '/setProfile/2');
        const isPageThree = computed(() => route.path === '/setProfile/3');
        const isPageFour = computed(() => route.path === '/setProfile/4');

        return {
            isPageOne,
            isPageTwo,
            isPageThree,
            isPageFour,
        };
    },
    data() {
        return {};
    },
    methods: {},
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
