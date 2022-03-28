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
        <ul class="row list-row">
          <li v-for="i in 20" :key="i" class="col-6 col-md-4 col-lg-3 p-0">
            <GoodsItem :goods="{}"></GoodsItem>
          </li>
        </ul>

        <!-- 无限加载组件 -->
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData()"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SubBread from './sub-bread.vue'
import SubFilter from './sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import XtxInfiniteLoading from '@/components/library/xtx-infinite-loading.vue'

// const isCheck = ref(true)
const loading = ref(false)
const finished = ref(false)

const getData = () => {
  console.log('加载数据')
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  // margin-top: 25px;
  // .list-row {
  //   display: flex;
  //   flex-wrap: wrap;
  // }
}
</style>
