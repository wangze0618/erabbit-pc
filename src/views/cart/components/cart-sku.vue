<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle()">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <XtxLoading v-if="loading"></XtxLoading>
      <GoodsSku
        @change="changeSku"
        :skuId="skuId"
        :goods="goods"
        v-else
      ></GoodsSku>
      <XtxButton @click="confirm" v-if="goods" type="primary" size="mini"
        >确认</XtxButton
      >
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { getGoodsSku } from '@/api/cart'
import GoodsSku from '@/views/goods/components/goods-sku.vue'
import XtxLoading from '@/components/library/xtx-loading.vue'
import XtxButton from '@/components/library/xtx-button.vue'

const emit = defineEmits(['change'])
const props = defineProps({
  attrsText: {
    type: String,
    default: '',
  },
  skuId: {
    type: [String, Number],
    default: '',
  },
})

// 是否加载中
const loading = ref(false)

// 商品信息
const goods = ref(null)

// 控制是否打开
const visible = ref(false)

// 打开
const open = async () => {
  loading.value = true
  visible.value = true
  // 获取商品数据
  const { result } = await getGoodsSku(props.skuId)
  goods.value = result
  loading.value = false
}
// 关闭
const close = () => {
  visible.value = false
}
const toggle = () => {
  visible.value ? close() : open()
}
// 点击其他地方关闭
const target = ref(null)
onClickOutside(target, () => close())
// 监听sku改变的函数
const currSku = ref(null)
const changeSku = (sku) => {
  currSku.value = sku
}

// 点击确认将更改后的sku信息提交给父组件
const confirm = () => {
  if (
    currSku.value &&
    currSku.value.skuId &&
    currSku.value.skuId !== props.skuId
  ) {
    emit('change', currSku)
    // close()
  }
}
</script>

<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -7px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    // .loading {
    //   height: 224px;
    //   background: url(../../../assets/images/loading.gif) no-repeat center;
    // }
  }
}
</style>
