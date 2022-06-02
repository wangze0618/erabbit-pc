<template>
  <div class="xtx-steps">
    <div
      class="xtx-steps-item"
      :class="{ active: active > index }"
      v-for="(item, index) in dynamicList"
    >
      <div class="step">
        <span>{{ index + 1 }}</span>
        <div class="title">{{ item.props.title }}</div>
        <div v-if="active > index" class="desc">{{ item.props.desc }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useSlots } from 'vue'
const props = defineProps({
  active: {
    type: Number,
    default: 3,
  },
})
const slot = useSlots()
const list = slot.default()
// 动态数组
const dynamicList = []

list.forEach((item) => {
  if (item.children) {
    item.children.forEach((i) => {
      dynamicList.push(i)
    })
  } else {
    dynamicList.push(item)
  }
})
</script>
<style lang="less">
.xtx-steps {
  display: flex;
  text-align: center;
  margin-bottom: 20px;
  &-item {
    flex: 1;
    &:first-child {
      .step {
        &::before {
          display: none;
        }
      }
    }
    &:last-child {
      .step {
        &::after {
          display: none;
        }
      }
    }
    &.active {
      .step {
        > span {
          border-color: @xtxColor;
          background: @xtxColor;
          color: #fff;
        }
        &::before,
        &::after {
          background: @xtxColor;
        }
      }
      .title {
        color: @xtxColor;
      }
    }
    .step {
      position: relative;
      > span {
        width: calc(0.5vw + 28px);
        height: calc(0.5vw + 28px);
        font-size: calc(0.4vw + 17px);
        border: 2px solid #e4e4e4;
        background: #fff;
        border-radius: 50%;
        line-height: auto;
        color: #ccc;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      &::after,
      &::before {
        content: '';
        position: absolute;
        top: calc(0.3vw + 13px);
        width: 50%;
        height: 2px;
        background: #e4e4e4;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
    .title {
      color: #999;
      padding-top: 12px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      padding-top: 6px;
    }
  }
}
</style>
