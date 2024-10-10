import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [], // 상품 목록
        searchQuery: '', // 검색어
        selectedSubtype: '', // 선택된 서브타입
        selectedOrigin: '', // 선택된 원산지
        loading: false,
        error: null,
    }),

    actions: {
        // 모든 상품 데이터를 가져오는 액션
        async fetchAllProducts() {
            this.loading = true;
            this.error = null;

            try {
                const token = localStorage.getItem('token'); // 인증 토큰 가져오기
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get('https://localhost:8081/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.products = response.data || []; // API 응답 데이터를 상태에 저장
            } catch (error) {
                this.error = error.message;
                console.error('Failed to fetch products:', error);
            } finally {
                this.loading = false;
            }
        },

        // 검색어 업데이트 액션
        updateSearchQuery(newQuery) {
            this.searchQuery = newQuery;
        },

        // 서브타입 필터 업데이트 액션
        updateSelectedSubtype(newSubtype) {
            this.selectedSubtype = newSubtype;
        },

        // 원산지 필터 업데이트 액션
        updateSelectedOrigin(newOrigin) {
            this.selectedOrigin = newOrigin;
        },

        // 필터 초기화 액션
        resetFilters() {
            this.searchQuery = '';
            this.selectedSubtype = '';
            this.selectedOrigin = '';
        },
    },

    getters: {
        // 사용 가능한 서브타입 목록 반환
        availableSubtypes: (state) => {
            const subtypes = new Set();
            state.products.forEach((product) => subtypes.add(product.subtype));
            return Array.from(subtypes);
        },

        // 사용 가능한 원산지 목록 반환
        availableOrigins: (state) => {
            const origins = new Set();
            state.products.forEach((product) => origins.add(product.origin));
            return Array.from(origins);
        },

        // 카테고리별로 필터링된 상품 목록 반환
        getProductsByCategory: (state) => (category) => {
            return state.products.filter((product) => product.type === category);
        },

        // 특정 상품 ID로 상품 찾기
        getProductById: (state) => (id) => {
            return state.products.find((product) => product.id === id);
        },
    },
});
