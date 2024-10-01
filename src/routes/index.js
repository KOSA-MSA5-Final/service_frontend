// export default router;
import { createRouter, createWebHistory } from 'vue-router';
import BeforeLoginMain from '@/components/BeforeLogin/BeforeLoginMain.vue';
import SignupPage from '@/components/BeforeLogin/SignupPage.vue';
import AfterLoginMain from '@/components/AfterLogin/Layouts/AfterLoginMain.vue';
import SettingsMain from '@/components/AfterLogin/Account/SettingsMain.vue';
import ProfileMain from '@/components/AfterLogin/Profile/ProfileMain.vue';
import KakaoMaps from '@/components/AfterLogin/maps/KakaoMaps.vue';
import MainPage from '@/components/AfterLogin/main/MainPage.vue';

import RegisterReceipt from '@/components/AfterLogin/Profile/RegisterReceipt.vue';

import settingProfile from './settingProfile';
import AddressSetting from '@/components/AfterLogin/Account/AddressSetting.vue';

const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

const routes = [
    {
        path: '/',
        name: 'BeforeLoginMain',
        component: BeforeLoginMain,
    },
    {
        path: '/main',
        name: 'AfterLoginMain',
        component: AfterLoginMain,
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next('/');
            }
        },
        children: [
            {
                path: '',
                name: 'MainPage',
                component: MainPage,
            },
            {
                path: 'profile',
                name: 'ProfileMainPage',
                component: ProfileMain,
            },
            {
                path: 'settings',
                name: 'SettingsPage',
                component: SettingsMain,
            },
            {
                path: 'maps',
                name: 'MapsPage',
                component: KakaoMaps,
            },
            {
                path: 'upload_receipt',
                name: 'RegisterReceiptPage',
                component: RegisterReceipt,
            },
            {
                path: 'settings/address',
                name: 'AddressSettingPage',
                component: AddressSetting,
            },
        ],
    },
    {
        path: '/signup',
        name: 'SignupPage',
        component: SignupPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes, ...settingProfile],
});

export default router;
