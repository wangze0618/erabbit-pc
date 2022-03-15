<template>
  <div class="home-entry">
    <!-- 首页入口 -->
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>

    <!-- 新鲜好物 -->
    <HomeNew></HomeNew>
    <!-- 人气推荐 -->
  </div>
</template>
<script>
import HomeBanner from './components/home-banner.vue'
import HomeCategory from './components/home-category'
import HomeNew from './components/home-new.vue'
export default {
  name: 'PageHome',
  components: { HomeCategory, HomeBanner, HomeNew },
}
</script>
<style scoped lang="less"></style>
