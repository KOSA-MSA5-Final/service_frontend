<template>
    <div style="height: inherit">
        <TopBar />

        <div style="display: flex; justify-content: center">
            <VueSlider
                v-model="value6"
                :min="0"
                :max="8"
                marks
                adsorb
                style="position: absolute !important; top: 10%; width: 80%"
            />
        </div>

        <!-- 컨텐츠 -->
        <div style="display: flex; justify-content: center">
            <div style="position: absolute; top: 20%; width: -webkit-fill-available">
                <div style="font-size: 1.5em">장구니에게</div>
                <div style="font-size: 1.5em">알레르기가 있나요?</div>
                <div style="font-size: 1em; margin-bottom: 10px; color: gray">맞춤형 제품이 제공돼요</div>
            </div>
            <!-- 있어요 없어요 버튼 -->
            <div
                style="
                    position: absolute;
                    top: 34%;
                    width: 80%;
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: row;
                "
            >
                <div class="isAllergy" :class="{ 'active-border': isAllergy === 'y' }" @click="isAllergy = 'y'">
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
                    있어요
                </div>
                <div style="flex: 0.1"></div>
                <div class="isAllergy" :class="{ 'active-border': isAllergy === 'n' }" @click="isAllergy = 'n'">
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
                    없어요
                </div>
            </div>
        </div>
        <!-- 있어요를 누를시 보이는 컨텐츠 -->
        <div v-if="isAllergy === 'y'" style="display: flex; justify-content: center">
            <div class="searchDiv">
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
                <input class="searchInput" type="text" style="width: 80%; text-align: center" />
            </div>

            <!-- 드롭다운 -->
            <multiselect
                v-model="value"
                tag-placeholder="Add this as new tag"
                placeholder="과일"
                label="name"
                track-by="code"
                :close-on-select="false"
                :options="options"
                :multiple="true"
                :taggable="true"
                @tag="addTag"
                style="position: absolute; top: 49%; width: 80%"
            >
            </multiselect>
        </div>
        <!-- 컨텐츠 끝 -->
    </div>

    <div class="button-container">
        <PrevNextButton />
    </div>
</template>

<script>
import PrevNextButton from './PrevNextButton.vue';
import TopBar from './TopBar.vue';
import VueSlider from 'vue-3-slider-component';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css'; // CSS를 여기서 import

export default {
    components: {
        TopBar,
        PrevNextButton,
        VueSlider,
        Multiselect,
    },
    data() {
        return {
            value6: 6,
            isAllergy: 'n',
            value: [],
            options: [
                { name: '귤 혼합물(레몬, 라임, 오렌지)', code: 'vu' },
                { name: '키위(참다래)', code: 'js' },
                { name: '사과', code: 'os' },
            ],
        };
    },
    methods: {
        addTag(newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
            };
            this.options.push(tag);
            this.value.push(tag);
        },
    },
};
</script>

<style scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.isAllergy {
    flex: 1;
    border: 1px solid black;
    padding: 10px;
    border-radius: 20px;
    text-align: center;
    align-content: center;
    color: gray;
}
.isAllergy:hover {
    background-color: #71a9db;
    color: white;
}
.active-border {
    border: 2px solid #1860c3;
    color: black;
}

/* 서치 */
.searchDiv {
    position: absolute;
    top: 39%;
    width: 80%;
    align-items: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
}
.searchInput {
    border-width: 0;
    height: 40px;
    width: 40%;
    outline: none;
    font-size: 1.5em;
    background-color: lightgray;
}
/* 드롭다운 */
</style>
