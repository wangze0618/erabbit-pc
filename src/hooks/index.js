// 提供复用逻辑的函数（钩子）
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

// 数据懒加载函数 stop() 停止监听
export const useLazyData = (apiFn) => {
  // target 挂载的DOM
  // data 返回的数据
  const target = ref(null)
  const data = ref([])
  const { stop } = useIntersectionObserver(
    target,
    async ([{ isIntersecting }], observerElement) => {
      // 进入可视区，就调用api获取数据
      if (isIntersecting) {
        stop()
        const { result } = await apiFn()
        data.value = result
      }
    }
  )
  return { target, data }
}
