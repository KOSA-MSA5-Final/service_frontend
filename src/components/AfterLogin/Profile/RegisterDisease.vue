<template>
    <div id="main-content">
        <div class="setting-topbar">
            <div class="top-bar">
                <button class="back-button" @click="goBack">
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
        <div id="content">
            <h2>GPT 분석 결과</h2>
            <div v-for="(disease, index) in gpt_result" :key="index" class="disease-item">
                <h3>{{ disease.disease_title }}</h3>
                <ul>
                    <li v-for="(reason, reasonIndex) in disease.reasons" :key="reasonIndex">
                        {{ reason }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'RegisterDiseasePage',
    setup() {
        const router = useRouter();
        const gpt_result = [
            {
                disease_title: '피부계통(귀)',
                reasons: [
                    '진찰료-초진',
                    '검사-귀-set (검이경, 현미경도말)',
                    '처치-귀치료 (털제거포함)',
                    '귀세정제 (MO)',
                    '귀약-연고(S)-15ml',
                ],
            },
            {
                disease_title: '피부계통',
                reasons: ['외용제-소독약 (30ml)', '외용제-N 연고(10g)'],
            },
            {
                disease_title: '근골격계통',
                reasons: ['미용-발바닥 밀기'],
            },
            {
                disease_title: '비뇨생식계통',
                reasons: ['네칼라 중/소'],
            },
            {
                disease_title: '소화기계통',
                reasons: ['내복약 1일'],
            },
        ];

        const goBack = () => {
            router.go(-1);
        };

        return {
            gpt_result,
            goBack,
        };
    },
};
</script>

<style>
#main-content {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
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
</style>
