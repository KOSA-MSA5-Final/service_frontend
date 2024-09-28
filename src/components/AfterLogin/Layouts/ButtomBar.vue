<template>
    <div id="buttomBar">
        <div id="left-button">
            <img src="@/assets/icon-home.svg" @click="goToMain"/>
            <p>메인화면</p>
        </div>

        <div id="center-button" @click="goToProfile">
            <img src="https://elliebucket1.s3.ap-northeast-2.amazonaws.com/%ED%86%A0%EB%81%BC%EA%B6%81%EB%94%94.jpg"/>
            <p>반려동물 추가</p>
        </div>

        <div id="right-button">
            <img src="@/assets/icon-my-page.svg" @click="goToSettings"/>
            <p>환경설정</p>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'ButtomBar',
    setup() {
        const router = useRouter(); // Use the Vue Router

        const goToProfile = () => {
            router.push('/main/profile'); // Navigate to the profile page
        };

        const goToMain = () => {
            router.push('/main');
        }

        const goToSettings = () => {
            router.push('/main/settings');
        }

        return {
            goToProfile,
            goToMain,
            goToSettings,
        };
    }
};
</script>

<style scoped>
#buttomBar {
    display: flex;
    justify-content: space-between; /* 요소들 사이에 공간을 균등하게 분배 */
    align-items: center; /* 세로축 가운데 정렬 */
    background-color: #f8f8f8; /* 배경색 */
    padding: 10px; /* 여백 */
    height: 80px;
    margin-bottom: 5px;
}

#buttomBar div {
    flex: 1; /* 모든 버튼이 동일한 비율로 차지 */
    text-align: center; /* 텍스트 가운데 정렬 */
}
#center-button {
    margin-top: 15px;
}
#center-button p {
    margin-top: 2px;
    font-size: 12px;
}

#center-button img {
    max-width: 90px; /* 이미지 크기 제한 */
    height: 55px;
    width: 55px;
    border-radius: 50%;
    margin-top: 8px;
}

#right-button, #left-button {
    margin-top: 20px;
}

#right-button img {
    max-width: 40px;
}
#left-button img {
    max-width: 30px;
}
#left-button p {
    margin-top: 10px;
    font-size: 10px;
}

#right-button p {
    margin-top: 5px;
    font-size: 10px;
}
</style>