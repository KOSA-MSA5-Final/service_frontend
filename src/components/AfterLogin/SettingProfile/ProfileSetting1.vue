<template>
    <div class="pageContainer">
        <div class="cardBoard">
            <img
                width="15"
                height="15"
                src="https://img.icons8.com/fluency-systems-filled/50/dog-footprint.png"
                alt="dog-footprint"
            />
            반려동물의 이름을 알려주세요
            <input class="nameInput" type="text" placeholder="이름을 입력해주세요" />
        </div>
        <div
            class="cardBoard"
            style="display: flex; justify-content: space-between; align-items: center; padding: 20px 20px"
        >
            //장구니//의 성별은?
            <div style="display: flex">
                <div class="button-container">
                    <div class="button left">남자</div>
                    <div class="button right">여자</div>
                </div>
            </div>
        </div>
        <div class="cardBoard">
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
                <input class="searchInput" type="text" placeholder="반려동물의 종류는 무엇인가요?" />
            </div>
        </div>
    </div>
    <NextButton />
</template>

<script>
import NextButton from './NextButton.vue';

export default {
    name: 'setProfilePage1',
    components: {
        NextButton,
    },
    data() {
        return {
            value1: 1,
        };
    },
    methods: {
        goToBeforeLogin() {
            this.$router.push('/');
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
.cardBoard {
    font-size: 15px;
    padding: 20px;
    border: 1px solid lightgray;
    margin: 10px;
    border-radius: 10px;
    background-color: white;
}
.nameInput {
    border-radius: 10px;
    border: 1px solid #71a9db;
    margin-top: 5px;
    text-align: center;
}
.nameInput::placeholder {
    color: #eaeaea;
}
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.button {
    padding: 10px 20px;
    border: 1px solid #95c1e7;
    background-color: #79bbf4;
    color: white;
    text-align: center;
    cursor: pointer;
}

.left {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.right {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-left: none; /* 가운데에 경계선을 없애기 위해 사용 */
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
</style>
