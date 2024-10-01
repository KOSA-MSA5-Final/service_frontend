import AfterLoginMain from '@/components/AfterLogin/Layouts/AfterLoginMain.vue';

import setProfile1 from '@/components/AfterLogin/SettingProfile/ProfileSetting1.vue';
import setProfile2 from '@/components/AfterLogin/SettingProfile/ProfileSetting2.vue';
import setProfile3 from '@/components/AfterLogin/SettingProfile/ProfileSetting3.vue';
import setProfile4 from '@/components/AfterLogin/SettingProfile/ProfileSetting4.vue';
import setProfile5 from '@/components/AfterLogin/SettingProfile/ProfileSetting5.vue';
import setProfile6 from '@/components/AfterLogin/SettingProfile/ProfileSetting6.vue';
import setProfile7 from '@/components/AfterLogin/SettingProfile/ProfileSetting7.vue';
import setProfile8 from '@/components/AfterLogin/SettingProfile/ProfileSetting8.vue';

import UserInfoPage from '@/components/AfterLogin/SettingProfile/UserInfoPage.vue';

const isLoggedIn = () => {
    return !!localStorage.getItem('token');
};

const pageroutes = [
    {
        path: '/userinfo', // 사용자 정보 페이지 경로
        name: 'UserInfo',
        component: UserInfoPage, // 사용자 정보 페이지 컴포넌트
    },
    {
        // path: '/setProfile',
        // name: 'setProfilePage',
        // component: ProtoType,
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
                path: 'setProfile1',
                name: 'setProfilePage1',
                component: setProfile1,
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
        ],
    },
];

export default pageroutes;
