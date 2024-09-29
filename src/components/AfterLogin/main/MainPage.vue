<template>
    <!-- 중간 이미지 섹션 (3분할) -->
    <div class="middle-section">
        <!-- 첫 번째 섹션 -->
        <div class="section-item">
            <img src="https://via.placeholder.com/150" alt="장군이 건강 맞춤 사료" />
            <div class="section-description">
                <span>장군이 건강 맞춤 사료</span>
            </div>
        </div>
        <!-- 두 번째 섹션 -->
        <div class="section-item">
            <img src="https://via.placeholder.com/150" alt="장군이가 좋아할 간식" />
            <div class="section-description">
                <span>장군이가 좋아할 간식</span>
            </div>
        </div>
        <!-- 세 번째 섹션 -->
        <div class="section-item" @click="navigateToMaps">
            <img src="https://via.placeholder.com/150" alt="장군이의 병원찾기" />
            <div class="section-description">
                <span>장군이의 병원찾기</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// Vue Router 사용을 위해 useRouter 훅을 호출합니다.
const router = useRouter();

// maps 페이지로 이동하는 함수
const navigateToMaps = () => {
    router.push({ name: 'MapsPage' }); // 라우터 네임을 사용하여 이동
};
</script>

<style scoped>
.middle-section {
    display: flex;
    flex-direction: column; /* 세로로 배열하기 */
    align-items: center; /* 세로 정렬 시 가운데 정렬 */
    width: 100%;
    padding: 10px;
    background-color: #f5f5f5;
    margin: 20px 0;
}

.section-item {
    width: 100%; /* 아이템을 부모의 너비에 맞추기 */
    text-align: center;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.section-item img {
    width: 100%;
    height: 170px; /* 이미지 높이 조정 */
    object-fit: cover;
}

.section-description {
    padding: 10px;
    background-color: #007aff;
    color: #fff;
}
</style>
