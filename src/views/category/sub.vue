<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter />
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
        <SubSort></SubSort>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SubBread from './sub-bread.vue'
import SubFilter from './sub-filter.vue'
import XtxCheckbox from '@/components/library/xtx-checkbox.vue'
import SubSort from './components/sub-sort.vue'

const isCheck = ref(true)
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
