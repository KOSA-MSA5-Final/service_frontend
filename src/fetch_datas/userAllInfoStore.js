// fetch_userAllInfo.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserAllInfoStore = defineStore('userAllInfo', {
    state: () => ({
        userInfo: null, // Member 정보와 Profile 목록을 포함한 전체 데이터
        loading: false,
        error: null,
    }),

    actions: {
        async fetchUserAllInfo() {
            this.loading = true;
            this.error = null;

            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get('https://localhost:8081/auth/userinfo-all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.userInfo = response.data;

                console.log(this.userInfo);
                return this.userInfo;
            } catch (error) {
                this.error = error.message;
                this.userInfo = null;
                console.error('Failed to fetch user info in store:', error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // 스토어 초기화 (로그아웃 시 사용)
        clearStore() {
            this.userInfo = null;
            this.loading = false;
            this.error = null;
        },
    },

    getters: {
        // 사용자 기본 정보 getter
        getMemberInfo: (state) => state.userInfo?.member || null,

        // 사용자의 모든 프로필 목록 getter
        getAllProfiles: (state) => state.userInfo?.profiles || [],

        // 프로필 존재 여부 확인
        hasProfiles: (state) => state.userInfo?.profiles?.length > 0,

        // 로딩 상태 확인
        isLoading: (state) => state.loading,

        // 에러 상태 확인
        getError: (state) => state.error,

        // 특정 프로필 ID로 프로필 찾기
        getProfileById: (state) => (profileId) => {
            return state.userInfo?.profiles?.find((profile) => profile.id === profileId) || null;
        },
    },
});
