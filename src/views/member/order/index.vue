<template>
  <!-- <XtxLoading v-if="orderList.length == 0"></XtxLoading> -->
  <div class="member-order">
    <XtxTabs @tabClick="changeActive($event)" v-model:active="activeName">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :label="item.label"
        :name="item.name"
      ></XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <XtxLoading v-if="showLoading"></XtxLoading>
      <div class="none" v-if="showLoading == false && orderList.length === 0">
        <div class="none-body">
          <img src="@/assets/images/none.png" alt="none" title="暂无" />
          <span style="color: #999">暂无数据</span>
        </div>
      </div>
      <OrderItem
        :order="item"
        v-for="(item, index) in orderList"
        :key="item.id"
        @on-cancel="cancelOrder($event)"
        @on-delete="deleteOrderFn($event)"
        @on-confirm="confirmOrderFn($event)"
        @on-logistics="logisticsFn($event)"
      ></OrderItem>
    </div>
    <!-- 分页组件 -->
    <XtxPagination
      v-if="orderList.length !== 0"
      :total="total"
      :page-size="reqParams.pageSize"
      :current-page="reqParams.page"
      @current-change="pageChange($event)"
    ></XtxPagination>
    <!-- 取消订单原因组件 -->
    <OrderCancel ref="cancelOrderItem"></OrderCancel>
    <!-- 查看订单组件 -->
    <OrderLogistics ref="LogisticsItem"></OrderLogistics>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import XtxTabs from '@/components/library/xtx-tabs.vue'
import XtxTabsPanel from '@/components/library/xtx-tabs-panel.vue'
import XtxCarousel from '@/components/library/xtx-carousel.vue'
import XtxLoading from '@/components/library/xtx-loading.vue'
import { orderStatus } from '@/api/constants'
import XtxButton from '@/components/library/xtx-button.vue'
import XtxPagination from '@/components/library/xtx-pagination.vue'
import OrderItem from './components/order-item.vue'
import { findOrderList, deleteOrder } from '@/api/order'
import OrderCancel from './components/order-cancel.vue'
import confirmBox from '@/components/library/Confirm'
import Message from '@/components/library/Message'
import OrderLogistics from './components/order-logistics.vue'

export default {
  name: 'MemberOrder',
  setup(props) {
    // 显示框部分

    // 取消订单
    const order = reactive({})
    const cancelOrderItem = ref('')
    const cancelOrder = (data) => {
      order.value = data
      cancelOrderItem.value.open(data)
    }

    // 删除订单
    const deleteOrderFn = async (data) => {
      try {
        await confirmBox({ text: '确认删除该订单吗？' })
        await deleteOrder(data.id)
        Message({ type: 'success', text: '删除成功' })
        getList()
      } catch (error) {}
    }

    // 确认收货
    const confirmOrderFn = async (data) => {
      try {
        await confirmBox({ text: '确认收货吗？' })
        await deleteOrder(data.id)
        Message({ type: 'success', text: '确认收货成功' })
        getList()
      } catch (error) {}
    }

    // 查看物流
    const LogisticsItem = ref('')
    const logisticsFn = (data) => {
      LogisticsItem.value.open(data)
    }

    // 获取数据
    const orderList = ref([])
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      orderState: 0,
    })
    const showLoading = ref(true)
    const activeName = ref('all')
    const activeIndex = ref(0)

    const changeActive = ({ index, name }) => {
      activeName.value = name
      reqParams.page = 1
      reqParams.orderState = index
    }

    // 分页切换
    const total = ref(0)
    const pageChange = (page) => {
      reqParams.page = page
    }

    // 获取数据
    const getList = () => {
      findOrderList(reqParams).then(({ result }) => {
        orderList.value = result.items
        showLoading.value = false
        total.value = result.counts
      })
    }
    // tab切换监听
    watch(
      () => reqParams,
      () => {
        getList()
      },
      { immediate: true, deep: true }
    )
    return {
      confirmOrderFn,
      activeName,
      orderStatus,
      orderList,
      changeActive,
      reqParams,
      activeIndex,
      showLoading,
      total,
      pageChange,
      cancelOrder,
      order,
      cancelOrderItem,
      deleteOrderFn,
      getList,
      logisticsFn,
      LogisticsItem,
    }
  },
  components: {
    XtxTabsPanel,
    XtxTabs,
    XtxCarousel,
    XtxTabsPanel,
    XtxButton,
    XtxPagination,
    OrderItem,
    XtxLoading,
    OrderCancel,
    OrderLogistics,
  },
}
</script>

<style scoped lang="less">
.none-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // margin-top: 20px;
  padding: 20px;
}
.member-order {
  height: 100%;
  background-color: #fff;
}
.order-list {
  background: #fff;
  padding: 10px;
}
// .order-item {
//   margin-bottom: 20px;
//   border: 1px solid #f5f5f5;
//   .head {
//     height: 50px;
//     line-height: 50px;
//     background: #f5f5f5;
//     padding: 0 20px;
//     overflow: hidden;
//     span {
//       margin-right: 20px;
//       &.down-time {
//         margin-right: 0;
//         float: right;
//         i {
//           vertical-align: middle;
//           margin-right: 3px;
//         }
//         b {
//           vertical-align: middle;
//           font-weight: normal;
//         }
//       }
//     }
//     .del {
//       margin-right: 0;
//       float: right;
//       color: #999;
//     }
//   }
//   .body {
//     display: flex;
//     justify-content: space-between;
//     // align-items: stretch;
//     align-items: center;
//     .column {
//       border-left: 1px solid #f5f5f5;
//       border-right: 1px solid #f5f5f5;
//       text-align: center;
//       padding: 10px;
//       > p {
//         padding-top: 10px;
//       }
//       &:first-child {
//         border-left: none;
//       }
//       &.goods {
//         // flex: 1;
//         padding: 0;
//         align-self: center;
//         ul {
//           li {
//             border-bottom: 1px solid #f5f5f5;
//             padding: 10px;
//             display: flex;
//             &:last-child {
//               border-bottom: none;
//             }
//             .image {
//               width: 70px;
//               height: 70px;
//               border: 1px solid #f5f5f5;
//             }
//             .info {
//               width: 180px;
//               text-align: left;
//               padding: 0 10px;
//               p {
//                 margin-bottom: 5px;
//                 &.name {
//                   height: 38px;
//                 }
//                 &.attr {
//                   color: #999;
//                   font-size: 12px;
//                   span {
//                     margin-right: 5px;
//                   }
//                 }
//               }
//             }
//             .price {
//               // width: 100px;
//             }
//             .count {
//               width: 30px;
//             }
//           }
//         }
//       }
//       &.state {
//         // width: 120px;
//         .green {
//           color: @xtxColor;
//         }
//       }
//       &.amount {
//         // width: 200px;
//         .red {
//           color: @priceColor;
//         }
//       }
//       &.action {
//         // width: 140px;
//         a {
//           display: block;
//           &:hover {
//             color: @xtxColor;
//           }
//         }
//       }
//     }
//   }
// }
</style>
