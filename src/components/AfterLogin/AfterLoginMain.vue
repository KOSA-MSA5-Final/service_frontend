<template>
    <div id="afterLoginMain">
        <!-- 다른 내용들 -->
        <h1>메인 페이지 콘텐츠</h1>
        <p>여기에 메인 페이지의 다른 요소들이 들어갑니다.</p>

        <!-- ButtomBar 컴포넌트를 하단에 배치 -->
        <ButtomBar />
    </div>
</template>

<script>
import ButtomBar from './ButtomBar.vue';

export default {
    name: 'AfterLoginMain', // 컴포넌트 이름 추가
    components: {
        ButtomBar
    }
}
</script>

<style scoped>
    #afterLoginMain { /* 아이디를 올바르게 수정 */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh; /* 전체 화면을 차지 */
    }

    h1, p {
        text-align: center;
    }

</style>
