<template>
  <div class="detail-action">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <p>{{ orderStatus[order.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ order.id }}</p>
      <p>下单时间：{{ order.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="order.orderState === 1">
        <XtxButton
          @click="$router.push('/member/pay?id=' + order.id)"
          type="primary"
          size="small"
          >立即付款</XtxButton
        >
        <XtxButton @click="cancelOrder()" type="gray" size="small"
          >取消订单</XtxButton
        >
      </template>
      <!-- 待发货 -->
      <template v-if="order.orderState === 2">
        <XtxButton type="primary" size="small">再次购买</XtxButton>
        <XtxButton @click="consignmentOrder(order.id)" type="plain" size="small"
          >模拟发货</XtxButton
        >
      </template>
      <!-- 待收货 -->
      <template v-if="order.orderState === 3">
        <XtxButton @click="confirmOrder" type="primary" size="small"
          >确认收货</XtxButton
        >
        <XtxButton
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          type="plain"
          size="small"
          >再次购买</XtxButton
        >
      </template>
      <!-- 待评价 -->
      <template v-if="order.orderState === 4">
        <XtxButton
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          type="primary"
          size="small"
          >再次购买</XtxButton
        >
        <XtxButton type="plain" size="small">评价商品</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已完成 -->
      <template v-if="order.orderState === 5">
        <XtxButton
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          type="primary"
          size="small"
          >再次购买</XtxButton
        >
        <XtxButton type="plain" size="small">查看评价</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已取消 -->
    </div>
    <OrderCancel ref="orderCancelItem"></OrderCancel>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import XtxButton from '@/components/library/xtx-button.vue'
import { orderStatus } from '@/api/constants'
import OrderCancel from './order-cancel.vue'
import { useRouter } from 'vue-router'
import Message from '@/components/library/Message'
import confirmBox from '@/components/library/Confirm'
import { consignOrder, deleteOrder, findOrderDetail } from '@/api/order'
const props = defineProps({
  order: {
    type: Object,
    default: () => {},
  },
})
const router = useRouter()
const orderCancelItem = ref('')

// 取消订单
const cancelOrder = () => {
  orderCancelItem.value.open(props.order)
  setTimeout(() => {
    router.push('/member/order')
  }, 2000)
}
// 确认订单
const confirmOrder = async () => {
  try {
    await confirmBox({ text: '确认收货吗？' })
    await deleteOrder(props.order.id)
    Message({ type: 'success', text: '确认收货成功' })
    router.push('/member/order')
  } catch (error) {}
}
// 模拟发货
const consignmentOrder = async (id) => {
  try {
    await confirmBox({ text: '确认发货吗？' })
    await consignOrder(id)
    Message({ type: 'success', text: '模拟发货成功' })
    router.push('/member/order')
  } catch (error) {}
}
</script>
<style scoped lang="less">
@media screen and (max-width: 768px) {
  .detail-action {
    flex-direction: column;
  }
}
.detail-action {
  padding-top: 5px;
  margin-bottom: 20px;
  min-height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    // text-align: right;
    // margin-right: 100px;
    .xtx-button {
      margin: 5px;
    }
  }
}
</style>
