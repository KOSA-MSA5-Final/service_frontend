import { createRouter, createWebHistory } from 'vue-router';
import BeforeLoginMain from "@/components/BeforeLogin/BeforeLoginMain.vue";
import AfterLoginMain from "@/components/AfterLogin/AfterLoginMain.vue";
import LoginPage from '@/components/BeforeLogin/LoginPage.vue';
import SignupPage from '@/components/BeforeLogin/SignupPage.vue';

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
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path:'/signup',
        name:"SignupPage",
        component: SignupPage
    }
];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
