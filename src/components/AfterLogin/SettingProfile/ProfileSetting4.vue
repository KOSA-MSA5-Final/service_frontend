<template>
    <div class="pageContainer">
        <div class="bannerDiv">
            <div class="bannerFlexDiv">
                <div style="color: gray">설정하기</div>
                <div style="color: gray">
                    <span style="background-color: #1860c3; padding: 4px; color: white; border-radius: 5px">4</span>/ 4
                </div>
            </div>
            평소 반려동물의 <br />
            상태는 어떤가요?
            <img class="petwoman" :src="require('@/assets/medicine.png')" alt="" />
        </div>

        <div class="whiteContentDiv">
            <!-- <h2>선택된 질병 목록:</h2>
            <ul>
                <li v-for="disease in diseases" :key="disease">{{ disease }}</li>
            </ul> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            diseases: [],
        };
    },
    methods: {},
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
    right: 50px; /* 오른쪽으로 이동 */
    bottom: 30px; /* 하단 여백 설정 */
}
.whiteContentDiv {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background-color: white;
    padding: 20px 0px;
    text-align: left;
}
</style>
