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
      <!-- 最新专题 -->
      <HomeSpecial />
    </div>
  </div>
</template>
<script setup name="PageHome">
import HomeCategory from './components/home-category'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeSkeleton from './components/home-skeleton.vue'
import HomeBrand from './components/home-brand.vue'
import HomeBanner from './components/home-banner.vue'
import HomeProduct from './components/home-product.vue'
import homeSpecial from './components/home-special.vue'
import HomeSpecial from './components/home-special.vue'
</script>
<style scoped lang="less"></style>
