<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter />
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange"></SubSort>
        <ul class="row list-row">
          <li
            v-for="goods in goodsList"
            :key="goods.id"
            class="col-6 col-md-4 col-lg-3 p-0"
          >
            <GoodsItem :goods="goods"></GoodsItem>
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
import { ref, watch } from 'vue'
import SubBread from './sub-bread.vue'
import SubFilter from './sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import XtxInfiniteLoading from '@/components/library/xtx-infinite-loading.vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'

const route = useRoute()

// 加载中、是否加载完毕、商品列表数据、请求参数
const loading = ref(false)
const finished = ref(false)
let goodsList = ref([])
let reqParams = {
  page: 1,
  pageSize: 20,
  categoryId: route.params.id,
}

const getData = async () => {
  loading.value = true
  const { result } = await findSubCategoryGoods(reqParams)
  // 添加数据
  if (result.items.length) {
    goodsList.value.push(...result.items)
    reqParams.page++
  } else {
    finished.value = true
  }
  loading.value = false
}

watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && `/category/sub/${newVal}` == route.path) {
      finished.value = false
      goodsList.value = []
      reqParams = {
        page: 1,
        pageSize: 20,
        categoryId: newVal,
      }
    }
  }
)

// 更改筛选组件的数据，重新请求
const sortChange = (sortParams) => {
  finished.value = false
  goodsList.value = []
  // 合并数据
  reqParams = { ...reqParams, ...sortParams }
  reqParams.page = 1
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
