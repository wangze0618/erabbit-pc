<template>
  <i
    v-for="item in props.star"
    :key="item + 's'"
    class="iconfont icon-wjx01"
  ></i>
  <i
    v-for="item in 5 - props.star"
    :key="item + 'k'"
    class="iconfont icon-wjx02"
  ></i>
</template>

<script setup>
const props = defineProps({
  star: {
    type: Number,
    default: 3,
  },
})
</script>

<style scoped lang="less">
.iconfont {
  color: #ff9240;
  padding-right: 3px;
}
</style>
