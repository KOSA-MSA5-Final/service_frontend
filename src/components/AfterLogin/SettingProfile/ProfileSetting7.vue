<template>
    <TopBar />

    <VueSlider v-model="value7" :min="0" :max="8" marks adsorb />

    <!-- 컨텐츠 -->
    <div style="font-size: 2em; margin-top: 1.5em">
        장구니가 평소 신경쓰는<br />
        건강부위가 있나요?
    </div>
    <div style="font-size: 1em; margin-bottom: 10px; color: gray">또는 기저질환이 있나요?</div>
    <div style="display: flex; align-items: center; justify-content: center; margin-top: 10px">
        <div class="neutered" :class="{ 'active-border': hasDisease === 'n' }" @click="clearDiseases">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
            >
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
                />
            </svg>
            없어요
        </div>
        <div style="flex: 1"></div>
    </div>

    <div class="diseaseContainer">
        <div class="diseaseBox" :class="{ 'active-border': isDisease.includes('skin') }" @click="toggleDisease('skin')">
            <img width="50" height="50" src="https://img.icons8.com/ios/50/skin.png" alt="skin" /><br />
            피부계통(귀)
        </div>
        <div class="diseaseBox" :class="{ 'active-border': isDisease.includes('eye') }" @click="toggleDisease('eye')">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-eye-fill"
                viewBox="0 0 16 16"
            >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
            </svg>
            <br />
            눈
        </div>
        <div
            class="diseaseBox"
            :class="{ 'active-border': isDisease.includes('stomach') }"
            @click="toggleDisease('stomach')"
        >
            <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/stomach.png" alt="stomach" /><br />
            소화기계통
        </div>
        <!-- 추가적인 diseaseBox 요소들 -->
        <div
            class="diseaseBox"
            :class="{ 'active-border': isDisease.includes('muscle') }"
            @click="toggleDisease('muscle')"
        >
            <img width="50" height="50" src="https://img.icons8.com/ios/50/flex-biceps.png" alt="flex-biceps" /><br />
            근골격계통
        </div>
        <div
            class="diseaseBox"
            :class="{ 'active-border': isDisease.includes('nerve') }"
            @click="toggleDisease('nerve')"
        >
            <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/neuron.png" alt="neuron" /><br />
            신경계통
        </div>
        <div
            class="diseaseBox"
            :class="{ 'active-border': isDisease.includes('hormone') }"
            @click="toggleDisease('hormone')"
        >
            <img
                width="50"
                height="50"
                src="https://img.icons8.com/external-victoruler-outline-victoruler/64/external-thyroid-gland-internal-human-organs-victoruler-outline-victoruler.png"
                alt="external-thyroid-gland-internal-human-organs-victoruler-outline-victoruler"
            /><br />
            호르몬계통
        </div>
        <div
            class="diseaseBox"
            :class="{ 'active-border': isDisease.includes('heart') }"
            @click="toggleDisease('heart')"
        >
            <img
                width="50"
                height="50"
                src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/external-heart-coronavirus-vitaliy-gorbachev-lineal-vitaly-gorbachev.png"
                alt="external-heart-coronavirus-vitaliy-gorbachev-lineal-vitaly-gorbachev"
            />
            <br />
            순환계통(심장)
        </div>
        <div
            class="diseaseBox"
            :class="{ 'active-border': isDisease.includes('mouth') }"
            @click="toggleDisease('mouth')"
        >
            <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/set-of-teeth.png"
                alt="set-of-teeth"
            />
            <br />
            구강
        </div>
        <div class="diseaseBox" :class="{ 'active-border': isDisease.includes('lung') }" @click="toggleDisease('lung')">
            <img width="50" height="50" src="https://img.icons8.com/ios/50/lungs.png" alt="lungs" /><br />
            호흡기계통
        </div>
        <div
            class="diseaseBox"
            :class="{ 'active-border': isDisease.includes('kidney') }"
            @click="toggleDisease('kidney')"
        >
            <img width="50" height="50" src="https://img.icons8.com/ios/50/kidney.png" alt="kidney" /> <br />
            비뇨생식계통
        </div>
        <div
            class="diseaseBox"
            :class="{ 'active-border': isDisease.includes('tumor') }"
            @click="toggleDisease('tumor')"
        >
            <img
                width="50"
                height="50"
                src="https://img.icons8.com/external-ddara-lineal-ddara/64/external-tumor-cell-medical-marijuana-medicine-cannabis-indica-medical-marijuana-ddara-lineal-ddara.png"
                alt="external-tumor-cell-medical-marijuana-medicine-cannabis-indica-medical-marijuana-ddara-lineal-ddara"
            />
            <br />
            종양성 질환
        </div>
    </div>

    <!-- 컨텐츠 끝 -->

    <div class="button-container">
        <PrevNextButton />
    </div>
</template>

<script>
import PrevNextButton from './PrevNextButton.vue';
import TopBar from './TopBar.vue';
import VueSlider from 'vue-3-slider-component';

export default {
    components: {
        TopBar,
        PrevNextButton,
        VueSlider,
    },
    data() {
        return {
            value7: 7,
            hasDisease: 'n',
            isDisease: [], // 배열로 변경
        };
    },
    methods: {
        toggleDisease(disease) {
            const index = this.isDisease.indexOf(disease);
            if (index > -1) {
                // 이미 선택된 경우 배열에서 제거
                this.isDisease.splice(index, 1);
            } else {
                // 선택되지 않은 경우 배열에 추가
                this.isDisease.push(disease);
            }
        },
        clearDiseases() {
            // 없어요 버튼 클릭 시 실행되는 메소드
            this.isDisease = []; // disease 목록 비우기
            this.hasDisease = 'n'; // hasDisease 값을 'n'으로 설정
        },
    },
};
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.neutered {
    flex: 1;
    border: 1px solid black;
    padding: 5px;
    border-radius: 20px;
    text-align: center;
    align-content: center;
    color: gray;
}
.neutered:hover {
    background-color: #71a9db;
    color: white;
}
.active-border {
    border: 1px solid black;
    color: black;
}

/* 했어요를 누르면 나오는 box */
.diseaseBox {
    flex: 0 1 30%; /* 각 박스가 30% 너비를 가질 수 있도록 설정 */
    box-sizing: border-box; /* 박스 크기 계산에 패딩과 보더 포함 */
    margin: 5px; /* 박스 간 간격을 줄 수 있음 */
    padding: 10px; /* 내부 여백 추가 */
    border: 1px solid black; /* 테두리 스타일 */
    border-radius: 10px;
}

.diseaseBox.active-border {
    border-color: black; /* 활성화된 박스의 테두리 색상 */
    background-color: #71a9db;
}

.diseaseContainer {
    display: flex;
    flex-wrap: wrap; /* 박스가 3개가 다 차면 다음 줄로 이동 */
}
</style>
