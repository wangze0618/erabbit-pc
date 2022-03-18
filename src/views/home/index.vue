<!--
 * @Author: your name
 * @Date: 2022-03-04 13:42:13
 * @LastEditTime: 2022-03-18 22:00:04
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \eribbit-pc\src\views\home\index.vue
-->
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
