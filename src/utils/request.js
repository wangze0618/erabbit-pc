/* 
    1 创建一个新的 axios实例
    2 请求拦截器 ： 如果有token 进行头部携带
    3 响应拦截器 ：1剥离无效数据 2处理token失效 
    4 导出一个函数，调用当前的 axios实例 
*/
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 导出基准地址 原因是：
// 其他地方不是通过axios发请求的地方也用上基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  // axios的一些配置
  baseURL: baseURL,
  timeout: 5000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 携带 token
    // 1. 获取用户信息对象
    const { profile } = store.state.user
    console.log(profile.token)
    // 2. 判断是否有token
    if (profile.token) {
      // 3. 设置token
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 401状态进入该函数
    if (error.response && error.response.status === 401) {
      // 1. 清空本地无效用户信息
      // 2. 跳转到登录页码
      // 3. 跳转需要传参 (当前路由地址) 给登录页码
      store.commit('user/setUser', {})
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push('/login?redirectUrl=' + fullPath)
      // 当前路由地址
      // 组件里面：/user?a=10
      //   $route.path === /user
      //   $route.fullPath === /user?a=10
      // js模块中：router.currentRoute.value.fullPath就是当前路由地址
      // encodeURIComponent 转换URI编码 防止解析地址出现问题
    }
    return Promise.reject(error)
  }
)

// 请求工具函数
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    /* 
      1. 如果是get请求,需要使用params来传递submitData
      2. 如果是get请求 需要使用data 来传递submitData
      [] 设置一个动态的key，写js表达式，js表达式的执行结果当作KEY
    */
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  })
}
