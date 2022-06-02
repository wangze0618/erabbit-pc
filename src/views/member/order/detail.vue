<template>
  <div class="member-detail" v-if="order">
    <!-- 头部 -->
    <DetailAction :order="order"></DetailAction>
    <!-- 进度 -->
    <DetailStep :order="order"></DetailStep>
    <!-- 物流 -->
    <DetailLogistics :order="order" v-if="showLogisticsInfo"></DetailLogistics>
    <!-- 信息 -->
    <DetailInfo :order="order"></DetailInfo>
  </div>
</template>

<script setup>
import { findOrderDetail } from '@/api/order'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import DetailAction from './components/detail-action.vue'
import DetailStep from './components/detail-step.vue'
import DetailLogistics from './components/detail-logistics.vue'
import DetailInfo from './components/detail-info.vue'

const route = useRoute()
const order = ref(null)
onMounted(async () => {
  const { result } = await findOrderDetail(route.params.id)
  order.value = result
})

// 显示物流信息组件
const showLogisticsInfo = computed(() => {
  return [3, 4, 5].some((i) => i == order.value.orderState)
})
</script>

<style scoped lang="less">
.member-detail {
  background: #fff !important;
  height: 100%;
}
</style>
