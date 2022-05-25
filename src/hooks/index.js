// 提供复用逻辑的函数（钩子）
import { useIntersectionObserver } from '@vueuse/core'
import dayjs from 'dayjs'
import { ref, onUnmounted } from 'vue'

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
    },
    {
      threshold: 0,
    }
  )
  return { target, data }
}

// 倒计时
export const usePayTime = () => {
  const timer = ref(1800)
  let timeText = ref('')

  const start = (countdown) => {
    timer.value = countdown
    timeText.value = dayjs.unix(timer.value).format('mm分ss秒')
  }

  let timeOut
  if (timer.value) {
    timeOut = setInterval(() => {
      timer.value--
      timeText.value = dayjs.unix(timer.value).format('mm分ss秒')
      if (timer.value < 0) {
        timeText.value = '已过期'
        clearTimeout(timeOut)
      }
    }, 1000)
  }

  onUnmounted(() => {
    clearTimeout(timeOut)
  })
  return { start, timeText }
}
