<template>
    <div class="product-page">
        <div>
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
                        <path
                            d="M160,89.75H56l53-53a9.67,9.67,0,0,0,0-14,9.67,9.67,0,0,0-14,0l-56,56a30.18,30.18,0,0,0-8.5,18.5c0,1-.5,1.5-.5,2.5a6.34,6.34,0,0,0,.5,3,31.47,31.47,0,0,0,8.5,18.5l56,56a9.9,9.9,0,0,0,14-14l-52.5-53.5H160a10,10,0,0,0,0-20Z"
                        ></path>
                    </svg>
                </button>
                <div class="main-title">
                    <!-- type에 따라 다른 상품 목록을 렌더링 -->
                    <div v-if="productType === 'feed'">{{ profileName }} 건강 맞춤 사료</div>
                    <div v-else-if="productType === 'snack'">{{ profileName }}가 좋아할 간식</div>
                    <div v-else-if="productType === 'supplement'">{{ profileName }}가 좋아할 영양제</div>
                    <div v-else>
                        <h2>해당하는 상품이 없습니다.</h2>
                    </div>
                </div>
            </div>
            <div class="category-buttons">
                <button
                    class="category-btn"
                    :class="{ active: activeCategory === '맞춤형' }"
                    @click="searchCategory('맞춤형')"
                >
                    맞춤형
                </button>
                <button
                    class="category-btn"
                    :class="{ active: activeCategory === '전체' }"
                    @click="searchCategory('전체')"
                >
                    전체
                </button>
            </div>

            <!-- 검색창 및 필터 버튼 -->
            <div class="filter-container">
                <input
                    type="text"
                    v-model="searchQuery"
                    @input="onSearchQueryChange"
                    placeholder="상품 검색"
                    class="input-box"
                />
                <button @click="toggleFilterMenu" class="filter-button">필터</button>
            </div>

            <!-- 필터링 체크박스 메뉴 (필터 버튼 클릭 시 표시/숨김) -->
            <div v-if="showFilterMenu" class="filter-menu" ref="filterMenuRef">
                <div class="boundary"></div>
                <div class="f-subtype">
                    <span style="float: left; margin-left: 20px; flex-shrink: 0; margin-right: 5px">상품 분류</span>
                    <label v-for="subtype in availableSubtypes" :key="subtype">
                        <input type="checkbox" :value="subtype" v-model="selectedSubtypes" @change="onFilterChange" />
                        {{ subtype }}
                    </label>
                </div>

                <div class="f-origin">
                    <span style="float: left; margin-left: 20px; flex-shrink: 0; margin-right: 25px">원산지</span>
                    <label v-for="origin in availableOrigins" :key="origin">
                        <input type="checkbox" :value="origin" v-model="selectedOrigins" @change="onFilterChange" />
                        {{ origin }}
                    </label>
                </div>
            </div>

            <div class="main-content">
                <!-- 상품 목록을 Grid 형태로 렌더링 -->
                <!-- @click="goToProductDetails(product.id)" -->
                <div class="product-grid">
                    <div v-for="product in FilteredProducts" :key="product.id" class="product-card">
                        <a @click.prevent="goToProductDetails(product.id)" class="block">
                            <img
                                :src="product.mainimageurl ? product.mainimageurl : product.imageUrls[0]"
                                :alt="product.mainimageurl"
                                class="product-image"
                            />
                        </a>
                        <div class="product-details">
                            <div class="product-name">{{ product.name }}</div>
                            <div class="product-price">₩{{ product.price }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useCurrentProfileStore } from '@/fetch_datas/currentProfileStore';
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';
import router from '@/routes';

const route = useRoute();
const productType = route.params.type;

// Pinia 스토어 사용
const profileStore = useCurrentProfileStore();
const productStore = useProductStore();
const { contents } = storeToRefs(profileStore);
const { products } = storeToRefs(productStore);

const activeCategory = ref('전체'); // 활성화된 카테고리 상태
// const defaultImage = 'https://via.placeholder.com/150'; // 기본 이미지 URL

// 로컬 상태 변수
const searchQuery = ref(''); // 검색어
const selectedSubtypes = ref([]); // 선택된 서브타입 체크박스 목록
const selectedOrigins = ref([]); // 선택된 원산지 체크박스 목록
const showFilterMenu = ref(false); // 필터 메뉴 토글 상태
const filterMenuRef = ref(null); // 필터 메뉴를 참조할 ref 변수 생성

const profileName = computed(() => contents.value?.name || '반려동물');
const profileAnimalType = computed(() => contents.value?.animalDetailDTO?.animalDTO?.name || 'Unknown');

// 필터링된 상품 목록
const FilteredProducts = computed(() => {
    return products.value.filter((product) => {
        const matchesType = product.type === productType;
        const matchesAnimalType = product.animalName === profileAnimalType.value;
        const matchesSubtype = selectedSubtypes.value.length === 0 || selectedSubtypes.value.includes(product.subtype);
        const matchesOrigin = selectedOrigins.value.length === 0 || selectedOrigins.value.includes(product.origin);

        const matchesSearchQuery =
            product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.origin?.toLowerCase().includes(searchQuery.value.toLowerCase());

        if (activeCategory.value === '전체') {
            return matchesType && matchesAnimalType && matchesSearchQuery && matchesSubtype && matchesOrigin;
        } else if (activeCategory.value === '맞춤형') {
            return (
                matchesType &&
                matchesAnimalType &&
                product.isCustom &&
                matchesSearchQuery &&
                matchesSubtype &&
                matchesOrigin
            );
        }
    });
});

// 현재 보여지는 상품의 서브타입 목록
const availableSubtypes = computed(() => {
    const subtypes = new Set();
    FilteredProducts.value.forEach((product) => {
        if (product.subtype) {
            subtypes.add(product.subtype);
        }
    });
    return Array.from(subtypes);
});

// 현재 보여지는 상품의 원산지 목록
const availableOrigins = computed(() => {
    const origins = new Set();
    FilteredProducts.value.forEach((product) => {
        if (product.origin) {
            origins.add(product.origin);
        }
    });
    return Array.from(origins);
});

// 필터 메뉴 토글 함수
const toggleFilterMenu = () => {
    if (showFilterMenu.value) {
        // 필터 메뉴가 이미 열려 있는 경우 (닫기)
        nextTick(() => {
            const filterMenu = document.querySelector('.filter-menu');
            if (filterMenu) {
                filterMenu.style.maxHeight = `${filterMenu.scrollHeight}px`; // 현재 높이를 max-height에 설정
                requestAnimationFrame(() => {
                    filterMenu.style.transition = 'max-height 0.3s ease-in-out';
                    filterMenu.style.maxHeight = '0px'; // max-height을 0으로 설정하여 숨김
                });
            }
        });
        setTimeout(() => {
            showFilterMenu.value = false;
        }, 500); // 애니메이션 시간이 끝난 후 요소 숨김
    } else {
        // 필터 메뉴가 닫혀 있는 경우 (열기)
        showFilterMenu.value = true; // 먼저 v-if를 통해 요소를 화면에 렌더링
        nextTick(() => {
            const filterMenu = document.querySelector('.filter-menu');
            if (filterMenu) {
                filterMenu.style.transition = 'none';
                filterMenu.style.maxHeight = '0px'; // max-height을 0으로 설정하여 숨김
                requestAnimationFrame(() => {
                    filterMenu.style.transition = 'max-height 0.3s ease-in-out';
                    filterMenu.style.maxHeight = `${filterMenu.scrollHeight}px`; // 실제 높이로 설정하여 펼침
                });
            }
        });
    }
};

// 상품 클릭 시 해당 상품의 ID로 라우팅
const goToProductDetails = (productId) => {
    router.push({ name: 'ProductDetails', params: { id: productId } });
};

// 검색어 변경 시 호출되는 함수
const onSearchQueryChange = () => {
    productStore.updateSearchQuery(searchQuery.value);
};

// 필터링 옵션 변경 시 호출되는 함수
const onFilterChange = () => {
    productStore.updateSelectedSubtype(selectedSubtypes.value);
    productStore.updateSelectedOrigin(selectedOrigins.value);
};

// 프로필 및 상품 데이터를 가져오는 onMounted 함수
onMounted(async () => {
    await profileStore.fetchContents();
    await productStore.fetchAllProducts();
});

// 카테고리 버튼 클릭 시 호출되는 함수
const searchCategory = (category) => {
    activeCategory.value = category;
};

// 뒤로가기 버튼 클릭 시 이전 페이지로 이동하는 함수
const goBack = () => {
    window.history.back();
};

// // 상품 클릭 시 해당 상품의 ID로 라우팅
// const goToProductDetails = (productId) => {
//     route.push({ name: 'ProductDetails', params: { id: productId } });
// };
</script>

<style scoped>
.product-page {
    display: flex;
    flex-direction: column;
    height: 100%; /* 전체 화면 높이 */
    background-color: #cee2f5;
    width: 100%;
    margin: 0 auto;
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

/* 검색 제목 스타일 */
.main-title {
    font-size: 20px;
}

/* 카테고리 버튼들 스타일 */
.category-buttons {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

/* 각 카테고리 버튼 스타일 */
.category-btn {
    flex: 1; /* 동일한 너비를 가지도록 설정 */
    margin: 0 0px;
    height: 55px;
    padding-top: 5px;
    border: none;
    background-color: #f9f9f9;
    color: black;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

/* 버튼 호버 시 배경색 변경 */
.category-btn:hover {
    background-color: #539ee0;
}

/* 활성화된 버튼에 적용되는 스타일 */
.category-btn.active {
    background-color: #539ee0; /* 활성화된 버튼의 배경색 */
    font-weight: bold; /* 활성화된 버튼의 글씨 두껍게 */
    color: #fff; /* 활성화된 버튼의 글자색 */
    border: 2px solid #539ee0; /* 테두리 추가 */
}

/* 필터 컨테이너 스타일 */
.filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px;
    background-color: #cee2f5;
}

.input-box {
    padding: 7px 10px;
    margin-left: 15px;
    border-radius: 5px;
    border: none;
}

.filter-button {
    padding: 5px 10px;
    background-color: white;
    color: black;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 15px;
}

/* 필터링 체크박스 메뉴 스타일 */
.filter-menu {
    overflow: hidden; /* 넘치는 부분을 숨김 */
    max-height: 0; /* 초기 max-height 값 설정 */
    transition: max-height 0.3s ease-in-out; /* max-height 변화에 대한 애니메이션 */
}

.filter-menu label {
    font-size: 14px;
    margin-left: 5px;
}

.boundary {
    border-top: 1px solid #6f6f6f;
    width: 90%;
    margin: 0 auto;
    padding: 3px 0px;
}

.f-subtype,
.f-origin {
    display: flex;
    align-items: center;
}

/* Main Content 스타일 */
.main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #cee2f5;
    padding: 0px 5px;
    margin-bottom: 60px;
    overflow-y: auto;
    scrollbar-width: none;
    height: calc(100vh - 60px - 110px);
}

/* 상품 목록 그리드 스타일 */
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(186px, 1fr)); /* 기본 가로 2열 */
    row-gap: 10px;
    column-gap: 3px;
    justify-content: center;
    justify-items: center;
    padding: 5px;
    margin-bottom: 10px; /* 아래쪽 여백 추가 */
}

/* 상품 카드 스타일 */
.product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 5px 7px;
    background-color: white;
    width: 186px;
    justify-content: center; /* 그리드 아이템을 중앙 정렬 */
}

/* 상품 이미지 스타일 */
.product-image {
    max-height: 150px;
    max-width: 150px;
    height: 100%;
    width: 100%;
    object-fit: cover;
}

/* 상품 상세 스타일 */
.product-details {
    text-align: center;
    padding: 5px 0;
}

.product-name {
    display: block;
    margin-bottom: 5px;
    color: #333;
    text-decoration: none;
    font-size: 0.8em;
    height: 40px;
    align-content: center;
}

.product-price {
    font-weight: bold;
    font-size: 0.9em;
}
</style>
