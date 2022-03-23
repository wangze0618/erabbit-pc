<template>
  <RouterLink
    :to="`/product/${goods.id}`"
    class="col-12 col-sm-6 col-md-4 col-lg-auto goods-item"
  >
    <img :src="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  goods: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style scoped lang="less">
.goods-item {
  display: block;
  max-width: 240px;
  padding: 20px 30px;
  text-align: center;
  &:hover {
    color: unset;
  }
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>
