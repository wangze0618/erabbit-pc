<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>支付订单</XtxBreadItem>
      </XtxBread>
      <!-- 付款信息 -->
      <div class="pay-info" v-if="order">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p v-if="order.countdown > -1">
            支付还剩 <span>{{ timeText }}</span
            >, 超时后将取消订单
          </p>
          <p v-else>订单已超时</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{ order.payMoney }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" title="微信支付" href="javascript:;"></a>
          <a
            class="btn alipay"
            title="支付宝支付"
            :href="payUrl"
            target="_blank"
          ></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import XtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findOrderDetail } from '@/api/order'
import { usePayTime } from '@/hooks/index'
import { baseURL } from '@/utils/request'
// 获取订单详情
const route = useRoute()
const router = useRouter()
const order = ref('null')

// 倒计时逻辑
// const timer = ref(1800)
// let timeText = ref('')

onMounted(async () => {
  const { result } = await findOrderDetail(route.query.orderId)
  order.value = result
  // timer.value = result.countdown
  // timeText.value = dayjs(timer.value).format('mm分ss秒')
  start(result.countdown)
})

const { start, timeText } = usePayTime()

// let timeOut
// if (timer.value) {
//   timeOut = setInterval(() => {
//     timer.value--
//     timeText.value = dayjs.unix(timer.value).format('mm分ss秒')
//     console.log(timer.value)
//     if (timer.value < 0) {
//       clearTimeout(timeOut)
//     }
//   }, 1000)
// }
// onUnmounted(() => {
//   clearTimeout(timeOut)
// })

const redircet = encodeURIComponent(`${window.location.host}/#/pay/callback`)
// 支付地址 后台服务基准地址+支付页面地址+订单ID+回跳地址
const payUrl = `${baseURL}/pay/aliPay?orderId=${route.query.orderId}&redirect=${redircet}`
console.log(payUrl)
</script>
<style scoped lang="less">
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 40px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @xtxColor;
    }
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
        no-repeat center / contain;
    }
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
        no-repeat center / contain;
    }
  }
}
</style>
