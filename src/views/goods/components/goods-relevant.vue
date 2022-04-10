<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? '同类商品推荐' : '猜你喜欢' }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :sliders="sliders"></XtxCarousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { findRelevantGoods } from '@/api/product'
import XtxCarousel from '@/components/library/xtx-carousel.vue'

// 同类推荐，猜你喜欢
const props = defineProps({
  goodsId: {
    type: String,
    default: '',
  },
})

const sliders = ref([])
onMounted(async () => {
  const data = await findRelevantGoods({ id: props.goodsId })
  const pageSize = 4 // 每页显示的个数
  const pageCount = Math.ceil(data.result.length / pageSize) // 共4页

  for (let i = 0; i < pageCount; i++) {
    sliders.value.push(data.result.slice(pageSize * i, pageSize * (i + 1)))
  }
})
</script>

<style scoped lang="less">
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
</style>
