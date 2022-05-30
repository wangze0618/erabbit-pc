<template>
  <div class="member-detail" v-if="order">
    <!-- 头部 -->
    <DetailAction :order="order"></DetailAction>
    <!-- 进度 -->
    <DetailStep></DetailStep>
    <!-- 物流 -->
    <!-- 信息 -->
  </div>
</template>

<script setup>
import { findOrderDetail } from '@/api/order'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DetailAction from './components/detail-action.vue'
import DetailStep from './components/detail-step.vue'

const route = useRoute()
const order = ref(null)
onMounted(async () => {
  const { result } = await findOrderDetail(route.params.id)
  order.value = result
})
</script>

<style scoped lang="less">
.member-detail {
  background: #fff !important;
  height: 100%;
}
</style>
