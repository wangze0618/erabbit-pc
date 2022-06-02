<template>
  <div class="detail-step">
    <XtxSteps v-model:active="active">
      <XtxStepsItem title="提交订单" :desc="order.createTime" />
      <XtxStepsItem title="付款成功" :desc="order.payTime" />
      <XtxStepsItem title="商品发货" :desc="order.consignTime" />
      <XtxStepsItem title="确认收货" :desc="order.evaluationTime" />
      <XtxStepsItem title="订单完成" :desc="order.endTime" />
    </XtxSteps>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import XtxSteps from '@/components/library/xtx-steps.vue'
import XtxStepsItem from '@/components/library/xtx-steps.vue'
const props = defineProps({
  order: {
    type: Object,
    defatult: () => {},
  },
})

// 定义当前激活的步骤
const active = computed(() => {
  return props.order.orderState === 6 ? 1 : props.order.orderState
})
</script>

<style scoped lang="less"></style>
