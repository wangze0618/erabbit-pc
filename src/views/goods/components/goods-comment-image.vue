<template>
  <div class="goods-comment-image">
    <div class="list">
      <a href="javascript:;" v-for="url in pictures" :key="url">
        <img alt="" :src="url" />
      </a>
    </div>
    <div class="preview"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  pictures: {
    type: Array,
    default: () => [],
  },
})
const currImage = ref(null)
</script>
<style scoped lang="less">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        border-color: @xtxColor;
      }
    }
  }
}
</style>
