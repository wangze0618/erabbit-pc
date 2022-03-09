<template>
  <!-- <div class="page-home"> -->
  <div class="home-entry">
    <!-- 首页入口 -->
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
      <!-- </div> -->
    </div>
    <!-- 新鲜好物 -->
    <!-- 人气推荐 -->
  </div>
</template>
<script>
import HomeBanner from './components/home-banner.vue'
import HomeCategory from './components/home-category'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner },
}
</script>
<style scoped lang="less"></style>
