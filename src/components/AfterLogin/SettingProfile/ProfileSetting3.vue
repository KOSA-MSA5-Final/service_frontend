<template>
    <div style="height: inherit">
        <TopBar2 />

        <div style="display: flex; justify-content: center">
            <VueSlider
                v-model="value3"
                :min="0"
                :max="8"
                marks
                adsorb
                style="position: absolute !important; top: 10%; width: 80%"
            />
        </div>

        <!-- 컨텐츠 -->
        <div style="display: flex; justify-content: center">
            <div style="position: absolute; top: 30%; font-size: 2em; width: -webkit-fill-available">
                장구니의 성별은?
            </div>
            <!-- 남여 -->
            <div
                style="
                    position: absolute;
                    top: 40%;
                    width: 80%;
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: row;
                "
            >
                <div class="maleBox" :class="{ 'active-border': isMale === 'm' }" @click="isMale = 'm'">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15vh"
                        height="15vh"
                        fill="currentColor"
                        class="bi bi-gender-male"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"
                        />
                    </svg>
                </div>
                <div style="flex: 0.1"></div>
                <div class="maleBox" :class="{ 'active-border': isMale === 'f' }" @click="isMale = 'f'">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15vh"
                        height="15vh"
                        fill="currentColor"
                        class="bi bi-gender-female"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"
                        />
                    </svg>
                </div>
            </div>
            <div
                style="
                    position: absolute;
                    top: 63%;
                    width: 80%;
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size: 2em;
                "
            >
                <div style="flex: 1">남자</div>
                <div style="flex: 0.1"></div>
                <div style="flex: 1">여자</div>
            </div>
        </div>
        <!-- 컨텐츠 끝 -->

        <div class="button-container">
            <PrevNextButton />
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-3-slider-component';
import TopBar2 from './TopBar2.vue';
import PrevNextButton from './PrevNextButton.vue';

export default {
    name: 'setProfilePage3',
    components: {
        VueSlider,
        TopBar2,
        PrevNextButton,
    },
    data() {
        return {
            value3: 3,
            isMale: 'm',
        };
    },
};
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.maleBox {
    flex: 1;
    border: 1px solid black;
    padding: 20px;
    border-radius: 20px;
    width: fit-content;
}
.maleBox:hover {
    background-color: #71a9db;
}
.active-border {
    border: 2px solid #1860c3;
}
</style>
