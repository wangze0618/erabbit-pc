<template>
  <XtxDialog title="取消订单" v-model:visible="visible">
    <!-- 组件内容 -->
    <div class="cancel-info">
      <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="btn">
        <a
          @click="curText = item"
          v-for="item in cancelReason"
          :key="item"
          href="javascript:;"
          :class="{ active: curText === item }"
        >
          {{ item }}
        </a>
      </div>
    </div>
    <!-- 按钮操作 -->
    <template #footer>
      <XtxButton type="gray" @click="cancel()" style="margin-right: 20px"
        >取消</XtxButton
      >
      <XtxButton @click="submit()" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script setup>
import { ref } from 'vue'
import XtxDialog from '@/components/library/xtx-dialog.vue'
import { cancelReason } from '@/api/constants'
import XtxButton from '@/components/library/xtx-button.vue'
import { cancelOrder } from '@/api/order'
import Message from '@/components/library/Message'

const props = defineProps({
  order: {
    type: Object,
    default: () => {},
  },
})

const visible = ref(false)
// 选中的文字
const curText = ref('')

// 取消
const cancel = () => {
  visible.value = false
}
// 提交
const submit = async () => {
  if (!curText.value) {
    Message({ type: 'warn', text: '请选择取消订单的原因' })
  } else {
    await cancelOrder(props.order.value.id, curText.value)
    Message({ type: 'success', text: '取消订单成功' })
    visible.value = false
  }
}
// 打开对话框
const open = () => {
  visible.value = true
}
defineExpose({
  open,
})
</script>

<style scoped lang="less">
.xtx-dialog :deep(.wrapper) {
  width: 620px;
}

.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;

    &.tip {
      color: #999;
    }
  }

  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;

      &:nth-child(2n) {
        margin-right: 0;
      }

      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
