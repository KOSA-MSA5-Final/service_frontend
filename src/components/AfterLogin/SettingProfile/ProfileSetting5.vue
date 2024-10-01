<template>
    <div style="height: inherit">
        <TopBar />

        <div style="display: flex; justify-content: center">
            <VueSlider
                v-model="value5"
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
                장구니의 생일은?
            </div>
            <div style="position: absolute; top: 38%; font-size: 1em; width: -webkit-fill-available">
                나이에 맞는 정보가 제공돼요
            </div>
            <!-- input -->
            <div
                style="
                    position: absolute;
                    top: 40%;
                    width: -webkit-fill-available;
                    align-items: center;
                    display: flex;
                    padding-right: 3%;
                    justify-content: center;
                    align-items: center;
                    flex-direction: row;
                "
            >
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
                        type="date"
                        style="border-width: 0; height: 40px; text-align: center; outline: none; font-size: 1.5em"
                    />
                </div>
            </div>

            <div
                style="
                    position: absolute;
                    top: 55%;
                    width: -webkit-fill-available;
                    align-items: center;
                    display: flex;
                    padding-right: 3%;
                    justify-content: center;
                    align-items: center;
                    flex-direction: row;
                    color: lightgray;
                "
            >
                • 생일은 언제든 수정 가능해요
            </div>
            <div
                style="
                    position: absolute;
                    top: 59%;
                    width: -webkit-fill-available;
                    align-items: center;
                    display: flex;
                    padding-right: 3%;
                    justify-content: center;
                    align-items: center;
                    flex-direction: row;
                    color: lightgray;
                "
            >
                • 생일을 모른다면 대략적인 날짜를 선택해주세요
            </div>
        </div>
        <!-- 컨텐츠 끝 -->
    </div>

    <PrevNextButton />
</template>

<script>
import PrevNextButton from './PrevNextButton.vue';
import TopBar from './TopBar.vue';
import VueSlider from 'vue-3-slider-component';

export default {
    name: 'setProfilePage5',
    components: {
        TopBar,
        PrevNextButton,
        VueSlider,
    },
    data() {
        return {
            value5: 5,
        };
    },
};
</script>

<style scoped></style>
