import { createRouter, createWebHistory } from 'vue-router';
import BeforeLoginMain from "@/components/BeforeLogin/BeforeLoginMain.vue";
// import AfterLoginMain from "@/components/AfterLogin/AfterLoginMain.vue";
import LoginPage from '@/components/BeforeLogin/LoginPage.vue';
import SignupPage from '@/components/BeforeLogin/SignupPage.vue';
import AfterLoginMain from '@/components/AfterLogin/Layouts/AfterLoginMain.vue';
import Settings1 from '@/components/AfterLogin/Account/SettingsMain.vue';
import ProfileMain from '@/components/AfterLogin/Profile/ProfileMain.vue';
import settingProfile from './settingProfile';

const isLoggedIn = () => {
    return !!localStorage.getItem('token'); // 토큰이 존재하면 로그인된 상태
};

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
        component: AfterLoginMain,

        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next(); // 로그인된 경우 접근 허용
            } else {
                next('/login'); // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
            }
        },
        children: [
            {
                path: 'profile',
                name: 'ProfileMainPage',
                component: ProfileMain
            },
            {
                path: 'settings',
                name: 'SettingsPage',
                component: Settings1
            },
        ]
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
    routes: [...routes, ...settingProfile],
});

export default router;
