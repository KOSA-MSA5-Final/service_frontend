import setProfile from '@/components/AfterLogin/SettingProfile/ProfileSetting1.vue'
import setProfile2 from '@/components/AfterLogin/SettingProfile/ProfileSetting2.vue'
import setProfile3 from '@/components/AfterLogin/SettingProfile/ProfileSetting3.vue'
import setProfile4 from '@/components/AfterLogin/SettingProfile/ProfileSetting4.vue'
import setProfile5 from '@/components/AfterLogin/SettingProfile/ProfileSetting5.vue'
import setProfile6 from '@/components/AfterLogin/SettingProfile/ProfileSetting6.vue'
import UserInfoPage from '@/components/AfterLogin/SettingProfile/UserInfoPage.vue'

const pageroutes = [
    {
        path: '/userinfo', // 사용자 정보 페이지 경로
        name: 'UserInfo',
        component: UserInfoPage, // 사용자 정보 페이지 컴포넌트
    },
    {
        path: '/setProfile1',
        name: 'setProfilePage1',
        component: setProfile
    },
    {
        path: '/setProfile2',
        name: 'setProfilePage2',
        component: setProfile2
    },
    {
        path:'/setProfile3',
        name: 'setProfilePage3',
        component: setProfile3
    },
    {
        path:'/setProfile4',
        name: 'setProfilePage4',
        component: setProfile4
    },
    {
        path:'/setProfile5',
        name: 'setProfilePage5',
        component: setProfile5
    },
    {
        path:'/setProfile6',
        name: 'setProfilePage6',
        component: setProfile6
    },
    
]

export default pageroutes;