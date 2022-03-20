<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem :to="{ path: '/' }">首页</XtxBreadItem>
        <XtxBreadItem>电器</XtxBreadItem>
        <XtxBreadItem>电视</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <!-- 全部分类 -->
      <!-- 各个分类推荐商品 -->
    </div>
  </div>
</template>

<script setup name="TopCategory">
import { ref } from 'vue'
import XtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
</script>

<style scoped lang="less"></style>
