import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = 'http://localhost:8081';

export const usePostStore = defineStore('storeId',{
	state: () => ({
		contents: [],
	}),
    // 함수 정의하는 곳
	actions: {
		async fetchContents(){
			try{
				const res = await axios.get(baseUrl); // 요청한 데이터를
				this.contents = res.data;             // 생성한 state에 대입
				// res에 담겨오는 데이터 항목들을 보고 자유롭게 사용할 수 있다.
				// ex)
				// if(res.status === 200){
				//    alert('Success Message');
        		// }
			} catch (err) {
				console.error('Fetch ERROR!', err);
			}
		}
	},
});