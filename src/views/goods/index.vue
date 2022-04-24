<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{
          goods.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <!-- SKU组件 -->
          <GoodsSku :goods="goods" @change="changeSku" />
          <!-- 数量选择组件 -->
          <XtxNumberbox
            :count="count"
            :max="goods.inventory"
            @change="count = $event"
            label="数量"
          />
          <!-- 按钮组件 -->
          <XtxButton
            @click="insertCart()"
            type="primary"
            size="large"
            style="margin-top: 20px"
            >加入购物车</XtxButton
          >
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant></GoodsRelevant>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs></GoodsTabs>
          <!-- 注意事项 -->
          <GoodsWarn></GoodsWarn>
        </div>
        <!-- 24热榜+周热销榜 -->
        <div class="goods-aside">
          <GoodsHot></GoodsHot>
          <GoodsHot :type="2"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
  <XtxLoading v-else></XtxLoading>
</template>

<script setup>
import { nextTick, provide, ref, watch } from 'vue'
import XtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
import { useRoute } from 'vue-router'
import { findProduct } from '@/api/product'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import XtxNumberbox from '../../components/library/xtx-numberbox.vue'
import XtxButton from '@/components/library/xtx-button.vue'
import GoodsRelevant from './components/goods-relevant.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot.vue'
import GoodsWarn from './components/goods-warn.vue'
import XtxLoading from '@/components/library/xtx-loading.vue'
const route = useRoute()

const changeSku = (sku) => {
  if (sku.skuId) {
    goods.value.price = sku.price
    goods.value.oldPrice = sku.oldPrice
    goods.value.inventory = sku.inventory
  }
}
// 获取商品详情
const useGoods = () => {
  const goods = ref(null)
  watch(
    () => route.params.id,
    async (newVal) => {
      if (newVal && route.path == `/product/${newVal}`) {
        const { result } = await findProduct(newVal)
        // 目的是更新数据
        goods.value = null
        nextTick(() => {
          goods.value = result
        })
      }
    },
    { immediate: true }
  )
  return goods
}
const goods = useGoods()

// 默认选择的数量
let count = ref(1)
provide('goods', goods)

// 加入购物车
const insertCart = () => {}
</script>

<style scoped lang="less">
@media screen and (max-width: 576px) {
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    // width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
