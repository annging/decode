import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index.vue'),
            meta: { title: '概览', icon: 'dashboard' }
        }]
    },
    { path: '/login', component: () => import('../views/log/index.vue'), meta: { title: '登录' }, hidden: true },
    {
        path: '/tag',
        component: Layout,
        redirect: '/tag/index',
        children: [{
            path: 'index',
            name: 'tagIndex',
            component: () => import('@/views/tag/index.vue'),
            meta: { title: 'tag管理' }
        }]
    },
    {
        path: '/post',
        component: Layout,
        redirect: '/post/index',
        children: [{
            path: 'index',
            name: 'postIndex',
            component: () => import('@/views/post/index.vue'),
            meta: { title: 'post管理' }
        }]
    },
]

const router = createRouter({
    history: createWebHistory(), // he HTML5 mode is created with createWebHistory() and is the recommended mode
    routes: routes // routes // (缩写) 相当于 routes: routes
})

export default router
