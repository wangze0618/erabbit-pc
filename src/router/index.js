import store from '@/store'
import { h, render } from 'vue'
import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
// 导入组件
const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home/index.vue')
const TopCategory = () => import('@/views/category/index.vue')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index.vue')
const Login = () => import('@/views/login/index.vue')
const ErrorPage = () => import('@/views/404.vue')
const Cart = () => import('@/views/cart/index.vue')
const CheckOut = () => import('@/views/member/pay/checkout.vue')
const Pay = () => import('@/views/member/pay/index.vue')
const PayResult = () => import('@/views/member/pay/result.vue')
const MemberLayout = () => import('@/views/member/Layout.vue')
const MemberHome = () => import('@/views/member/home/index.vue')
const MemberOrder = () => import('@/views/member/order/index.vue')
const MemberDetail = () => import('@/views/member/order/detail.vue')
const MemberInfo = () => import('@/views/member/info/index.vue')
// 路由规则
const routes = [
  // 一级路由
  {
    path: '/',
    component: Layout,
    children: [
      // 二级路由
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: CheckOut },
      { path: '/member/pay', component: Pay },
      { path: '/pay/callback', component: PayResult },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          // 三级路由
          {
            path: '/member',
            component: MemberHome,
          },
          {
            path: '/member/info',
            component: MemberInfo,
          },
          {
            path: '/member/order',
            // 创建一个RouterView容器形成嵌套关系
            component: { render: () => h(<RouterView />) },
            children: [
              { path: '', component: MemberOrder },
              { path: ':id', component: MemberDetail },
            ],
          },
        ],
      },
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
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const { profile } = store.state.user
  // 未登录的情况
  if (!profile.token && to.path.startsWith('/member')) {
    next(`/login?redirectUrl=${encodeURIComponent(to.fullPath)}`)
  } else {
    // 已登录的情况
    next()
  }
})
// const whiteList = routes.map((item) => item)
// console.log(whiteList)
export default router
