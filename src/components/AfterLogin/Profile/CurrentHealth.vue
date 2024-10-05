<template>
    <div class="current-health-page">
        <div class="setting-topbar">
            <!-- 상단 바 -->
            <div class="top-bar">
                <!-- 왼쪽에 뒤로가기 버튼 -->
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
                            <title></title>
                            <path
                                d="M160,89.75H56l53-53a9.67,9.67,0,0,0,0-14,9.67,9.67,0,0,0-14,0l-56,56a30.18,30.18,0,0,0-8.5,18.5c0,1-.5,1.5-.5,2.5a6.34,6.34,0,0,0,.5,3,31.47,31.47,0,0,0,8.5,18.5l56,56a9.9,9.9,0,0,0,14-14l-52.5-53.5H160a10,10,0,0,0,0-20Z"
                            ></path>
                        </g>
                    </svg>
                </button>
                <!-- 가운데에 '병원 영수증 추가' 텍스트 -->
                <div class="title">장군이 건강상태</div>
            </div>
        </div>
        <div class="main-content">
            <!-- 상단 프로필 정보 섹션 -->
            <div class="header">
                <div class="profile-card">
                    <img
                        class="profile-image"
                        :src="profileData.pictureUrl || 'path/to/default-image.png'"
                        alt="반려동물 프로필 이미지"
                    />
                    <div class="profile-details">
                        <p>만 {{ profileData.age }}세 ({{ profileData.ageMonths }}개월)</p>
                        <p>생일: {{ formatBirthday(profileData.birthday) }}</p>
                        <p>{{ profileData.animalType }} {{ profileData.gender }} (강아지)</p>
                    </div>
                </div>
            </div>

            <!-- 최근 병원 방문 정보 섹션 -->
            <div class="recent-visit-section">
                <h3>최근 병원 방문</h3>
                <div class="visit-details-wrapper">
                    <div class="visit-details">
                        <p><strong>방문 일자:</strong> 2022년 03월 02일</p>
                        <p><strong>병원 이름:</strong> 무슨동아지진료병원</p>
                        <p><strong>병원 위치:</strong> 서울시 강남구 샘플로</p>
                        <p><strong>방문 사유:</strong> 건강검진 및 중성화</p>
                        <p><strong>결제 금액:</strong> 200,000원</p>
                    </div>
                    <button class="receipt-button">
                        <svg
                            height="25px"
                            width="25px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z"
                                    stroke="#000000"
                                    stroke-width="2"
                                    stroke-linejoin="round"
                                ></path>
                            </g>
                        </svg>
                        <br />
                        영수증 확인
                    </button>
                </div>
            </div>

            <!-- 현재 앓고 있는 질환 정보 -->
            <div class="disease-section">
                <h3>현재 앓고 있는 질환</h3>
                <div class="disease-tags">
                    <div class="disease-tag">피부계통(대분류) - 진균성 피부질환(소분류)</div>
                    <div class="disease-tag">호흡기계통(대분류) - 상부 호흡기 증후군(소분류)</div>
                </div>
            </div>

            <!-- 현재 가지고 있는 알러지원 정보 -->
            <div class="allergies-section">
                <h3>현재 가지고 있는 알러지원</h3>
                <div class="allergies-tags">
                    <div class="allergy-tag">육류(타입) - 닭고기</div>
                    <div class="allergy-tag">과일(타입) - 복숭아</div>
                </div>
            </div>

            <!-- 하단 버튼들 -->
            <div class="bottom-bar">
                <div class="actions-section">
                    <button class="action-button">
                        전체 기록<br />
                        확인하기
                    </button>
                    <button class="action-button">
                        전체 기록<br />
                        내보내기
                    </button>
                    <button class="action-button">
                        병원 기록만<br />
                        내보내기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { fetch_userInfo } from '@/fetch_datas/fetch_userInfo';

// Pinia 스토어 가져오기
const userInfoStore = fetch_userInfo();

// 데이터 로드 완료 여부 체크
const isDataFetched = ref(false);

// 컴포넌트가 마운트될 때 데이터 가져오기
onMounted(async () => {
    await userInfoStore.fetchContents();
    isDataFetched.value = true;
});

// 현재 프로필 데이터를 가져오는 computed
const profileData = computed(() => {
    // 데이터가 배열인지 확인 후 처리
    const profiles = Array.isArray(userInfoStore.contents) ? userInfoStore.contents : [];
    const profile = profiles.find((item) => item.isCurrent === 'T') || {};
    return {
        name: profile.name || '',
        age: profile.age || 0,
        birthday: profile.birthday || '',
        gender: profile.gender || '',
        pictureUrl: profile.pictureUrl || '',
        animalType: profile.animalDetail?.type || '강아지',
        ageMonths: profile.ageMonths || 0, // 나이를 월 단위로 계산
    };
});

// 생일을 포맷팅하는 함수
const formatBirthday = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date);
    return `${formattedDate.getFullYear()}년 ${formattedDate.getMonth() + 1}월 ${formattedDate.getDate()}일`;
};

// 뒤로가기 버튼 클릭 핸들러
const goBack = () => {
    window.history.back();
};
</script>

<style scoped>
.current-health-page {
    display: flex;
    flex-direction: column;
    height: 100%; /* 전체 화면 높이 */
    background-color: #f0f8ff;
    width: 100%;
    margin: 0 auto;
}

.main-content {
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    display: flex;
    flex-direction: column; /* 자식 요소를 세로로 배치 */
    background-color: #cee2f5;
    padding: 10px 5px;
    margin-bottom: 60px; /* bottom-bar와 겹치지 않도록 여백 추가 */
    overflow-y: auto;
    height: calc(100vh - 60px - 50px);
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
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
}
/* 뒤로가기 버튼 스타일 */
.back-button {
    position: absolute;
    left: 10px;
    background: none;
    border: none;
    cursor: pointer;
}

/* 검색 제목 스타일 */
.title {
    font-size: 20px;
}

/* 각 섹션 높이 조절 */
.header,
.recent-visit-section,
.disease-section,
.allergies-section,
.actions-section {
    flex-grow: 1; /* 자식 요소의 크기를 동일하게 늘리기 */
    margin: 10px 0;
}

/* 상단 프로필 정보 스타일 */
.header {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 15px;
    padding: 5px;
}

.profile-card {
    display: flex;
    align-items: center;
    padding: 10px;
}

.profile-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid #cce7ff;
    margin-right: 20px;
}

.profile-details p {
    margin: 5px 0;
    color: #333;
    font-size: 12px;
    margin: 10px 10px;
}

/* 최근 병원 방문 정보 섹션 스타일 */
.recent-visit-section {
    background-color: #ffffff;
    padding: 10px 20px;
    border-radius: 15px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.disease-section h3,
.allergies-section h3,
.recent-visit-section h3 {
    color: #333;
    text-align: center;
    margin-bottom: 10px;
    position: relative;
    padding-bottom: 5px;
    border-bottom: 1.5px solid #404040;
}

/* 텍스트와 버튼을 가로로 배치하기 위해 flex 적용 */
.visit-details-wrapper {
    display: flex; /* 가로 정렬을 위한 flex 설정 */
    justify-content: space-between; /* 요소 간 공간 균등 배치 */
    align-items: center; /* 요소들을 수직 중앙에 정렬 */
}
.visit-details {
    text-align: left;
    width: 80%;
    float: left;
    font-size: 12px;
}

.visit-details p {
    margin: 5px 10px;
}

.visit-detail-item {
    font-size: 14px;
    margin: 5px 0;
    line-height: 1.5;
    color: #333;
}

.receipt-button {
    padding: 10px 20px;
    background-color: #f9f9f9;
    color: black;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    font-size: 12px;
}

.receipt-button svg {
    margin-bottom: 10px; /* 아이콘과 텍스트 사이의 간격 조정 */
}

.receipt-button:hover {
    background-color: #005fa3;
}

/* 현재 앓고 있는 질환 및 알러지원 섹션 스타일 */
.disease-section,
.allergies-section {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.disease-tags,
.allergies-tags {
    display: flex;
    flex-wrap: wrap;
}

.disease-tag,
.allergy-tag {
    background-color: #cce7ff;
    padding: 10px 15px;
    border-radius: 20px;
    margin: 5px;
    color: #333;
}

/* 하단 액션 버튼들 스타일 */
.bottom-bar {
    position: fixed; /* 하단 고정 */
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #cee2f5;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
    display: flex; /* 자식 요소 정렬 */
    justify-content: center; /* 자식 요소들을 가운데 정렬 */
    z-index: 100;
}

.actions-section {
    display: flex;
    justify-content: center;
}

.action-button {
    padding: 10px;
    background-color: #f9f9f9;
    color: black;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin: 0 10px;
    font-size: 12px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.action-button:hover {
    background-color: #005fa3;
}
</style>
