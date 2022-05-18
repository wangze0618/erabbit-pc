<template>
  <XtxDialog title="正在支付..." v-model.visible="visible">
    <div class="pay-wait">
      <img src="@/assets/images/load.gif" alt="" />
      <div v-if="order">
        <p>如果支付成功：</p>
        <RouterLink :to="`/member/order/${order.id}`">查看订单详情></RouterLink>
        <p>如果支付失败：</p>
        <RouterLink to="/">查看相关疑问></RouterLink>
      </div>
    </div>
  </XtxDialog>
</template>

<script setup>
import XtxDialog from '@/components/library/xtx-dialog.vue'
import { ref } from 'vue'

// 控制显示
const visible = ref(false)

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  // order: {
  //   type: Object,
  //   default: () => {},
  // },
})
</script>

<style scoped lang="less">
.pay-wait {
  display: flex;
  justify-content: space-around;
  p {
    margin-top: 30px;
    font-size: 14px;
  }
  a {
    color: @xtxColor;
  }
}
</style>
