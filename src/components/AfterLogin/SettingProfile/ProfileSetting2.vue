<template>
    <div class="pageContainer">
        <div class="bannerDiv">
            <div class="bannerFlexDiv">
                <div style="color: gray">설정하기</div>
                <div style="color: gray">
                    <span style="background-color: #1860c3; padding: 4px; color: white; border-radius: 5px">2</span>/ 3
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
                <input class="searchInput" type="text" placeholder="알레르기원을 검색하세요" />
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
                <button @click="toggleComboBox" class="combo-button">
                    우유/계란
                    <span class="arrow">{{ isOpen ? '▲' : '▼' }}</span>
                </button>
                <div v-if="isOpen" class="checkbox-list">
                    <label v-for="(isChecked, item) in checkedItems" :key="item" class="checkbox-item">
                        <input type="checkbox" v-model="checkedItems[item]" class="hidden-checkbox" />
                        <span class="custom-checkbox">
                            <span v-if="isChecked" class="checkmark">✓</span>
                        </span>
                        {{ item }}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            isAllergy: 'n',
            value: [],
            isOpen: false,
            checkedItems: {
                '계란 흰자': false,
                '계란 노른자': false,
                우유: false,
                체다치즈: false,
                요거트: false,
                버터: false,
                'B-락토글로불린': false,
                카제인: false,
            },
        };
    },
    methods: {
        toggleAllergy() {
            this.isAllergy = this.isAllergy === 'y' ? 'n' : 'y';
        },
        toggleComboBox() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>

<style scoped>
.pageContainer {
    flex-grow: 1;
    overflow-y: auto;
    height: 92%; /* 스크롤바 숨기기 */
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
/* combobox */
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
    border-top: none;
    border-radius: 0 0 4px 4px;
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
