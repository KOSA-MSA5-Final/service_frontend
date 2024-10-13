<template>
    <div id="afterLoginMain">
        <!-- 상단 바 -->
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
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <title></title>
                        <path
                            d="M160,89.75H56l53-53a9.67,9.67,0,0,0,0-14,9.67,9.67,0,0,0-14,0l-56,56a30.18,30.18,0,0,0-8.5,18.5c0,1-.5,1.5-.5,2.5a6.34,6.34,0,0,0,.5,3,31.47,31.47,0,0,0,8.5,18.5l56,56a9.9,9.9,0,0,0,14-14l-52.5-53.5H160a10,10,0,0,0,0-20Z"
                        ></path>
                    </g>
                </svg>
            </button>

            <!-- 가운데에 '주문배송' 텍스트 -->
            <div class="search-title">주문배송</div>
        </div>

        <!-- 컨텐츠 영역 -->
        <div id="router-pages">
            <div class="pageContainer">
                <!-- 각각의 주문내역 -->
                <!-- 데이터 처리할 부분 : //이라는 표시를 해둠  -->
                <div class="itemContainer">
                    <div class="orderDate">주문일: <b>//2024.10.08 07:52:31//</b></div>
                    <div class="whiteContentDiv">
                        <!-- 누구한테 보내지는지 + 상세보기버튼 -->
                        <div class="itemTopBar">
                            <!-- 배송현황으로 바꿔도 무방 -->
                            <div class="itemTopBarDiv"><b>to.</b>//사람이름//</div>
                            <!-- 상세보기 버튼 -->
                            <div class="toggleBtn" @click="toggleDetails">
                                <button style="border: none; background-color: transparent; margin-right: 5px">
                                    <span v-if="showDetails">▲</span>
                                    <span v-else>▼</span>
                                </button>
                            </div>
                        </div>
                        <hr style="margin: 0px !important" />
                        <!-- 제품 요약 -->
                        <div class="titleNimgDiv">
                            <div style="display: flex">
                                <!-- 이미지div -->
                                <div class="imgDiv">
                                    <img
                                        src="https://picsum.photos/200"
                                        style="width: inherit; height: inherit; border-radius: 10px"
                                    />
                                </div>
                                <!-- 제품에 대한 설명 -->
                                <div class="titleDiv">
                                    <div class="brandName">//상품 브랜드이름//</div>
                                    <div class="itemName">//상품이름 //</div>
                                    <div class="itemPrice"><b>//31,900//</b>원</div>
                                    <div class="itemCount">수량 <span>//1//</span>개</div>
                                </div>
                            </div>
                        </div>
                        <!-- 주문번호 및 상세 -->
                        <div v-if="showDetails" class="titleNimgDiv" style="border-top: 1px solid lightgray">
                            <div
                                style="
                                    background-color: #f9f9f9;
                                    padding: 10px;
                                    display: flex;
                                    flex-direction: column;
                                    align-content: center;
                                "
                            >
                                <span style="font-size: 14px; padding: 10px">주문번호 &nbsp;&nbsp; 2638852300</span>
                                <div style="border: 1px solid lightgray"></div>
                                <div style="font-size: 14px; padding: 10px">배송완료</div>
                                <div style="border: 1px solid lightgray"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- bottom bar -->
        <ButtomBar />
    </div>
</template>

<script>
import ButtomBar from '../Layouts/ButtomBar.vue';

export default {
    components: {
        ButtomBar,
    },
    data() {
        return {
            showDetails: false, // 세부 정보 표시 여부
        };
    },
    methods: {
        goBack() {
            window.history.back(); // 이전 페이지로 이동
        },
        toggleDetails() {
            this.showDetails = !this.showDetails;
        },
    },
};
</script>

<style scoped>
#afterLoginMain {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh; /* 전체 화면을 차지 */
}
#router-pages {
    background-color: #cee2f5;
    flex-grow: 1;
    overflow-y: auto;
    height: -webkit-fill-available;
    /* 스크롤바 숨기기 */
    scrollbar-width: none;
}
.pageContainer {
    flex-grow: 1;
    overflow-y: auto;
    height: 90%; /* 스크롤바 숨기기 */
    scrollbar-width: none;
}
.whiteContentDiv {
    display: flex;
    flex-direction: column;
    background-color: white;
    text-align: left;
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 6px 0 rgba(34, 36, 38, 0.04);
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
.search-title {
    font-size: 20px;
}
.orderDate {
    margin-top: 20px;
    text-align: left;
    padding-left: 20px;
    padding-bottom: 5px;
    font-size: 15px;
}
.itemTopBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.itemTopBarDiv {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 15px;
}
.itemDetailBtn {
    color: gray;
    font-size: 15px;
}
.titleNimgDiv {
    padding: 20px;
}
.imgDiv {
    width: 100px;
    height: 100px;
    background-color: gray;
    border-radius: 10px;
}
.titleDiv {
    display: flex;
    flex-direction: column;
    padding: 0 15px;
}
.brandName {
    color: lightgray;
    font-size: 12px;
    flex: 1;
}
.itemName {
    font-size: 18px;
    flex: 2;
}
.itemPrice {
    flex: 1;
}
.itemCount {
    color: lightgray;
    font-size: 12px;
    flex: 1;
}
</style>
