import { createRouter, createWebHashHistory } from 'vue-router'

// 导入组件
const Layout = () =>
    import('@/views/Layout.vue')
const Home = () =>
    import('@/views/home/index.vue')

// 路由规则
const routes = [
    // 一级路由
    {
        path: '/',
        component: Layout,
        children: [{ path: '', component: Home }],
    },
]

const router = createRouter({
    // 使用hash 路由模式
    history: createWebHashHistory(),
    routes,
})

export default router