<template>
  <div class="xtx-dialog" v-if="visible" :class="{ fade: fade == true }">
    <div class="wrapper" :class="{ fade: fade == true }">
      <!-- 标题 -->
      <div class="header">
        <h3>{{ title }}</h3>
        <a
          @click="closeDialog()"
          href="JavaScript:;"
          class="iconfont icon-close-new"
        ></a>
      </div>
      <!-- 主内容 -->
      <div class="body">
        <slot name="default"></slot>
      </div>
      <!-- 底部 -->
      <div class="footer">
        <slot name="footer"> </slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, useAttrs, useSlots, watch } from 'vue'

// 定义props
const props = defineProps({
  title: {
    type: String,
    default: 'Dialog',
  },
  visible: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits()
const fade = ref(false)
watch(
  () => props.visible,
  (newVal) => {
    // 结构和样式同时加上无过度效果，需要些延时。
    setTimeout(() => {
      fade.value = newVal
    }, 0)
  },
  {
    immediate: true,
  }
)
const closeDialog = () => {
  emit('update:visible', false)
}
// console.log(useSlots().default())
// console.log(useSlots().footer())
</script>

<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0, 0, 0, 0);
  &.fade {
    transition: all 0.4s;
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
    // backdrop-filter: blur(2px);
  }
  .wrapper {
    width: 600px;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .body {
      padding: 20px 20px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      padding: 20px 20px;
    }
    .header {
      // position: relative;
      // height: 70px;
      // line-height: 70px;
      // padding: 0 20px;
      // border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      // a {
      //   position: absolute;
      //   right: 25px;
      //   top: 25px;
      //   font-size: 24px;
      //   width: 20px;
      //   height: 20px;
      //   line-height: 20px;
      //   text-align: center;
      //   color: #999;
      //   &:hover {
      //     color: #666;
      //   }
      // }
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px;
      border-bottom: 1px dashed rgb(188, 188, 188);
      a {
        font-size: 23px;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
