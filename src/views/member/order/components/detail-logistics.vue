<template>
  <div class="detail-logistics" v-if="list">
    <span>{{ list[0].time }}</span>
    <span>{{ list[0].text }}</span>
    <a href="javascript:;" @click="logisticsFn(order)">查看物流</a>
  </div>
  <!-- 查看物流 -->
  <Teleport to="#detail">
    <OrderLogistics ref="LogisticsItem"></OrderLogistics>
  </Teleport>
</template>

<script setup>
import { logisticsOrder } from '@/api/order'
import { onMounted, ref } from 'vue'
import OrderLogistics from './order-logistics.vue'
const props = defineProps({
  order: {
    type: Object,
    default: () => {},
  },
})
// 查看物流
const LogisticsItem = ref('')
const logisticsFn = (data) => {
  LogisticsItem.value.open(data)
}
// 获取数据
const list = ref('')
onMounted(async () => {
  const { result } = await logisticsOrder(props.order.id)
  list.value = result.list
})
</script>

<style scoped lang="less">
@media screen and (max-width: 768px) {
  .detail-logistics {
    width: 100%;
    margin: 0 0 30px 0 !important;
    padding: 0 10px !important;
  }
}

.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 40px 50px 30px;
  border-radius: 8px;
  transition: height 1s linear;
  span {
    color: #999;
  }

  > a {
    margin-right: 5px;
    color: @xtxColor;
    text-align: center;
  }
}
</style>
