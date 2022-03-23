<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem :to="{ path: '/' }">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{
            topCategory.name
          }}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 轮播图 -->
      <div class="row">
        <div class="col-xs-12" style="height: 500px">
          <XtxCarousel :sliders="sliders" autoPlay></XtxCarousel>
        </div>
      </div>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul class="row">
          <li
            v-for="sub in topCategory.children"
            class="col-6 col-sm-4 col-md-3 col-lg-2"
            :key="sub.id"
          >
            <a href="javascript:;">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类推荐商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">{{ sub.name }}</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body row body-item">
          <GoodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="TopCategory">
import { ref, onMounted, computed, watch } from 'vue'
import XtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
import { findBanner } from '@/api/home'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import GoodsItem from '@/views/category/components/goods-item'
import XtxMore from '@/components/library/xtx-more.vue'
import { findTopCategory } from '@/api/category'
// 轮播图
const sliders = ref([])
onMounted(async () => {
  const { result } = await findBanner()
  sliders.value = result
})

// 面包屑+所有子分类 ==> vuex
const store = useStore()
const route = useRoute()
const topCategory = computed(() => {
  let cate = {}
  // 当前顶级分类，根据 路由路径的id 去vuex中的category模块的list中查找
  const item = store.state.category.list.find(
    (item) => item.id == route.params.id
  )
  if (item) cate = item
  return cate
})

// 获取各个子类目下推荐商品
const subList = ref([])
const getSubList = async () => {
  const { result } = await findTopCategory(route.params.id)
  subList.value = result.children
}

watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && `/category/${newVal}` == route.path) getSubList()
  },
  { immediate: true }
)
</script>

<style scoped lang="less">
@media screen and (max-width: 576px) {
  .body-item {
    justify-content: center !important;
  }
}
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
