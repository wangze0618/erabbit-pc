import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '@/assets/styles/common.less'
// import 'amfe-flexible'

// 导入UI组件库
import UI from '@/components/library/index'

createApp(App).use(store).use(router).use(UI).mount('#app')
