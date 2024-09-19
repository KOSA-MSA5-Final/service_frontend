import { createRouter, createWebHistory } from 'vue-router';
import BeforeLoginMain from "@/components/BeforeLogin/BeforeLoginMain.vue";
import AfterLoginMain from "@/components/AfterLogin/AfterLoginMain.vue";

// 라우트 정의
const routes = [
    {
        path: '/',
        name: 'BeforeLoginMain',
        component: BeforeLoginMain 
    },
    {
        path: '/main',
        name: 'AfterLoginMain',
        component: AfterLoginMain
    }
];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
