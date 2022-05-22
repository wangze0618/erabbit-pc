<template>
  <div class="xtx-tabs-panel">
    <slot name="default"></slot>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'xtx-tabs-panel',
  setup(props) {
    props: ({
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
    })
    return {}
  },
}
</script>

<style scoped lang="less"></style>
