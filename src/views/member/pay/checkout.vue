<template>
  <XtxLoading v-if="!order" />
  <div v-else class="xtx-pay-checkout-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <!-- 收货地址组件 -->
          <CheckoutAddress :list="order.userAddresses" />
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.goods" :key="item.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="item.picture" alt="" />
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p>{{ item.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ item.price }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ item.totalPrice }}</td>
                <td>&yen;{{ item.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a
            @click="delivery('oneTime')"
            :class="[deliveryTime == 'oneTime' ? 'active' : '']"
            class="my-btn"
            href="javascript:;"
            >不限送货时间：周一至周日</a
          >
          <a
            @click="delivery('secTime')"
            :class="[deliveryTime == 'secTime' ? 'active' : '']"
            class="my-btn"
            href="javascript:;"
            >工作日送货：周一至周五</a
          >
          <a
            @click="delivery('thrTime')"
            :class="[deliveryTime == 'thrTime' ? 'active' : '']"
            class="my-btn"
            href="javascript:;"
            >双休日、假日送货：周六至周日</a
          >
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a
            @click="pay('online')"
            :class="[payMethod == 'online' ? 'active' : '']"
            class="my-btn"
            href="javascript:;"
            >在线支付</a
          >
          <a
            @click="pay('payTo')"
            :class="[payMethod == 'payTo' ? 'active' : '']"
            class="my-btn"
            href="javascript:;"
            >货到付款</a
          >
          <transition mode="out-in" name="fade">
            <span v-if="payMethod == 'payTo'" style="color: #999"
              >货到付款需付5元手续费</span
            >
          </transition>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ order.summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ order.summary.totalPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ order.summary.postFee }}</dd>
            </dl>
            <dl v-if="order.summary.discountPrice">
              <dt>打折价：</dt>
              <dd>-¥{{ order.summary.discountPrice }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">¥{{ order.summary.totalPayPrice }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton type="primary">提交订单</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import XtxButton from '@/components/library/xtx-button.vue'
import XtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
import CheckoutAddress from './components/checkout-address.vue'
import { createOrder } from '@/api/order'
import XtxLoading from '@/components/library/xtx-loading.vue'

// 结算生成订单-获取订单信息
const order = ref(null)
onMounted(async () => {
  const { result } = await createOrder()
  order.value = result
})

// 配送时间点击事件
const deliveryTime = ref('oneTime')
const delivery = (time) => {
  deliveryTime.value = time
}
// 支付方式点击事件
const payMethod = ref('online')
const pay = (meth) => {
  payMethod.value = meth
}
</script>

<style scoped lang="less">
.fade-enter-active {
  transition: all 0.5s;
  padding-top: 20px;
}

.fade-leave-active {
  transition: all 0.5s;
  padding-top: 20px;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
      a {
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
