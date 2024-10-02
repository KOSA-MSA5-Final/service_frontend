// export default router;
import { createRouter, createWebHistory } from 'vue-router';
import BeforeLoginMain from '@/components/BeforeLogin/BeforeLoginMain.vue';
import SignupPage from '@/components/BeforeLogin/SignupPage.vue';
import AfterLoginMain from '@/components/AfterLogin/Layouts/AfterLoginMain.vue';
import SettingsMain from '@/components/AfterLogin/Account/SettingsMain.vue';
import ProfileMain from '@/components/AfterLogin/Profile/ProfileMain.vue';
import KakaoMaps from '@/components/AfterLogin/maps/KakaoMaps.vue';
import MainPage from '@/components/AfterLogin/main/MainPage.vue';
import UserInfoPage from '@/components/AfterLogin/SettingProfile/UserInfoPage.vue';
import setProfile from '@/components/AfterLogin/SettingProfile/ProfileSetting1.vue';
import setProfile2 from '@/components/AfterLogin/SettingProfile/ProfileSetting2.vue';
import setProfile3 from '@/components/AfterLogin/SettingProfile/ProfileSetting3.vue';
import setProfile4 from '@/components/AfterLogin/SettingProfile/ProfileSetting4.vue';
import setProfile5 from '@/components/AfterLogin/SettingProfile/ProfileSetting5.vue';
import setProfile6 from '@/components/AfterLogin/SettingProfile/ProfileSetting6.vue';
import setProfile7 from '@/components/AfterLogin/SettingProfile/ProfileSetting7.vue';
import setProfile8 from '@/components/AfterLogin/SettingProfile/ProfileSetting8.vue';
import testProfile from '@/components/AfterLogin/SettingProfile/TestProfile.vue';

import RegisterReceipt from '@/components/AfterLogin/Profile/RegisterReceipt.vue';

// import settingProfile from './settingProfile';

import AddressSetting from '@/components/AfterLogin/Account/AddressSetting.vue';
import AddAddressPage from '@/components/AfterLogin/Account/AddAddressPage.vue';
import AddressSearchPage from '@/components/AfterLogin/Account/AddressSearchPage.vue';

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
                path: 'upload_receipt',
                name: 'RegisterReceiptPage',
                component: RegisterReceipt,
            },
            {
                path: 'userinfo', // 사용자 정보 페이지 경로
                name: 'UserInfo',
                component: UserInfoPage, // 사용자 정보 페이지 컴포넌트
            },
            {
                path: 'testProfile',
                name: 'testProfile',
                component: testProfile,
            },
            {
                path: 'setProfile1',
                name: 'setProfilePage1',
                component: setProfile,
            },
            {
                path: 'setProfile2',
                name: 'setProfilePage2',
                component: setProfile2,
            },
            {
                path: 'setProfile3',
                name: 'setProfilePage3',
                component: setProfile3,
            },
            {
                path: 'setProfile4',
                name: 'setProfilePage4',
                component: setProfile4,
            },
            {
                path: 'setProfile5',
                name: 'setProfilePage5',
                component: setProfile5,
            },
            {
                path: 'setProfile6',
                name: 'setProfilePage6',
                component: setProfile6,
            },
            {
                path: 'setProfile7',
                name: 'setProfilePage7',
                component: setProfile7,
            },
            {
                path: 'setProfile8',
                name: 'setProfilePage8',
                component: setProfile8,
            },
            {
                path: 'settings/address',
                name: 'AddressSettingPage',
                component: AddressSetting,
            },
            {
                path: 'settings/address/add',
                name: 'AddAddressPage',
                component: AddAddressPage,
            },
            {
                path: '/settings/address/search',
                name: 'AddressSearchPage',
                component: AddressSearchPage, // 실제 주소 검색 화면 컴포넌트
            },
        ],
    },
    {
        path: '/signup',
        name: 'SignupPage',
        component: SignupPage,
    },
    {
        path: '/main/maps',
        name: 'MapsPage',
        component: KakaoMaps,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: [...routes],
});

export default router;
