<template>
    <div class="main-page">
        <!-- 중간 이미지 섹션 (4분할) -->
        <div class="middle-section" v-if="profileName">
            <!-- 첫 번째 섹션 -->
            <div class="section-item">
                <div id="title-container">
                    <div id="title-p-container">{{ profileName }}의 맞춤 시설 찾기</div>
                    <div id="title-img-container">
                        <img
                            class="icon"
                            src="@/assets/icon-right-arrow.svg"
                            alt="Right Arrow Icon"
                            @click.stop="navigateToPage('MapsPage', 'facility')"
                        />
                    </div>
                </div>
                <img src="@/assets/animal_hospital.jpg" alt="Animal Hospital" />
            </div>
            <!-- 두 번째 섹션 -->
            <div class="section-item">
                <div id="title-container">
                    <div id="title-p-container">{{ profileName }} 건강 맞춤 사료</div>
                    <div id="title-img-container">
                        <img
                            class="icon"
                            src="@/assets/icon-right-arrow.svg"
                            alt="Right Arrow Icon"
                            @click.stop="navigateToPage('ProductPage', 'feed')"
                        />
                    </div>
                </div>
                <!-- 필터링된 feedProducts를 ProductSlider 컴포넌트에 props로 전달 -->
                <ProductSlider :products="feedProducts" />
            </div>

            <!-- 세 번째 섹션 -->
            <div class="section-item">
                <div id="title-container">
                    <div id="title-p-container">{{ profileName }}가 좋아할 간식</div>
                    <div id="title-img-container">
                        <img
                            class="icon"
                            src="@/assets/icon-right-arrow.svg"
                            alt="Right Arrow Icon"
                            @click.stop="navigateToPage('ProductPage', 'snack')"
                        />
                    </div>
                </div>
                <!-- 필터링된 snackProducts를 ProductSlider 컴포넌트에 props로 전달 -->
                <ProductSlider :products="snackProducts" />
            </div>

            <!-- 네 번째 섹션 -->
            <div class="section-item">
                <div id="title-container">
                    <div id="title-p-container">{{ profileName }}가 좋아할 영양제</div>
                    <div id="title-img-container">
                        <img
                            class="icon"
                            src="@/assets/icon-right-arrow.svg"
                            alt="Right Arrow Icon"
                            @click.stop="navigateToPage('ProductPage', 'supplement')"
                        />
                    </div>
                </div>
                <!-- 필터링된 supplementProducts를 ProductSlider 컴포넌트에 props로 전달 -->
                <ProductSlider :products="supplementProducts" />
            </div>
        </div>

        <!-- 로딩 중이거나 프로필 정보가 없는 경우 -->
        <div v-else>
            <p>프로필 정보를 불러오고 있습니다...</p>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCurrentProfileStore } from '@/fetch_datas/currentProfileStore';
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';
import ProductSlider from './ProductSlider.vue';

const router = useRouter();
const profileStore = useCurrentProfileStore();
const productStore = useProductStore();
const { contents } = storeToRefs(profileStore);
const { products } = storeToRefs(productStore);

onMounted(async () => {
    await profileStore.fetchContents();
    await productStore.fetchAllProducts();
});

const profileName = computed(() => contents.value?.name || '반려동물');

// 프로필의 동물 타입을 확인하기 위해 animalType을 추출
const profileAnimalType = computed(() => {
    // contents가 존재하고, animalDetailDTO 및 animalDTO가 존재할 경우 animalDTO의 name을 반환
    return contents.value?.animalDetailDTO?.animalDTO?.name;
});

// 상품 타입에 따라 필터링된 상품들을 computed로 정의
const feedProducts = computed(() =>
    products.value.filter((product) => product.type === 'feed' && product.animalName === profileAnimalType.value),
);
const snackProducts = computed(() =>
    products.value.filter((product) => product.type === 'snack' && product.animalName === profileAnimalType.value),
);
const supplementProducts = computed(() =>
    products.value.filter((product) => product.type === 'supplement' && product.animalName === profileAnimalType.value),
);

const navigateToPage = (pageName, type) => {
    router.push({ name: pageName, params: { type } });
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
    display: flex; /* Flex 레이아웃 적용 */
    justify-content: space-between; /* 요소들을 양쪽 끝에 배치 */
    align-items: center; /* 수직 가운데 정렬 */
    padding: 10px 10px;
    background-color: #539ee0;
    color: #fff;
    margin: 0;
    font-size: 14px;
}

#title-img-container {
    display: flex;
    justify-content: flex-end;
}

#title-img-container img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

#title-p-container {
    margin-left: 5px;
}

.section-item img {
    width: 100%;
    max-width: 500px;
    height: 200px;
    object-position: center; /* 이미지의 중심을 기준으로 배치 */
    object-fit: cover;
}

.icon {
    filter: invert(100%) sepia(0%) saturate(7483%) hue-rotate(253deg) brightness(108%) contrast(104%);
}
</style>
