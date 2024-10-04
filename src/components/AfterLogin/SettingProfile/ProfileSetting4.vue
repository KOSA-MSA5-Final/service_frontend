<template>
    <div class="pageContainer">
        <div class="bannerDiv">
            <div class="bannerFlexDiv">
                <div style="color: gray">설정하기</div>
                <div style="color: gray">
                    <span style="background-color: #1860c3; padding: 4px; color: white; border-radius: 5px">4</span>/ 4
                </div>
            </div>
            평소 반려동물의 <br />
            상태는 어떤가요?
            <img class="petwoman" :src="require('@/assets/medicine.png')" alt="" />
        </div>

        <div class="whiteContentDiv">
            <h2>질병 및 하위 질병 목록:</h2>
            <div v-if="diseaseData && Object.keys(diseaseData).length > 0">
                <div v-for="(subDiseaseList, diseaseName) in diseaseData" :key="diseaseName">
                    <h3>{{ diseaseName }}</h3>
                    <ul>
                        <li v-for="subDisease in subDiseaseList" :key="subDisease">{{ subDisease }}</li>
                    </ul>
                </div>
            </div>
            <p v-else>선택된 질병 정보가 없습니다.</p>
            <!-- 선택된 항목이 없을 경우 -->
        </div>
    </div>
</template>

<script>
import { useDiseaseStore } from '@/stores/profileDiseaseStore';
import axios from 'axios';
import { storeToRefs } from 'pinia';

export default {
    data() {
        return {
            diseaseData: {}, //서버에서 받은 질병과 하위 질병 데이터를 저장
        };
    },
    setup() {
        // Pinia에서 isDisease 상태를 가져옴
        const diseaseStore = useDiseaseStore();
        const { isDisease } = storeToRefs(diseaseStore);

        return {
            isDisease,
        };
    },
    mounted() {
        this.fetchSubDiseases();
    },
    methods: {
        async fetchSubDiseases() {
            try {
                //isDisease 배열을 서버에 보내고 데이터를 받아옴
                const token = localStorage.getItem('token'); // 저장된
                const response = await axios.post(
                    '/profile/subdiseases',
                    this.isDisease, //pinia에서 보내온 값을 가져옴
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // JWT 토큰 포함
                        },
                    },
                );
                //서버로부터 받은 질병과 하위 질병 데이터를 저장
                this.diseaseData = response.data;
                console.log(this.diseaseData);
            } catch (error) {
                console.error('Error fetching sub disease: ', error);
            }
        },
    },
};
</script>

<style scoped>
.pageContainer {
    flex-grow: 1;
    overflow-y: auto;
    height: 100%; /* 스크롤바 숨기기 */
    scrollbar-width: none;
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
    right: 50px; /* 오른쪽으로 이동 */
    bottom: 30px; /* 하단 여백 설정 */
}
.whiteContentDiv {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background-color: white;
    padding: 20px 0px;
    text-align: left;
}
</style>
