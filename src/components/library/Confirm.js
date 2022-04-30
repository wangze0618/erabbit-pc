import XtxConfirm from '@/components/library/xtx-confirm'
import { createApp } from 'vue'
function confirmBox(title, text) {
  const vNode = createApp(XtxConfirm, { title, text })
  const div = document.createElement('div')
  document.body.appendChild(div)
  vNode.mount(div)
}

export default confirmBox
