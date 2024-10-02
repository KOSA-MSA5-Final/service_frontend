<template>
    <div class="main-page">
        <!-- 중간 이미지 섹션 (3분할) -->
        <div class="middle-section">
            <!-- 첫 번째 섹션 -->
            <div class="section-item">
                <h2>장군이 건강 맞춤 사료</h2>
                <ProductSlider />
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
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import ProductSlider from './ProductSlider.vue';

// Vue Router 사용을 위해 useRouter 훅을 호출합니다.
const router = useRouter();

// maps 페이지로 이동하는 함수
const navigateToMaps = () => {
    router.push({ name: 'MapsPage' }); // 라우터 네임을 사용하여 이동
};
</script>

<style scoped>
.main-page {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.middle-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    background-color: #f5f5f5;
    padding: 20px;
}

.section-item {
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.section-item h2 {
    text-align: center;
    padding: 10px 0;
    background-color: #007aff;
    color: #fff;
    margin: 0;
}

.section-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.section-description {
    padding: 10px;
    background-color: #007aff;
    color: #fff;
    text-align: center;
}
</style>
