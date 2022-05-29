<template>
  <div class="detail-action">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <p>待支付</p>
    </div>
    <div class="info">
      <p>订单编号：1372361846887026690</p>
      <p>下单时间：2021-03-18 01:45:10</p>
    </div>
    <div class="btn">
      <XtxButton type="primary" size="small">评价商品</XtxButton>
      <XtxButton type="plain" size="small">再次购买</XtxButton>
      <XtxButton type="gray" size="small">申请售后</XtxButton>
    </div>
  </div>
</template>
<script setup>
import XtxButton from '@/components/library/xtx-button.vue'
</script>
<style scoped lang="less">
.detail-action {
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
      margin-left: 20px;
    }
  }
}
</style>
