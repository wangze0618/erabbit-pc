<!-- 头、底 -->
<template>
  <div class="layout-container">
    <!-- 顶部通栏 -->
    <!-- <nav>顶部通栏</nav> -->
    <AppTopnav class="d-none d-md-block"></AppTopnav>
    <!-- 头部组件 -->
    <AppHeader></AppHeader>
    <!-- 内容容器 -->
    <div class="main">
      <!-- 二级路由 -->
      <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <footer>底部组件</footer>
  </div>
</template>

<script>
import { ref } from 'vue'
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
export default {
  name: 'Layout',
  setup() {
    return {}
  },
  components: { AppTopnav, AppHeader },
}
</script>

<style scoped lang="less"></style>
