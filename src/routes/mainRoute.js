import BeforeLoginMain from "@/components/BeforeLogin/BeforeLoginMain.vue";
import AfterLoginMain from "@/components/AfterLogin/AfterLoginMain.vue";

const routes = [
    {
        path:'/',
        component: BeforeLoginMain 
    },
    {
        path:'/main',
        component: AfterLoginMain
    }
]

export default mainRoutes;