<template>
  <!-- 一级路由 -->
  <router-view></router-view>
  <XtxBacktop></XtxBacktop>
</template>
<script setup>
import XtxBacktop from './components/library/xtx-backtop.vue'
</script>
<style lang="less">
#nprogress {
  // 进度条
  .bar {
    height: 3px !important;
    background: @xtxColor !important;
  }
  // 旋转图标
  .spinner-icon {
    border-top-color: @xtxColor !important;
    border-left-color: @xtxColor !important;
    // border-top-color: transparent !important;
    // border-left-color: transparent !important;
  }
  .peg {
    box-shadow: 0 0 10px @xtxColor, 0 0 5px @xtxColor !important;
  }
}
</style>
