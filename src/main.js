import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '@/assets/styles/common.less'

// 导入UI组件库
import UI from '@/components/library/index'
const app = createApp(App)

// 指令-图片懒加载
import defaultImg from '@/assets/images/200.png'
app.directive('lazyLoad', {
  mounted(el, binding) {
    const observe = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)

          // 加载失败的时候设置默认图片
          el.onerror = () => {
            el.src = defaultImg
          }
          // 把绑定的值 赋值给 监察的元素
          el.src = binding.value
        }
      },
      {
        threshold: 0,
      }
    )
    // 开启观察
    observe.observe(el)
  },
})

// 指令-无数据情况下显示默认图片
app.directive('ShowDefaultImg', {
  mounted(el, binding) {
    el.onerror = () => {
      el.src = defaultImg
      el.src = binding.value
    }
  },
})
app.use(store).use(router).use(UI).mount('#app')
