<template>
    <div class="pageContainer">
        <div class="bannerDiv">
            <div class="bannerFlexDiv">
                <div style="color: gray">설정하기</div>
                <div style="color: gray">
                    <span style="background-color: #1860c3; padding: 4px; color: white; border-radius: 5px">3</span>/ 4
                </div>
            </div>
            평소 반려동물의 <br />
            어떤 부위를 <br />
            신경써주는 편이신가요?
            <img class="petwoman" :src="require('@/assets/doctor.png')" alt="" />
        </div>
        <div class="whiteContentDiv">
            <div style="align-content: center; text-align: center">
                평소 신경쓰는 반려동물의 부위가 있나요?<br />
                (중복선택 가능)
            </div>
            <div class="icon-grid">
                <div
                    class="icon-item"
                    :class="{ 'active-border': isDisease.includes('skin') }"
                    @click="toggleDisease('skin')"
                >
                    <img src="@/assets/skin.png" alt="피부계통" />
                    <p>피부(귀)</p>
                    <img
                        v-if="isDisease.includes('skin')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>
                <div
                    class="icon-item"
                    :class="{ 'active-border': isDisease.includes('eye') }"
                    @click="toggleDisease('eye')"
                >
                    <img src="@/assets/eye.png" alt="눈" />
                    <p>눈</p>
                    <img
                        v-if="isDisease.includes('eye')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>
                <div
                    class="icon-item"
                    :class="{ 'active-border': isDisease.includes('stomach') }"
                    @click="toggleDisease('stomach')"
                >
                    <img src="@/assets/stomach.png" alt="소화기" />
                    <p>소화기</p>
                    <img
                        v-if="isDisease.includes('stomach')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>
                <div
                    class="icon-item"
                    :class="{ 'active-border': isDisease.includes('muscle') }"
                    @click="toggleDisease('muscle')"
                >
                    <img src="@/assets/muscle.png" alt="근골격" />
                    <p>근골격</p>
                    <img
                        v-if="isDisease.includes('muscle')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>
                <div
                    class="icon-item"
                    :class="{ 'active-border': isDisease.includes('nerve') }"
                    @click="toggleDisease('nerve')"
                >
                    <img src="@/assets/nerve.png" alt="신경" />
                    <p>신경</p>
                    <img
                        v-if="isDisease.includes('nerve')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>
                <div
                    class="icon-item"
                    :class="{ 'active-border': isDisease.includes('obesity') }"
                    @click="toggleDisease('obesity')"
                >
                    <img width="50" height="50" src="https://img.icons8.com/ios/50/fat-dog.png" alt="fat-dog" />
                    <p>대사(비만)</p>
                    <img
                        v-if="isDisease.includes('obesity')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>

                <div
                    class="icon-item"
                    :class="{ 'active-border': isDisease.includes('heart') }"
                    @click="toggleDisease('heart')"
                >
                    <img src="@/assets/heart.png" alt="심장" />
                    <p>심장</p>
                    <img
                        v-if="isDisease.includes('heart')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>
                <div
                    class="icon-item"
                    :class="{ 'active-border': isDisease.includes('mouth') }"
                    @click="toggleDisease('mouth')"
                >
                    <img src="@/assets/mouth.png" alt="구강" />
                    <p>구강</p>
                    <img
                        v-if="isDisease.includes('mouth')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>
                <div
                    class="icon-item"
                    :class="{ 'active-border': isDisease.includes('lung') }"
                    @click="toggleDisease('lung')"
                >
                    <img src="@/assets/lung.png" alt="호흡기" />
                    <p>호흡기</p>
                    <img
                        v-if="isDisease.includes('lung')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>
                <div v-if="!showAdditionalIcons" class="icon-item" @click="toggleView">
                    <img src="@/assets/plus.png" alt="전체보기" />
                    <p>전체보기</p>
                </div>

                <div
                    v-else
                    class="icon-item"
                    :class="{ 'active-border': isDisease.includes('kidney') }"
                    @click="toggleDisease('kidney')"
                >
                    <img src="@/assets/kidney.png" alt="비뇨생식" />
                    <p>비뇨생식</p>
                    <img
                        v-if="isDisease.includes('kidney')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>
                <div
                    class="icon-item"
                    v-if="showAdditionalIcons"
                    :class="{ 'active-border': isDisease.includes('tumor') }"
                    @click="toggleDisease('tumor')"
                >
                    <img
                        width="50"
                        height="50"
                        src="https://img.icons8.com/external-ddara-lineal-ddara/64/external-tumor-cell-medical-marijuana-medicine-cannabis-indica-medical-marijuana-ddara-lineal-ddara.png"
                        alt="external-tumor-cell-medical-marijuana-medicine-cannabis-indica-medical-marijuana-ddara-lineal-ddara"
                    />
                    <p>종양</p>
                    <img
                        v-if="isDisease.includes('tumor')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>
                <div
                    class="icon-item"
                    v-if="showAdditionalIcons"
                    :class="{ 'active-border': isDisease.includes('hormone') }"
                    @click="toggleDisease('hormone')"
                >
                    <img
                        width="50"
                        height="50"
                        src="https://img.icons8.com/external-victoruler-outline-victoruler/64/external-thyroid-gland-internal-human-organs-victoruler-outline-victoruler.png"
                        alt="external-thyroid-gland-internal-human-organs-victoruler-outline-victoruler"
                    />
                    <p>호르몬</p>
                    <img
                        v-if="isDisease.includes('hormone')"
                        class="check-icon"
                        src="https://img.icons8.com/emoji/48/check-mark-emoji.png"
                        alt="check-mark"
                    />
                </div>
                <div class="icon-item hidden" v-if="showAdditionalIcons"></div>
                <div class="icon-item hidden" v-if="showAdditionalIcons"></div>
                <div class="icon-item hidden" v-if="showAdditionalIcons"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showAdditionalIcons: false,
            isDisease: [], // 배열로 변경
        };
    },
    methods: {
        toggleView() {
            this.showAdditionalIcons = !this.showAdditionalIcons;
        },
        toggleDisease(disease) {
            const index = this.isDisease.indexOf(disease);
            if (index > -1) {
                // 이미 선택된 경우 배열에서 제거
                this.isDisease.splice(index, 1);
            } else {
                // 선택되지 않은 경우 배열에 추가
                this.isDisease.push(disease);
            }
        },
        handleClick() {
            if (this.showAdditionalIcons) {
                this.toggleDisease('kidney'); // 비뇨생식 클릭 시 실행
            } else {
                this.toggleView(); // 전체보기 클릭 시 실행
            }
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
    height: 140px;
    position: absolute; /* 부모 요소 내에서 위치를 조정 */
    right: 45px; /* 오른쪽으로 이동 */
    bottom: 20px; /* 하단 여백 설정 */
}
.whiteContentDiv {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background-color: white;
    padding: 20px;
    text-align: left;
}
.diseaseBox {
    flex: 0 1 18%;
    border: 1px solid black;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: rgb(239, 239, 239);
}
.hidden {
    visibility: hidden;
}
.icon-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
}

.icon-item {
    position: relative; /* 자식 요소인 check-icon의 위치를 설정하기 위해 relative 사용 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    margin: 10px 0;
}

.icon-item img {
    width: 50px;
    height: 50px;
}

.icon-item p {
    margin-top: 8px;
    font-size: 14px;
    text-align: center;
}
/* .icon-item.active-border {
    border-color: red; 
} */
.check-icon {
    position: absolute;
    top: -5px;
    right: -5px;
}
</style>
