<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <template v-if="$store.getters['cart/validList'].length == 0">
          <CartNone></CartNone>
        </template>
        <table v-else>
          <thead>
            <tr>
              <th width="120">
                <XtxCheckbox
                  :modelValue="$store.getters['cart/isCheckAll']"
                  @change="checkAll($event)"
                  >全选</XtxCheckbox
                >
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody class="validGoods">
            <tr
              v-for="goods in $store.getters['cart/validList']"
              :key="goods.skuId"
            >
              <td>
                <XtxCheckbox
                  :modelValue="goods.selected"
                  @change="($event) => checkOne(goods.skuId, $event)"
                />
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`"
                    ><img :src="goods.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ goods.name }}
                    </p>
                    <!-- 选择规格组件 -->
                    <CartSku
                      @change="updateCartSku($event, goods.skuId)"
                      :skuId="goods.skuId"
                      :attrsText="goods.attrsText"
                    ></CartSku>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
                <p v-if="goods.price - goods.nowPrice > 0">
                  比加入时降价
                  <span class="red"
                    >&yen;{{ goods.price - goods.nowPrice }}</span
                  >
                </p>
              </td>
              <td class="tc">
                <XtxNumberbox
                  @change="updateCount($event, goods.skuId)"
                  :max="goods.stock"
                  :count="goods.count"
                />
              </td>
              <td class="tc">
                <p class="f16 red">
                  &yen;{{
                    Math.round(goods.nowPrice * 100 * goods.count) / 100
                  }}
                </p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p>
                  <a
                    @click="deleteCart(goods.skuId)"
                    class="green"
                    href="javascript:;"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr
              v-for="goods in $store.getters['cart/invalidList']"
              :key="goods.id"
            >
              <td><XtxCheckbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`"
                    ><img :src="goods.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ goods.name }}
                    </p>
                    <p class="attr">{{ goods.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
              </td>
              <td class="tc">{{ goods.count }}</td>
              <td class="tc">
                <p>
                  &yen;{{
                    Math.round(goods.nowPrice * 100 * goods.count) / 100
                  }}
                </p>
              </td>
              <td class="tc">
                <p>
                  <a
                    @click="deleteCart(goods.skuId)"
                    class="green"
                    href="javascript:;"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action" v-if="$store.getters['cart/validList'].length !== 0">
        <div class="batch">
          <XtxCheckbox
            :modelValue="$store.getters['cart/isCheckAll']"
            @change="checkAll($event)"
            >全选</XtxCheckbox
          >
          <a @click="batchDeleteCart()" href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a @click="batchDeleteInvalidCart()" href="javascript:;"
            >清空失效商品</a
          >
        </div>
        <div class="total">
          共 {{ $store.getters['cart/validTotal'] }} 件商品，已选择
          {{ $store.getters['cart/selectedTotal'] }} 件，商品合计：
          <span class="red">￥{{ $store.getters['cart/selectedAmount'] }}</span>
          <XtxButton @click="checkOut()" type="primary">下单结算</XtxButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodsRelevant />
    </div>
  </div>
</template>
<script setup>
import GoodsRelevant from '../goods/components/goods-relevant.vue'
import XtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
import XtxCheckbox from '@/components/library/xtx-checkbox.vue'
import XtxNumberbox from '@/components/library/xtx-numberbox.vue'
import XtxButton from '@/components/library/xtx-button.vue'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
import CartNone from './components/cart-none.vue'
import CartSku from './components/cart-sku.vue'
import confirmBox from '@/components/library/Confirm'
import { useRouter } from 'vue-router'
const store = useStore()

const checkOne = (skuId, selected) => {
  store.dispatch('cart/updateCart', { skuId, selected })
}

const checkAll = (selected) => {
  store.dispatch('cart/CheckAllCart', selected)
}

const deleteCart = async (skuId) => {
  try {
    await confirmBox({ text: '确认删除商品？' })
    store.dispatch('cart/deleteCart', skuId)
    Message({ type: 'success', text: '删除成功' })
  } catch (error) {
    // Message({ type: 'error', text: '删除失败' })
  }
}
// 下单结算
const router = useRouter()
const checkOut = async () => {
  // 1. 判断是否选中商品，且提示
  // 2. 弹出确认框，提示：下单结算要登录
  // 3. 使用导航守卫，遇见

  if (store.getters['cart/selectedList'].length === 0) {
    Message({ text: '至少选中一件商品！' })
  } else {
    try {
      await confirmBox({ text: '您需要先登录，现在去登录？' })
      router.push('/member/checkout')
    } catch (error) {}
  }
}

// 批量删除商品
const batchDeleteCart = async () => {
  try {
    await confirmBox({ title: '温馨提示', text: '确认批量删除选中的商品？' })
    store.dispatch('cart/batchDeleteCart')
  } catch (error) {}
}
// 批量删除无效商品
const batchDeleteInvalidCart = async () => {
  try {
    await confirmBox({
      title: '温馨提示',
      text: '确认批量删除选中的无效商品？',
    })
    store.dispatch('cart/batchDeleteInvalidCart')
  } catch (error) {}
}
// 改变数量
const updateCount = (count, skuId) => {
  store.dispatch('cart/updateCart', { skuId, count })
}
// 更新sku信息
const updateCartSku = (newSku, oldSkuId) => {
  store.dispatch('cart/updateCartSku', { oldSkuId, newSku })
}
</script>
<style scoped lang="less">
a {
  &:hover {
    color: @xtxColor;
  }
}
tr {
  text-align: center;
}
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
    caret-color: transparent;
  }
}
.validGoods {
  tr {
    text-align: left;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
