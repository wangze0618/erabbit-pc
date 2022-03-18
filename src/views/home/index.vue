<template>
  <div class="home-entry">
    <!-- 首页入口 -->
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
      <!-- 新鲜好物 -->
      <HomeNew />
      <!-- 人气推荐 -->
      <HomeHot />
      <!-- 热门品牌 -->
      <HomeBrand />
      <!-- 商品区块 -->
      <HomeProduct />
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeSkeleton from './components/home-skeleton.vue'
import HomeBrand from './components/home-brand.vue'
import HomeBanner from './components/home-banner.vue'
import HomeProduct from './components/home-product.vue'

export default {
  name: 'PageHome',
  components: {
    HomeCategory,
    HomeNew,
    HomeHot,
    HomeSkeleton,
    HomeBrand,
    HomeBanner,
    HomeProduct,
  },
}
</script>
<style scoped lang="less"></style>
