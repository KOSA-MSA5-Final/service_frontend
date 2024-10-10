<template>
    <div v-if="!loading">
        <!-- 현재 프로필 데이터가 존재하는 경우에만 화면에 표시 -->
        <div v-if="currentProfile && Object.keys(currentProfile).length > 0" class="current-health-page">
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
                    <!-- 가운데에 '건강 상태' 텍스트 -->
                    <div class="title">{{ currentProfile.name }} 건강상태</div>
                </div>
            </div>

            <div class="main-content" id="main-content">
                <!-- 상단 프로필 정보 섹션 -->
                <div class="header">
                    <div class="profile-card">
                        <img
                            class="profile-image"
                            :src="currentProfile.pictureUrl || defaultProfileImage"
                            alt="반려동물 프로필 이미지"
                        />
                        <div class="profile-details">
                            <p style="font-size: 14px">{{ currentProfile.name }}</p>
                            <p>만 {{ currentProfile.age }}세</p>
                            <p>생일: {{ formatBirthday(currentProfile.birthday) }}</p>
                            <p>
                                {{ currentProfile.animalType }} / {{ currentProfile.gender }} ({{
                                    currentProfile.animalName
                                }})
                            </p>
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
                    <!-- currentProfile.diseases가 정의되어 있고, 길이가 0 이상인 경우에만 렌더링 -->
                    <div v-if="currentProfile.diseases && currentProfile.diseases.length > 0">
                        <!-- 각 질병을 감싸는 컨테이너 -->
                        <div v-for="(disease, index) in currentProfile.diseases" :key="index">
                            <!-- 질병 이름과 소분류를 나타내는 태그 -->
                            <div class="disease-tag">{{ disease.diseaseName }} - {{ disease.diseaseSubCategory }}</div>

                            <!-- 진단 날짜 및 진행 상태 -->
                            <div class="disease-info">
                                <div class="diagnosis-date">
                                    진단 날짜: {{ formatDiagnosisDate(disease.diagnosisDate) }}
                                </div>
                                <div class="progress-status">
                                    진행 상태: {{ disease.progressStatus === 'T' ? '진행 중' : '완료' }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 질환 정보가 없을 경우 안내 메시지 표시 -->
                    <div v-else>
                        <p>현재 등록된 질환 정보가 없습니다.</p>
                    </div>
                </div>

                <!-- 현재 가지고 있는 알러지원 정보 섹션 -->
                <div class="allergies-section">
                    <h3>현재 가지고 있는 알러지원</h3>
                    <!-- currentProfile.allergies가 정의되어 있고, 길이가 0 이상인 경우에만 렌더링 -->
                    <div v-if="currentProfile.allergies && currentProfile.allergies.length > 0">
                        <div v-for="(allergy, index) in currentProfile.allergies" :key="index" class="allergy-tag">
                            {{ allergy.allergyType }} - {{ allergy.allergyName }}
                        </div>
                    </div>
                    <!-- 알러지원 정보가 없을 경우 안내 메시지 표시 -->
                    <div v-else>
                        <p>현재 등록된 알러지원 정보가 없습니다.</p>
                    </div>
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
                    <button class="action-button" @click="exportCurrentRecords">
                        현재 기록<br />
                        내보내기
                    </button>
                </div>
            </div>
            <!-- 메시지 알림 표시 -->
            <div class="export-message">{{ currentProfile.name }} PDF가 성공적으로 저장되었습니다.</div>
        </div>
        <!-- 프로필 데이터가 없는 경우를 처리하는 메시지 -->
        <div v-else>
            <p>프로필 데이터가 없습니다.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserInfoStore } from '@/fetch_datas/userInfo'; // Pinia Store import
import { storeToRefs } from 'pinia'; // storeToRefs 추가
import defaultProfileImage from '@/assets/jangoon.gif'; // 기본 프로필 이미지 경로 설정
import html2canvas from 'html2canvas'; // html2canvas import
import jsPDF from 'jspdf'; // jsPDF import

// Pinia Store 인스턴스 가져오기
const userInfoStore = useUserInfoStore();
const { profiles, loading } = storeToRefs(userInfoStore); // profiles와 loading 상태 가져오기

const exportMessage = ref(''); // PDF 저장 메시지 내용

// 컴포넌트가 마운트될 때 서버에서 프로필 데이터를 가져옴
onMounted(async () => {
    const memberId = 1; // 특정 회원 ID (로그인한 사용자 ID)
    await userInfoStore.fetchProfiles(memberId);
});

// 성별 변환 함수
const mapGender = (gender) => {
    const genderMapping = {
        female: '여아',
        male: '남아',
    };
    return genderMapping[gender] || '알 수 없음';
};

// 진단 날짜 포맷팅 함수
const formatDiagnosisDate = (date) => {
    if (!date) return '알 수 없음';
    const formattedDate = new Date(date);
    return `${formattedDate.getFullYear()}년 ${formattedDate.getMonth() + 1}월 ${formattedDate.getDate()}일`;
};

// 현재 프로필 데이터를 찾는 computed
const currentProfile = computed(() => {
    const allProfiles = Array.isArray(profiles.value) ? profiles.value : [];
    const profile = allProfiles.find((profile) => profile.isCurrent === 'T') || {};

    // gender 변환 및 기본 이미지 설정, allergies 필드 추가
    return {
        ...profile,
        gender: mapGender(profile.gender),
        pictureUrl: profile.pictureUrl || defaultProfileImage, // 기본 이미지 설정
        allergies: profile.allergies || [], // allergies가 없을 경우 빈 배열 설정
        disease: profile.diseases || [],
    };
});

// 생일을 포맷팅하는 함수
const formatBirthday = (date) => {
    if (!date) return '알 수 없음';
    const formattedDate = new Date(date);
    return `${formattedDate.getFullYear()}년 ${formattedDate.getMonth() + 1}월 ${formattedDate.getDate()}일`;
};

// PDF 내보내기 함수
const exportCurrentRecords = () => {
    const captureElement = document.getElementById('main-content'); // 캡처할 영역의 ID 설정

    if (captureElement) {
        html2canvas(captureElement, {
            scale: 2, // 스케일 조정으로 해상도 높이기
            ignoreElements: (element) => element.classList.contains('recent-visit-section'), // 제외할 섹션
            useCORS: true, // CORS 이슈 방지
            windowWidth: 412, // 모바일 환경의 가로 크기 (예시)
            windowHeight: captureElement.clientHeight, // 캡처할 전체 높이 설정
        }).then((canvas) => {
            const imageData = canvas.toDataURL('image/png');

            // PDF 크기를 HTML 요소의 비율과 맞추기
            const canvasWidth = canvas.width * 0.3; // HTML 요소의 너비
            const canvasHeight = canvas.height * 0.3; // HTML 요소의 높이

            // PDF 설정 - 단위를 px로 설정하여 HTML 요소 비율에 맞추기
            const pdf = new jsPDF('p', 'px', [canvas.width * 0.32, canvas.height * 0.32]);

            // PDF에 이미지 추가
            pdf.addImage(imageData, 'PNG', 8, 10, canvasWidth, canvasHeight);

            // PDF 파일로 저장
            pdf.save(`${currentProfile.value.name}_기록.pdf`);

            // PDF 저장 후 메시지 표시
            showExportMessage();

            // 3초 후 메시지 자동 삭제
            // setTimeout(() => {
            //     exportMessage.value = '';
            // }, 3000);
        });
    } else {
        console.error('캡처할 요소를 찾을 수 없습니다.');
    }
};

// PDF 저장 메시지 표시 함수
const showExportMessage = () => {
    const alertMessageElement = document.querySelector('.export-message');
    exportMessage.value = '{{ currentProfile.name }} PDF가 성공적으로 저장되었습니다.';

    if (alertMessageElement) {
        alertMessageElement.classList.add('show');
    }
    setTimeout(() => {
        if (alertMessageElement) {
            alertMessageElement.classList.remove('show'); // show 클래스를 제거하여 메시지 숨김}
        }
    }, 1500); // 1.5초 후 메시지가 사라지도록 설정
};

// 뒤로가기 버튼 클릭 함수
const goBack = () => {
    window.history.back();
};
</script>

<style scoped>
.current-health-page {
    display: flex;
    flex-direction: column;
    height: 100%; /* 전체 화면 높이 */
    background-color: #cee2f5;
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
    scrollbar-width: none;
    height: calc(100vh - 60px - 70px);
    border-radius: 10px;
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
    background-color: rgb(180, 180, 180);
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
    border-radius: 10px;
    margin: 5px;
    color: #333;
    width: 100%;
}

/* 진단 날짜와 진행 상태를 나타내는 정보 */
.disease-info {
    display: flex;
    justify-content: space-between; /* 진단 날짜와 진행 상태를 양쪽으로 배치 */
    font-size: 12px;
    margin-top: 5px; /* 질병 이름과 간격 조정 */
    padding: 0px 20px;
    background-color: #f5faff;
    border-radius: 5px;
}

/* 진단 날짜 스타일 */
.diagnosis-date {
    flex: 1; /* 공간을 균등하게 차지하도록 설정 */
    text-align: left; /* 텍스트를 오른쪽으로 정렬 */
}

/* 진행 상태 스타일 */
.progress-status {
    flex: 1; /* 공간을 균등하게 차지하도록 설정 */
    text-align: right; /* 텍스트를 오른쪽으로 정렬 */
}

/* 하단 액션 버튼들 스타일 */
.bottom-bar {
    position: fixed; /* 하단 고정 */
    bottom: 0;
    /* left: 0px; */
    width: 100%;
    max-width: 1320px; /* 화면 너비를 초과하지 않도록 설정 */
    background-color: #cee2f5;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
    display: flex; /* 자식 요소 정렬 */
    justify-content: center; /* 자식 요소들을 가운데 정렬 */
    z-index: 100;
    box-sizing: border-box;
    overflow: hidden; /* 요소가 넘칠 경우 숨김 */
}

@media (max-width: 1400px) {
    .bottom-bar {
        width: 1140px;
    }
}

@media (max-width: 1200px) {
    .bottom-bar {
        max-width: 960px;
    }
}

@media (max-width: 1000px) {
    .bottom-bar {
        max-width: 960px;
    }
}

@media (max-width: 992px) {
    .bottom-bar {
        max-width: 720px;
    }
}

@media (max-width: 768px) {
    .bottom-bar {
        max-width: 540px;
    }
}

@media (max-width: 576px) {
    .bottom-bar {
        max-width: 540px;
    }
}

@media (max-width: 574px) {
    .bottom-bar {
        max-width: 100%;
    }
}

.actions-section {
    display: flex;
    justify-content: center;
    width: 100%;
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
    background-color: rgb(180, 180, 180);
}

.export-message {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    z-index: 999;
    font-size: 14px;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease-in-out, visibility 0s linear 1s;
}

/* 메시지가 보일 때 적용할 클래스 */
.export-message.show {
    opacity: 0.9;
    visibility: visible;
    transition: opacity 0.5s ease-in-out;
}
</style>
