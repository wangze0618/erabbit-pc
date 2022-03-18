<template>
  <div class="goods-item">
    <RouterLink :to="`/product/${goods.id}`" class="image img-fluid">
      <img :src="goods.picture" alt="" />
    </RouterLink>
    <p class="name ellipsis-2">{{ goods.name }}</p>
    <p class="desc">
      {{ goods.desc }}
    </p>
    <p class="price">&yen;{{ goods.price }}</p>
    <div class="extra">
      <RouterLink to="/">
        <span>找相似</span>
        <span>发现现多宝贝 &gt;</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup name="HomeGoods">
const props = defineProps({
  goods: {
    type: Object,
    default: () => [],
  },
})
</script>

<style scoped lang="less">
.description {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.goods-item {
  //   width: 240px;
  height: 300px;
  padding: 10px 30px;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
  transition: all 0.5s;
  .image {
    display: block;
    margin: 0 auto;
    width: 140px;
    height: 140px;
    img {
      width: 140px;
      height: 140px;
      // width: 100%;
      // height: 100%;
    }
  }
  p {
    margin-top: 6px;
    font-size: 16px;
    &.name {
      height: 44px;
    }
    &.desc {
      width: 140px;
      display: inline-block;
      color: #666;
      height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &.price {
      text-align: center;
      margin-top: 10px;
      font-size: 22px;
      font-weight: 700;
      color: @priceColor;
    }
  }
  .extra {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 86px;
    width: 100%;
    background: @xtxColor;
    text-align: center;
    transform: translate3d(0, 100%, 0);
    transition: all 0.5s;
    span {
      display: block;
      color: #fff;
      width: 120px;
      margin: 0 auto;
      line-height: 30px;
      &:first-child {
        font-size: 18px;
        border-bottom: 1px solid #fff;
        line-height: 40px;
        margin-top: 5px;
      }
    }
  }
  &:hover {
    border-color: @xtxColor;
    .extra {
      transform: none;
    }
  }
}
</style>
