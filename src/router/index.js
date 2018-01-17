import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import findMiusic from '@/components/header/findMiusic/findmiusic'
import Recommend from '@/components/header/findMiusic/recommend/recommend'
import MyMiusic from '@/components/header/myMiusic/mymiusic'
import Friend from '@/components/header/friend/friend'
import DonwLoad from '@/components/header/donwLoad/donwload'
const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/findmiusic'
        },
        {
            path:'/findmiusic',
            component:findMiusic,
            children:[
                { path: 'recommend', component: Recommend}
            ],
            redirect: 'findmiusic/recommend'
        },
        {
            path:'/mymiusic',
            component:MyMiusic
        },
        {
            path: '/friend',
            component: Friend
        },
        {
            path: '/donwload',
            component: DonwLoad
        }
    ]
})
export default router;