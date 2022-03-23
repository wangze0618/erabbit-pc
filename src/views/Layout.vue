<!-- 头、底 -->
<template>
  <div class="layout-container">
    <!-- 顶部通栏 -->
    <AppTopnav class="d-none d-md-block"></AppTopnav>
    <!-- 头部组件 -->
    <AppHeader></AppHeader>
    <!-- 内容容器 -->
    <div class="main">
      <!-- 二级路由 -->
      <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import { useStore } from 'vuex'
import XtxMore from '@/components/library/xtx-more.vue'
import XtxBacktop from '@/components/library/xtx-backtop.vue'
export default {
  name: 'Layout',

  setup() {
    const store = useStore()
    store.dispatch('category/getList')

    const target = ref(null)

    return { target }
  },
  components: { AppTopnav, AppHeader, AppFooter, XtxMore, XtxBacktop },
}
</script>

<style scoped lang="less"></style>
