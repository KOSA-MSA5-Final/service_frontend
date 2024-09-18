<template>
    <div id="beforeLoginMain">
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
    components: {
        ButtomBar
    }
}
</script>

<style scoped>
    #beforeLoginMain {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh; /* 전체 화면을 차지 */
    }

    h1 {
        text-align: center;
    }

    p {
        text-align: center;
    }

</style>
