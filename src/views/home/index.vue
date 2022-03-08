<template>
  <div class="page-home">
    <div class="home-entry">
      <!-- 首页入口 -->
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
export default {
  name: 'PageHome',
  components: { HomeCategory },
}
</script>
<style scoped lang="less"></style>
