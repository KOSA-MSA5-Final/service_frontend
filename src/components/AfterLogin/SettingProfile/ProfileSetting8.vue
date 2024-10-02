<template>
    <div style="height: inherit">
        <TopBar2 />

        <div style="display: flex; justify-content: center">
            <VueSlider
                v-model="value8"
                :min="0"
                :max="8"
                marks
                adsorb
                style="position: absolute !important; top: 10%; width: 80%"
            />
        </div>

        <!-- 컨텐츠 시작 -->
        <div
            style="
                font-size: 1.5em;
                position: absolute;
                top: 17%;
                width: -webkit-fill-available;
                left: 0%;
                display: flex;
                flex-direction: column;
                align-items: center;
            "
        >
            <div style="line-height: 1; margin-bottom: 0.1em">장구니가 어떤 {{ currentDisease }}</div>
            <div style="line-height: 1">질환을 가지고 있나요?</div>
        </div>
        <div
            style="
                font-size: 1em;
                color: gray;
                position: absolute;
                top: 24%;
                width: -webkit-fill-available;
                left: 0%;
                display: flex;
                flex-direction: column;
                align-items: center;
            "
        >
            질병에 맞는 정보가 제공돼요
        </div>

        <div
            style="
                position: absolute;
                top: 27%;
                width: -webkit-fill-available;
                left: 0%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            "
        >
            <!-- 선택된 질병 표시 -->
            <div v-if="isDisease.length" style="width: 80%">
                <!-- check한 결과 -->
                <div style="display: flex; height: 2em; align-items: center; text-align: center">
                    <ul
                        style="
                            display: flex;
                            align-items: center;
                            margin-bottom: 0 !important;
                            margin-left: 0 !important;
                            overflow-x: auto; /* 가로 스크롤 추가 */
                            max-width: 450px; /* 스크롤이 생기는 최대 너비 설정 */
                            white-space: nowrap; /* 항목들이 한 줄로 유지되게 설정 */
                        "
                    >
                        <li>선택된 항목:</li>
                        <li
                            style="
                                display: flex;
                                flex-direction: row;
                                justify-content: flex-start;
                                height: 2em;
                                text-align: center;
                                line-height: 2em;
                                margin-left: 5px;
                                padding-bottom: 10px !important;
                            "
                            v-for="(item, index) in selectedItems"
                            :key="index"
                        >
                            {{ item }},
                        </li>
                    </ul>
                </div>
                <div class="disease-selected">
                    <div v-if="currentDisease === 'skin'">
                        <div
                            class="neutered"
                            :class="{ 'active-border': skinDisease === 'n' }"
                            @click="clearSkinDiseases"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-x-circle-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
                                />
                            </svg>
                            건강해요
                        </div>

                        <!-- 서치 시작 -->
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
                            <input
                                class="searchInput"
                                type="text"
                                v-model="skinSearchTerm"
                                placeholder="검색어를 입력하세요"
                            />
                        </div>
                        <ul class="scrollable-list">
                            <li
                                :class="{ 'active-li': selectedSkinItems.includes(item) }"
                                v-for="(item, index) in filteredskinfilteredList"
                                :key="index"
                                class="checkbox-item"
                            >
                                <input
                                    type="checkbox"
                                    :id="`checkbox-${index}`"
                                    :value="item"
                                    v-model="selectedSkinItems"
                                />
                                <label :for="`checkbox-${index}`">{{ item }}</label>
                            </li>
                            <li>
                                기타) 질환을 입력해주세요
                                <button style="border: none" @click="addInput">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-plus-circle"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path
                                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                                        />
                                    </svg>
                                </button>
                            </li>
                            <!-- + 버튼을 누르면 새로운 input 추가 -->

                            <li v-for="(input, index) in skininputs" :key="index">
                                <!-- - 버튼을 누르면 해당 인덱스의 input을 제거 -->
                                <button style="border: none" @click="removeInput(index)">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-dash-circle"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                    </svg>
                                </button>

                                <!-- input 필드 -->
                                <input type="text" v-model="skininputs[index]" />
                            </li>
                        </ul>
                        <!-- 서치끝 -->
                    </div>
                    <!-- 눈(eye) 시작 -->
                    <div v-if="currentDisease === 'eye'">
                        <div
                            class="neutered"
                            :class="{ 'active-border': eyeDisease === 'n' }"
                            @click="clearEyeDiseases"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-x-circle-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
                                />
                            </svg>
                            건강해요
                        </div>
                        <!-- 서치 시작 -->
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
                            <input
                                class="searchInput"
                                type="text"
                                v-model="eyeSearchTerm"
                                placeholder="검색어를 입력하세요"
                            />
                        </div>
                        <ul class="scrollable-list">
                            <li
                                :class="{ 'active-li': selectedEyeItems.includes(item) }"
                                v-for="(item, index) in filteredEyefilteredList"
                                :key="index"
                                class="checkbox-item"
                            >
                                <input
                                    type="checkbox"
                                    :id="`checkbox-${index}`"
                                    :value="item"
                                    v-model="selectedEyeItems"
                                />
                                <label :for="`checkbox-${index}`">{{ item }}</label>
                            </li>
                            <li>
                                기타) 질환을 입력해주세요
                                <button style="border: none" @click="addInput">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-plus-circle"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path
                                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                                        />
                                    </svg>
                                </button>
                            </li>
                            <!-- + 버튼을 누르면 새로운 input 추가 -->

                            <li v-for="(input, index) in eyeinputs" :key="index">
                                <!-- - 버튼을 누르면 해당 인덱스의 input을 제거 -->
                                <button style="border: none" @click="removeInput(index)">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-dash-circle"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                    </svg>
                                </button>

                                <!-- input 필드 -->
                                <input type="text" v-model="eyeinputs[index]" />
                            </li>
                        </ul>
                    </div>
                    <div v-if="currentDisease === 'stomach'">소화기계통</div>
                    <div v-if="currentDisease === 'muscle'">근골격계통</div>
                    <div v-if="currentDisease === 'nerve'">신경계통</div>
                    <div v-if="currentDisease === 'hormone'">호르몬계통</div>
                    <div v-if="currentDisease === 'heart'">순환계통(심장)</div>
                    <div v-if="currentDisease === 'mouth'">구강</div>
                    <div v-if="currentDisease === 'lung'">호흡기계통</div>
                    <div v-if="currentDisease === 'kidney'">비뇨생식계통</div>
                    <div v-if="currentDisease === 'tumor'">종양성 질환</div>
                </div>
            </div>
            <div v-else>선택된 질병이 없습니다.</div>
            <!-- 컨텐츠 끝 -->
        </div>

        <!-- 이전/다음 버튼 -->
        <div class="button-container">
            <div
                style="
                    display: flex;
                    flex-direction: row;
                    position: absolute;
                    bottom: 0;
                    margin-bottom: 15px;
                    width: 75%;
                    align-items: center;
                "
            >
                <!-- 질환에서의 버튼 -->
                <button class="prevBtnDiv" v-if="currentIndex > 0" @click="prevDisease" :disabled="currentIndex === 0">
                    이전
                </button>
                <!-- 맨처음에서만 활성화되는 버튼 -->
                <button class="prevBtnDiv" v-else @click="goTosetProfile3">이전</button>
                <div style="flex: 0.1"></div>
                <button class="nextBtnDiv" @click="nextDisease" :disabled="currentIndex === isDisease.length - 1">
                    다음
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import TopBar2 from './TopBar2.vue';
import VueSlider from 'vue-3-slider-component';

export default {
    name: 'setProfilePage8',
    components: {
        TopBar2,
        VueSlider,
    },
    data() {
        return {
            value8: 8,
            isDisease: ['skin', 'eye', 'stomach', 'muscle', 'nerve'], // 예시 데이터
            currentIndex: 0,
            // 1
            eyeDisease: null,
            skinDisease: null,
            stomachDisease: null,
            // 2
            skinSearchTerm: '',
            eyeSearchTerm: '',
            stomachSearchTerm: '',
            // 3
            eyefilteredList: ['각막염', '눈2', '눈3'],
            skinfilteredList: [
                '곰팡이성 피부질환',
                '세균성 피부질환',
                '알레르기성 피부염',
                '외이염',
                '아토피',
                '기생충성 피부염',
                '중이염',
                '모낭충증',
                '제위위염',
            ],
            stomachfilteredList: ['장1', '장2', '장3'],
            // 4
            selectedEyeItems: [], // 선택된 항목을 저장하는 배열
            selectedSkinItems: [],
            selectedStomachItems: [],
            // 기타
            ischecked: 'n',
            //5
            skininputs: [''], //단순문자열을 배열로 관리
            eyeinputs: [''],
        };
    },
    computed: {
        currentDisease() {
            return this.isDisease[this.currentIndex];
        },
        filteredEyefilteredList() {
            // 검색어가 없으면 전체 리스트 반환
            if (!this.eyeSearchTerm) {
                return this.eyefilteredList;
            }
            const keyword = this.eyeSearchTerm.toLowerCase(); // 소문자로 변환
            // 검색어가 포함된 아이템만 반환
            return this.eyefilteredList.filter((item) => item.toLowerCase().includes(keyword));
        },
        filteredskinfilteredList() {
            if (!this.skinSearchTerm) {
                return this.skinfilteredList;
            }
            const keyword = this.skinSearchTerm.toLowerCase();
            return this.skinfilteredList.filter((item) => item.toLowerCase().includes(keyword));
        },
        selectedItems() {
            return [...this.selectedEyeItems, ...this.selectedSkinItems, ...this.selectedStomachItems];
        },
    },
    methods: {
        nextDisease() {
            if (this.currentIndex < this.isDisease.length - 1) {
                this.currentIndex++;
            }
        },
        prevDisease() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        },
        clearEyeDiseases() {
            this.selectedEyeItems = [];
            this.eyeDisease = 'y';
        },
        clearSkinDiseases() {
            this.selectedSkinItems = [];
            this.skinDisease = 'y';
        },
        //input 추가
        addInput() {
            this.inputs.push('');
        },
        // 특정 인덱스의 input 제거
        removeInput(index) {
            this.inputs.splice(index, 1);
        },
        goTosetProfile3() {
            this.$router.push('/setProfile7');
        },
    },
};
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.neutered {
    flex: 1;
    border: 1px solid black;
    padding: 5px;
    border-radius: 20px;
    text-align: center;
    align-content: center;
    color: gray;
    width: 50%;
}
.neutered:hover {
    background-color: #71a9db;
    color: white;
}
.active-border {
    border: 1px solid black;
    color: black;
}
/* 서치 */
.searchDiv {
    margin-top: 0.2em;
    display: flex;
    align-items: center;
    justify-items: center;
    border-radius: 40px;
    border: 1px solid lightgray;
    height: 40px;
    background-color: lightgray;
}
.searchInput {
    border-width: 0;
    height: 40px;
    width: 60%;
    outline: none;
    font-size: 1em;
    background-color: lightgray;
    text-align: center;
}
li {
    list-style: none;
}
.checkbox-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    border: 1px solid black;
    margin-bottom: 5px;
    border-radius: 10px;
}
/* 검색바 밑에 있는 list요소들 */
ul {
    padding: 0;
    margin: 0;
    list-style-type: none; /* 기본 불릿 포인트를 없애고 싶다면 이 줄을 추가하세요 */
    margin-top: 5px;
}
.scrollable-list {
    height: 300px; /* ul의 고정 높이 */
    overflow-y: auto; /* 리스트가 길어지면 수직 스크롤 생성 */
    list-style-type: none;
    border: 1px solid rgb(236, 236, 236);
    background-color: rgb(236, 236, 236);
}
.checkbox-item input {
    margin-right: 10px; /* 체크박스와 라벨 간격을 설정 */
}
.checkbox-item label {
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.active-li {
    background-color: #71a9db; /* 체크된 항목의 배경색 */
    color: white; /* 텍스트 색상 변경 */
}
.prevBtnDiv {
    flex: 1;
    background-color: #d9d9d9;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    padding: 10px;
    border: 1px solid black;
    font-size: 2.5em;
}
.nextBtnDiv {
    flex: 1.5;
    background-color: #1860c3;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    padding: 10px;
    border: 1px solid black;
    font-size: 2.5em;
}
.prevBtnDiv:hover {
    opacity: 80%;
}
.nextBtnDiv:hover {
    opacity: 80%;
}
</style>
