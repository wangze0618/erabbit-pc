<template>
  <div class="xtx-checkbox" @click="checkedChange()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- 判断插槽是否有值来条件渲染span -->
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// 定义参数
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
// 定义emit
const emit = defineEmits(['change'])
// 更改复选框状态
const checked = ref(false)
const checkedChange = () => {
  checked.value = !checked.value
  // 通知父组件
  // 让组件支持change事件
  emit('change', checked.value)
}

// 侦听参数变化，设置checked数据
watch(
  () => props.modelValue,
  () => {
    checked.value = props.modelValue
  },
  { immediate: true }
)
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
