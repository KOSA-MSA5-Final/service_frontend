<template>
    <div style="height: inherit">
        <TopBar />

        <div style="display: flex; justify-content: center">
            <VueSlider
                v-model="value2"
                :min="0"
                :max="8"
                marks
                adsorb
                style="position: absolute !important; top: 10%; width: 80%"
            />
        </div>
        <!-- 글 -->
        <div style="margin-top: 40px; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 2em">반려견의 종류를</div>
            <div style="font-size: 2em">선택해주세요</div>
            <div style="font-size: 1em; margin-bottom: 10px">반려동물별 맞춤서비스를 제공해드려요</div>

            <!-- 컨텐츠 시작 -->
            <div
                style="
                    position: absolute;
                    top: 20%;
                    width: -webkit-fill-available;
                    left: 0%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                "
            >
                <div style="font-size: 2em">반려견의 종류를</div>
                <div style="font-size: 2em">선택해주세요</div>
                <div style="font-size: 1em; margin-bottom: 10px">반려동물별 맞춤서비스를 제공해드려요</div>

                <!-- tab구현 -->p
                <!-- tab title  -->
                <div style="display: flex; width: 80%; align-content: center">
                    <div class="menuTab" :class="{ active: activeTab === 'dog' }" @click="setActiveTab('dog')">
                        <img width="50" height="50" src="https://img.icons8.com/keek/100/dog.png" alt="dog" />
                        강아지
                    </div>
                    <div class="menuTab" :class="{ active: activeTab === 'cat' }" @click="setActiveTab('cat')">
                        <img width="50" height="50" src="https://img.icons8.com/keek/100/cat.png" alt="cat" />
                        고양이
                    </div>
                </div>
                <!-- tab contents -->
                <div class="content">
                    <div v-if="activeTab === 'dog'" style="width: 90%">
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
                            <input class="searchInput" type="text" />
                        </div>
                        <div>기타/ 가정용 반려강아지 /믹스</div>
                    </div>
                    <div v-if="activeTab === 'cat'" style="width: 90%"></div>
                </div>
            </div>
        </div>
        <!-- 아래 버튼들: PrevNextButton.vue -->
        <PrevNextButtonVue />
    </div>
</template>

<script>
import TopBar from './TopBar.vue';
import PrevNextButtonVue from './PrevNextButton.vue';
import VueSlider from 'vue-3-slider-component';

export default {
    name: 'setProfilePage2',
    components: {
        TopBar,
        PrevNextButtonVue,
        VueSlider,
    },
    data() {
        return {
            value2: 2,
            activeTab: 'dog', // 기본 탭 설정
        };
    },
    methods: {
        goToSetting1() {
            this.$router.push('/setProfile1');
        },
        setActiveTab(tab) {
            this.activeTab = tab; // 클릭한 탭으로 activeTab 변경
        },
    },
};
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

html,
body {
    height: 100%;
}
.container {
    height: 100%;
}
/* 탭 */
.menuTab {
    border: 1px solid black;
    width: 50%;
    border-radius: 20px 20px 0px 0px;
    text-align: center; /* 중앙 정렬 */
    cursor: pointer; /* 마우스 커서 포인터로 변경 */
}
.menuTab.active {
    background-color: #71a9db;
    color: white;
}
.content {
    border: 1px solid black;
    align-items: center;
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

/* 서치 */
.searchDiv {
    margin-top: 1em;
    display: flex;
    align-items: center;
    justify-items: center;
    border-radius: 40px;
    border: 1px solid lightgray;
    height: 50px;
    background-color: lightgray;
}
.searchInput {
    border-width: 0;
    height: 40px;
    width: 40%;
    outline: none;
    font-size: 1.5em;
    background-color: lightgray;
}

/* 아래 버튼들 */

.bottomBtn1 {
    position: absolute;
    margin-bottom: 20px;
    bottom: 2.5em;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    background-color: #1860c3;
    color: white;
    text-align: center;
    padding: 10px;
    border-radius: 20px;
    font-size: 2.5em;
}
.bottomBtn2 {
    position: absolute;
    margin-bottom: 20px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    background-color: #1860c3;
    color: white;
    text-align: center;
    padding: 10px;
    border-radius: 20px;
    font-size: 2.5em;
}
.menuTab:hover {
    opacity: 80%;
}
</style>
