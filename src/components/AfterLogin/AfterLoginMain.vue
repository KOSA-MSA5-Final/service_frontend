<template>
    <div id="afterLoginMain">
        <!-- 다른 내용들 -->
        <h1>메인 페이지 콘텐츠</h1>

        <p>여기에 메인 페이지의 다른 요소들이 들어갑니다.</p>
        <div id="logoutBox">
            <span>안녕하세요 ~님</span>
            <button @click="logout">로그아웃</button>
        </div>

        <!-- ButtomBar 컴포넌트를 하단에 배치 -->
        <ButtomBar />
    </div>
</template>

<script>
import { usePostStore } from '@/fetch_datas/fetch_example';
import { onMounted } from 'vue'; // Vue Composition API 사용
import { storeToRefs } from 'pinia'; // Pinia 상태를 반응형으로 가져오기 위해 사용
import ButtomBar from './ButtomBar.vue';

export default {
    name: 'AfterLoginMain',
    components: {
        ButtomBar
    },

    data() {
        return {

        };
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/login'); //
        },
    },
    setup() {
        const postStore = usePostStore(); // Pinia store 호출
        const { contents } = storeToRefs(postStore); // storeToRefs를 사용하여 반응형 상태로 만듦

        // 컴포넌트 마운트 시 데이터 가져오기
        onMounted(() => {
            postStore.fetchContents();
        });

        return {
            contents // 상태를 템플릿에서 사용할 수 있도록 리턴
        };
    }
};
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
    #logoutBox{
        display:flex;
        justify-content: center;
        align-items: center;
    }

</style>
