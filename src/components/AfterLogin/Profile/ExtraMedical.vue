<template>
    <div id="main-content">
        <div class="setting-topbar">
            <div class="top-bar">
                <button class="back-button" @click="goBack" aria-label="Go back">
                    <svg
                        width="30px"
                        height="30px"
                        fill="#000000"
                        viewBox="0 0 200 200"
                        data-name="Layer 1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M160,89.75H56l53-53a9.67,9.67,0,0,0,0-14,9.67,9.67,0,0,0-14,0l-56,56a30.18,30.18,0,0,0-8.5,18.5c0,1-.5,1.5-.5,2.5a6.34,6.34,0,0,0,.5,3,31.47,31.47,0,0,0,8.5,18.5l56,56a9.9,9.9,0,0,0,14-14l-52.5-53.5H160a10,10,0,0,0,0-20Z"
                            ></path>
                        </g>
                    </svg>
                </button>
                <div class="title">병원 영수증 추가 - 진단명 입력</div>
            </div>
        </div>

        <div class="disease-list">
            <div class="bannerDiv">
                <div class="bannerFlexDiv">
                    <div style="color: gray">진단명 입력하기</div>
                </div>
                멍지냥지는 아직 개발중이라 예측이 틀릴수 있어요<br />
                <img class="petwoman" :src="require('@/assets/medicine.png')" alt="" />
            </div>
            <div id="diseases-container">
                <div id="disease-container" v-for="(disease, index) in analysedDiseases" :key="index">
                    <div class="disease-header">
                        <h3>{{ disease.diseaseName }}</h3>
                        <div class="showSubDiseaseList" @click="toggleSubDiseaseList(index)">
                            <img v-if="visibleSubDiseases[index]" src="@/assets/icon-up.svg" alt="Hide" />
                            <img v-else src="@/assets/icon-down.svg" alt="Show" />
                        </div>
                    </div>
                    <div v-show="visibleSubDiseases[index]" class="subdisease-list">
                        <div
                            v-for="(subdisease, subIndex) in disease.subDiseases"
                            :key="subIndex"
                            class="subdisease-item"
                        >
                            <input
                                type="checkbox"
                                :id="'subdisease-' + index + '-' + subIndex"
                                :value="subdisease"
                                v-model="selectedSubDiseases[index]"
                            />
                            <label :for="'subdisease-' + index + '-' + subIndex">{{ subdisease }}</label>
                        </div>
                    </div>
                    <p v-if="selectedSubDiseases[index] && selectedSubDiseases[index].length > 0">
                        선택된 하위 질병: {{ selectedSubDiseases[index].join(', ') }}
                    </p>
                </div>
            </div>

            <button @click="submitSelections" :disabled="!hasSelections">선택 완료</button>
        </div>
        <!-- <div v-else>No data available</div> -->
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUnfoundDiseaseStore } from '@/fetch_datas/unfoundMedicalStore';

export default {
    name: 'ExtraMedicalPage',
    setup() {
        const router = useRouter();
        const unfoundDiseaseStore = useUnfoundDiseaseStore();
        const { analysedDiseases } = storeToRefs(unfoundDiseaseStore);

        const selectedSubDiseases = ref(analysedDiseases.value.map(() => []));
        const visibleSubDiseases = ref(analysedDiseases.value.map(() => false));

        const toggleSubDiseaseList = (index) => {
            visibleSubDiseases.value[index] = !visibleSubDiseases.value[index];
        };

        const hasSelections = computed(() => {
            return selectedSubDiseases.value.some((selections) => selections.length > 0);
        });

        const submitSelections = () => {
            console.log('Selected sub-diseases:', selectedSubDiseases.value);
            // 여기에 선택된 하위 질병을 처리하는 로직을 추가할 수 있습니다.
            // 예: API로 데이터 전송, 다음 페이지로 이동 등
        };

        const goBack = () => {
            router.go(-1);
        };

        return {
            analysedDiseases,
            selectedSubDiseases,
            visibleSubDiseases,
            toggleSubDiseaseList,
            hasSelections,
            submitSelections,
            goBack,
        };
    },
};
</script>

<style scoped>
#main-content {
    width: 100%;
    height: 100%;
    background-color: white;
    overflow-y: auto;
}

.setting-topbar {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 상단 바 스타일 */
.top-bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: white;
    padding: 15px 10px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
}

/* 뒤로가기 버튼 스타일 */
.back-button {
    position: absolute;
    left: 10px;
    background: none;
    border: none;
    cursor: pointer;
}

.bannerDiv {
    height: 220px;
    background-color: #79bbf4;
    text-align: left;
    padding: 20px 20px;
    position: relative; /* 이미지의 위치를 조정하기 위해 추가 */
}
.bannerFlexDiv {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 12px;
    align-items: center;
}
.petwoman {
    display: block;
    width: 120px;
    height: 120px;
    position: absolute; /* 부모 요소 내에서 위치를 조정 */
    right: 20px; /* 오른쪽으로 이동 */
    bottom: 30px; /* 하단 여백 설정 */
}
.no-diseases {
    text-align: center;
    margin-top: 20px;
    font-style: italic;
}

.submit-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

#disease-container {
    border-style: double;
    border-radius: 10px;
}
</style>
