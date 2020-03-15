import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../components/HelloWorld')
    },
    {
        path: '/websites',
        name: 'Websites',
        component: () => import('../components/WebsitesList')
    },
    {
        path: '/websites/create',
        name: 'WebsiteCreation',
        component: () => import('../components/NewWebsite')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router
