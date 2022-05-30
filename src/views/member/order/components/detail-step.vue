<template>
  <div class="detail-step">
    <XtxSteps v-model:active="active">
      <XtxStepsItem
        v-for="(item, index) in 2"
        :key="index"
        :title="index"
        desc="2021-03-18 02:11:47"
      ></XtxStepsItem>
      <XtxStepsItem title="33" desc="2021-03-18 02:11:47"></XtxStepsItem>
      <XtxStepsItem title="44" desc="2021-03-18 02:11:47"></XtxStepsItem>
      <XtxStepsItem title="55" desc="2021-03-18 02:11:47"></XtxStepsItem>
    </XtxSteps>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import XtxSteps from '@/components/library/xtx-steps.vue'
import XtxStepsItem from '@/components/library/xtx-steps.vue'

// 定义当前激活的步骤
const active = ref(3)
</script>

<style scoped lang="less">
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
