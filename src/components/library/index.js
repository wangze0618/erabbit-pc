// 扩展Vue原有功能：全局组件、自定义指令、挂载原型方法、
// Vue3没有全局过滤器

import xtxCarousel from "./xtx-carousel.vue"
import xtxSkeleton from "./xtx-skeleton.vue"

export default {
    install(app) {
        app.component(xtxSkeleton.name, xtxSkeleton)
        app.component(xtxCarousel.name, xtxCarousel)
    }
}