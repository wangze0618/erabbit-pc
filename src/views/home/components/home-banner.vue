<template>
  <div class="home-banner">
    <!-- 公用轮播图组件 -->
    <xtxCarousel
      :duration-time="4500"
      auto-play
      :sliders="sliders"
    ></xtxCarousel>
  </div>
</template>
<script>
import { findBanner } from '@/api/home'
import xtxCarousel from '@/components/library/xtx-carousel.vue'
import { ref, onMounted } from 'vue'
export default {
  name: 'HomeBanner',
  components: { xtxCarousel },
  setup() {
    // 获取轮播图数据
    const sliders = ref([])
    onMounted(async () => {
      const { result } = await findBanner()
      sliders.value = result
    })
    return { sliders }
  },
}
</script>
<style scoped lang="less">
.home-banner {
  width: 100%;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
// 覆盖样式
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
