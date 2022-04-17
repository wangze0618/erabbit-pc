<template>
  <!-- 一级路由 -->
  <router-view></router-view>
</template>
<style lang="less">
#nprogress {
  .bar {
    height: 3px !important;
    background: @xtxColor !important;
  }
  .spinner-icon {
    border-top-color: @xtxColor !important;
    border-left-color: @xtxColor !important;
  }
  .peg {
    box-shadow: 0 0 10px @xtxColor, 0 0 5px @xtxColor !important;
  }
}
</style>
