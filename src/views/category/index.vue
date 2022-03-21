<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem :to="{ path: '/' }">首页</XtxBreadItem>
        <XtxBreadItem v-if="topCategory">{{ topCategory.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <div class="row">
        <div class="col-xs-12" style="height: 500px">
          <XtxCarousel :sliders="sliders" autoPlay></XtxCarousel>
        </div>
      </div>
      <!-- 所有二级分类 -->
      <div class="sub-list" v-if="topCategory && topCategory.children">
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
      <!-- 不同分类商品 -->
    </div>
  </div>
</template>

<script setup name="TopCategory">
import { ref, onMounted, computed } from 'vue'
import XtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
import { findBanner } from '@/api/home'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

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
  // 当前顶级分类，根据 路由路径的id 去vuex中的category模块的list中查找
  return store.state.category.list.find((item) => item.id == route.params.id)
})
</script>

<style scoped lang="less">
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
}
</style>
