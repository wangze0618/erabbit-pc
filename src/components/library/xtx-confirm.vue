<template>
  <div class="xtx-confirm dark" @mousewheel.prevent @touchmove.prevent>
    <transition name="wrap">
      <div v-if="visible" class="wrapper">
        <div class="header">
          <h3>{{ props.title }}</h3>
          <a
            @click="cancel()"
            href="JavaScript:;"
            class="iconfont icon-close-new"
          ></a>
        </div>
        <div class="body">
          <i class="iconfont icon-warning"></i>
          <span>{{ props.text }}</span>
        </div>
        <div class="footer">
          <XtxButton @click="cancel()" size="mini" type="gray">取消</XtxButton>
          <XtxButton @click="confirm()" size="mini" type="primary"
            >确认</XtxButton
          >
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import XtxButton from './xtx-button.vue'
import confirmBox from '@/components/library/Confirm'
const props = defineProps({
  title: {
    type: String,
    default: '温馨提示',
  },
  text: {
    type: String,
    default: '',
  },
  cancelCallback: {
    type: Function,
  },
  confirmCallback: {
    type: Function,
  },
})
// 控制是否显示
const visible = ref(false)

onMounted(() => {
  visible.value = true
})
// 确认按钮
const confirm = () => {
  props.confirmCallback()
  // visible.value = false
}
// 取消按钮
const cancel = () => {
  props.cancelCallback()
  // visible.value = false
}
</script>

<style lang="less">
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

.wrap-enter-active {
  animation: bounce-in 0.5s;
}
.wrap-leave-active {
  animation: bounce-in 0.5s reverse;
}

.wrap-enter-from,
.wrap-leave-to {
  opacity: 1;
}
.dark {
  background: rgba(0, 0, 0, 0.398) !important;
  backdrop-filter: blur(5px);
}
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrapper {
    box-shadow: 0px 10px 20px #686868;
    width: calc(10vw + 200px);
    background: #fff;
    border-radius: 12px;
    position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    .header {
      border-bottom: 1px dashed #dcdcdc;
    }
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: calc(0.4vw + 12px);
      text-align: center;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      .xtx-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
        padding-top: 14px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
