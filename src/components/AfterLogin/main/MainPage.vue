<template>
    <div class="main-page">
        <!-- 중간 이미지 섹션 (3분할) -->
        <div class="middle-section">
            <!-- 첫 번째 섹션 -->
            <div class="section-item" @click="navigateToMaps">
                <div id="title-container">
                    <div id="title-p-container">장군이의 시설 찾기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div id="title-img-container">
                        <img class="icon" src="@/assets/icon-right-arrow.svg" alt="Right Arrow Icon" />
                    </div>
                </div>
                <img src="@/assets/animal_hospital.jpg" />
            </div>
            <!-- 두 번째 섹션 -->
            <div class="section-item" @click="navigateToMaps">
                <div id="title-container">
                    <div id="title-p-container">장군이 건강 맞춤 사료&nbsp;&nbsp;</div>
                    <div id="title-img-container">
                        <img class="icon" src="@/assets/icon-right-arrow.svg" alt="Right Arrow Icon" />
                    </div>
                </div>
                <ProductSlider />
            </div>

            <!-- 세 번째 섹션 -->
            <div class="section-item" @click="navigateToMaps">
                <div id="title-container">
                    <div id="title-p-container">장군이가 좋아할 간식&nbsp;&nbsp;&nbsp;</div>
                    <div id="title-img-container">
                        <img class="icon" src="@/assets/icon-right-arrow.svg" alt="Right Arrow Icon" />
                    </div>
                </div>
                <ProductSlider />
            </div>

            <!-- 네 번째 섹션 -->
            <div class="section-item" @click="navigateToMaps">
                <div id="title-container">
                    <div id="title-p-container">장군이가 좋아할 영양제</div>
                    <div id="title-img-container">
                        <img class="icon" src="@/assets/icon-right-arrow.svg" alt="Right Arrow Icon" />
                    </div>
                </div>
                <ProductSlider />
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
    padding: 5px;
    background-color: white;
}

.middle-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    background-color: white;
    padding: 0px;
    border-radius: 8px;
}

.section-item {
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.section-item #title-container {
    display: flex;
    text-align: left;
    padding: 10px 10px;
    background-color: #539ee0;
    color: #fff;
    margin: 0;
    font-size: 14px;
}

#title-img-container img {
    width: 20px;
    height: 20px;
    color: white;
}

.section-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

#title-img-container {
}

.icon {
    filter: invert(100%) sepia(0%) saturate(7483%) hue-rotate(253deg) brightness(108%) contrast(104%);
    margin-left: 215px;
}
</style>
