import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './loginStore';

const baseUrl = 'http://localhost:8081/api/receipt';

export const usePostReceiptToOCR = defineStore('receiptOCR', {
    state: () => ({
        contents: [],
    }),
    actions: {
        async createContents(payload) {
            const authStore = useAuthStore();
            console.log('token: ', authStore.token);
            try {
                const { data } = await axios.post(`${baseUrl}/detect-text`, payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${authStore.token}`
                    },
                    withCredentials: true
                });
                console.log(data);
                this.contents.push(data);
                return data;
            } catch (err) {
                console.error('Post ERROR!', err);
                if (err.response && err.response.status === 403) {
                    console.error('Authentication error. Please login again.');
                    console.log('token: ', authStore.token);
                    // authStore.logout();
                    // window.location.href = '/login';
                }
                throw err;
            }
        }
    },
});