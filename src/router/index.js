import store from '@/store'
import { createRouter, createWebHashHistory } from 'vue-router'

// 导入组件
const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home/index.vue')
const TopCategory = () => import('@/views/category/index.vue')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index.vue')
const Login = () => import('@/views/login/index.vue')
const ErrorPage = () => import('@/views/404.vue')
const Cart = () => import('@/views/cart/index.vue')

// 路由规则
const routes = [
  // 一级路由
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
    ],
  },
  {
    // 登录页面路由
    path: '/login',
    component: Login,
  },
  // {
  //   path: '/404',
  //   component: ErrorPage,
  // },
  // {
  //   path: '/:catchAll(.*)',
  //   redirect: '/404',
  //   hidden: true,
  // },
]

const router = createRouter({
  // 使用hash 路由模式
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, from, next) => {
  const { profile } = store.state.user

  if (!profile.token && to.path.startsWith('/member')) {
    // 未登录的情况
    console.log(to)
    next(`/login?redirectUrl=${encodeURIComponent(to.fullPath)}`)
  } else {
    // 已登录的情况
    next()
  }
})
const whiteList = routes.map((item) => item)
console.log(whiteList)
export default router
