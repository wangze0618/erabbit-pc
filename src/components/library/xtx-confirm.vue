<template>
  <transition name="wrap">
    <template v-if="visible">
      <div class="xtx-confirm" @mousewheel.prevent @touchmove.prevent>
        <div class="wrapper">
          <div class="header">
            <h3>{{ props.title }}</h3>
            <a
              @click="visible = false"
              href="JavaScript:;"
              class="iconfont icon-close-new"
            ></a>
          </div>
          <div class="body">
            <i class="iconfont icon-warning"></i>
            <span>{{ props.text }}</span>
          </div>
          <div class="footer">
            <XtxButton @click="cancel()" size="mini" type="gray"
              >取消</XtxButton
            >
            <XtxButton @click="confirm()" size="mini" type="primary"
              >确认</XtxButton
            >
          </div>
        </div>
      </div>
    </template>
  </transition>
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
})
confirmBox({ title: 'aaa' })
// 控制是否显示
const visible = ref(false)

onMounted(() => {
  visible.value = true
})
// 确认按钮
const confirm = () => {
  visible.value = false
}
// 取消按钮
const cancel = () => {
  visible.value = false
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

.xtx-confirm {
  background: rgba(0, 0, 0, 0.398) !important;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  backdrop-filter: blur(5px);
  .wrapper {
    // box-shadow: 2px 3px 8px #999;
    width: calc(10vw + 200px);
    background: #fff;
    border-radius: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
      font-size: calc(0.4vw + 15px);
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
