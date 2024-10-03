<template>
    <div class="pageContainer">
        <div class="bannerDiv">
            <div class="bannerFlexDiv">
                <div style="color: gray">설정하기</div>
                <div style="color: gray">
                    <span style="background-color: #1860c3; padding: 4px; color: white; border-radius: 5px">2</span>/ 4
                </div>
            </div>
            평소 반려동물에게 <br />
            가려야할 음식이 있나요?
            <img class="petwoman" :src="require('@/assets/food.png')" alt="" />
        </div>

        <div class="whiteContentDiv">
            <div>
                <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/fluency-systems-filled/50/dog-footprint.png"
                    alt="dog-footprint"
                />
                반려동물에게 알레르기가 있나요?
            </div>
            <div class="searchDiv">
                <div style="margin-left: 20px; margin-right: 20px">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-search"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                        />
                    </svg>
                </div>
                <input class="searchInput" type="text" v-model="searchKeyword" placeholder="알레르기원을 검색하세요" />
            </div>
            <!-- 알레르기가 없어요 -->
            <div class="allergyDiv" @click="toggleAllergy" style="display: flex">
                <div v-if="isAllergy === 'y'">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                        />
                    </svg>
                    <span>&nbsp;알레르기가 없어요</span>
                </div>
                <div v-else style="color: lightgray">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-check-circle"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path
                            d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"
                        />
                    </svg>
                    <span>&nbsp;알레르기가 없어요</span>
                </div>
            </div>
            <!-- 드롭다운 -->
            <div class="combo-box">
                <div class="checkbox-list">
                    <label v-for="(allergy, index) in filteredAllergies" :key="index" class="checkbox-item">
                        <input
                            type="checkbox"
                            v-model="checkedItems[allergy.name]"
                            class="hidden-checkbox"
                            @change="checkboxChanged(allergy)"
                        />
                        <span class="custom-checkbox">
                            <span v-if="checkedItems[allergy.name]" class="checkmark">✓</span>
                        </span>
                        {{ allergy.name }} ({{ allergy.type }})
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    components: {},
    mounted() {
        this.getAllergies(); // 페이지가 로드될 때 알레르기 목록을 가져옵니다.
    },
    data() {
        return {
            isAllergy: 'n',
            value: [],
            isOpen: false,
            checkedItems: {}, // 알레르기 항목들이 동적으로 추가될 예정
            allergies: [], // 알레르기 목록을 저장할 배열
            searchKeyword: '', // 사용자가 입력한 검색어
        };
    },
    computed: {
        filteredAllergies() {
            // 검색어를 기준으로 알레르기 목록을 필터링합니다.
            if (!this.searchKeyword) {
                return this.allergies;
            }
            return this.allergies.filter((allergy) =>
                allergy.name.toLowerCase().includes(this.searchKeyword.toLowerCase()),
            );
        },
    },
    methods: {
        toggleAllergy() {
            this.isAllergy = this.isAllergy === 'y' ? 'n' : 'y';

            if (this.isAllergy === 'y') {
                // 알레르기 체크박스들을 모두 해제
                Object.keys(this.checkedItems).forEach((key) => {
                    this.checkedItems[key] = false;
                });
            }
        },
        toggleComboBox() {
            this.isOpen = !this.isOpen;
        },
        async getAllergies() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://localhost:8081/api/profile/allergies', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
                    },
                });
                this.allergies = response.data;
                this.initializeCheckedItems(); //checkedItems 초기화
            } catch (error) {
                console.error('알러지 정보를 가져오는데 실패함', error);
            }
        },
        // checkedItems 객체를 알레르기 목록으로 초기화
        initializeCheckedItems() {
            this.allergies.forEach((allergy) => {
                this.checkedItems[allergy.name] = false; // 모든 알레르기 항목을 false로 초기화
            });
        },
        checkboxChanged(allergy) {
            // 체크박스가 클릭되었을 때 "알레르기가 없어요"의 상태를 lightgray로 바꾸기
            if (this.checkedItems[allergy.name]) {
                this.isAllergy = 'n'; // 체크박스를 누르면 알레르기가 없어요 상태를 false로 변경
            }
        },
    },
};
</script>

<style scoped>
.pageContainer {
    flex-grow: 1;
    overflow-y: auto;
    height: 100%; /* 스크롤바 숨기기 */
    scrollbar-width: none;
}
.bannerDiv {
    height: 220px;
    background-color: #79bbf4;
    text-align: left;
    padding: 20px 20px;
    position: relative; /* 이미지의 위치를 조정하기 위해 추가 */
}
.bannerFlexDiv {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 12px;
    align-items: center;
}
.petwoman {
    display: block;
    width: 120px;
    height: 120px;
    position: absolute; /* 부모 요소 내에서 위치를 조정 */
    right: 30px; /* 오른쪽으로 이동 */
    bottom: 30px; /* 하단 여백 설정 */
}
.whiteContentDiv {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background-color: white;
    padding: 20px;
    text-align: left;
}
/* 서치 */
.searchDiv {
    display: flex;
    align-items: center;
    justify-items: center;
    border-radius: 40px;
    border: 1px solid #79bbf4;
    height: 40px;
    background-color: #89c6fc;
    margin-top: 10px;
}
.searchInput {
    border-width: 0;
    height: 30px;
    width: 80%;
    outline: none;
    font-size: 15px;
    background-color: #89c6fc;
}
.searchInput::placeholder {
    color: white;
}
.checked {
    background-color: black;
    color: white;
}
/* 알러지 */
.allergyDiv {
    margin-top: 10px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 10px;
    width: 50%;
    justify-content: space-around;
}
/* 콤보박스 */
.combo-box {
    font-family: Arial, sans-serif;
    margin-top: 10px;
    width: 100%;
    text-align: center;
}
.combo-button {
    width: 100%;
    padding: 6px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.arrow {
    font-size: 12px;
}
.checkbox-list {
    border: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
    height: 380px;
    overflow-y: auto;
}
.checkbox-item {
    display: flex;
    align-items: center;
    padding: 8px;
    cursor: pointer;
}
.checkbox-item:hover {
    background-color: #f0f0f0;
}
.hidden-checkbox {
    display: none;
}
.custom-checkbox {
    width: 18px;
    height: 18px;
    border: 1px solid #999;
    border-radius: 3px;
    margin-right: 8px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.checkmark {
    color: black;
    font-size: 14px;
}
</style>
