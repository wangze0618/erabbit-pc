import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'normalize.css'
import '@/assets/styles/common.less'
createApp(App).use(store).use(router).mount('#app')
