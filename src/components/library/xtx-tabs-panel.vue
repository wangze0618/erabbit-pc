<template>
  <div class="xtx-tabs-panel" v-show="name === activeName">
    <slot></slot>
  </div>
</template>

<script>
import { inject, ref } from 'vue'

export default {
  name: 'xtx-tabs-panel',
  props: {
    // 选项卡文字
    label: {
      type: String,
      default: '',
    },
    // 选项卡唯一标识
    name: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props) {
    const activeName = inject('activeName')
    return { activeName }
  },
}
</script>

<style scoped lang="less"></style>
