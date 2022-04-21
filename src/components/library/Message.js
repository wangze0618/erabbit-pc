import { createVNode, render } from 'vue'
import XtxMessage from '@/components/library/xtx-message.vue'
/* 
 提供一个能够显示xtx-message组件的函数
 这个函数将来：1、导入直接使用；2、也可以挂载到Vue实例原型上
 1、import Message from 'Message.js' -> Message({type:'error',text:'提示文字'})
 2、this.$message({type:'error',text:'提示文字'})
*/

// 渲染组件
// 1、 导入消息提示组件 ✔
// 3、 准备一个装载消息提示组件的DOM容器 ✔
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)

export default ({ type, text }) => {
  // 2、 将消息组件编译为虚拟节点VNode ✔
  const vnode = createVNode(XtxMessage, { type, text })
  // 4、 将虚拟节点渲染在容器中
  render(vnode, div)
  let timer = null
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 5000)
}
