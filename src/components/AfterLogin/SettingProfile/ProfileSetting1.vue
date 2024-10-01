<template>
    <div>
        <TopBar />

        <VueSlider v-model="value1" :min="0" :max="8" marks adsorb />

        <!-- 컨텐츠 시작 -->
        <div
            style="
                display: flex;
                flex-direction: column;
                align-items: center;
                position: absolute;
                top: 30%;
                width: -webkit-fill-available;
                left: 0%;
            "
        >
            <div style="font-size: 2em">반려견의 이름을</div>
            <div style="font-size: 2em">알려주세요</div>

            <!-- 이름적는 input  -->
            <div
                style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 3em;
                    border-radius: 40px;
                    border: 1px solid lightgray;
                    height: 50px;
                    width: 70%;
                "
            >
                <input
                    type="text"
                    style="
                        border-width: 0;
                        height: 40px;
                        width: 30%;
                        text-align: center;
                        outline: none;
                        font-size: 1.5em;
                    "
                />
            </div>
        </div>
    </div>
    <NextButton />
</template>

<script>
import TopBar from './TopBar.vue';
import NextButton from './NextButton.vue';
import VueSlider from 'vue-3-slider-component';

export default {
    name: 'setProfilePage1',
    components: {
        TopBar,
        NextButton,
        VueSlider,
    },
    data() {
        return {
            value1: 1,
        };
    },
    methods: {
        goToBeforeLogin() {
            this.$router.push('/');
        },
    },
};
</script>

<style>
html,
body {
    width: 100%;
    height: 100%;
    margin: 0; /* 기본 여백 제거 */
    overflow: hidden; /* 스크롤 방지 */
}
</style>
