<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import GoodsItem from '@/views/category/components/goods-item.vue'
import { useRoute } from 'vue-router'
import { findGoodsHot } from '@/api/product'

const route = useRoute()
const props = defineProps({
  // 热榜类型
  type: {
    type: Number,
    default: 1,
  },
})
// 发请求获取数据
const goodsList = ref([])
onMounted(async () => {
  const { result } = await findGoodsHot(route.params.id, props.type)
  goodsList.value = result
})

// 定义title
const types = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
const title = computed(() => {
  return types[props.type]
})
</script>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
