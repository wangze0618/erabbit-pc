import XtxConfirm from '@/components/library/xtx-confirm'
import { createVNode, render } from 'vue'

function confirmBox({ title, text }) {
  // 创建虚拟节点
  // 创建DOM容器
  const div = document.createElement('div')
  div.setAttribute('class', 'xtx-confirm-container')
  document.body.appendChild(div)

  return new Promise((resolve, reject) => {
    // 点击确认
    const confirmCallback = () => {
      render(null, div)
      document.body.removeChild(div)
      resolve()
    }
    // 点击取消
    const cancelCallback = () => {
      render(null, div)
      document.body.removeChild(div)
      reject(new Error('点击取消'))
    }
    const vnode = createVNode(XtxConfirm, {
      title,
      text,
      cancelCallback,
      confirmCallback,
    })
    render(vnode, div)
  })
}

export default confirmBox
