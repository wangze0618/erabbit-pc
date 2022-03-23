<template>
  <div class="xtx-backtop">
    <router-link :to="route.path">
      <i class="iconfont icon-fanhuidingbu"></i>
      <span>返回顶部</span>
    </router-link>
  </div>
</template>

<script setup>
import { useElementVisibility } from '@vueuse/core'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  target: {
    type: Object,
  },
})
const route = useRoute()
// console.log(top.value)
const targetIsVisible = useElementVisibility(props.target)
console.log(targetIsVisible.value)
</script>

<style scoped lang="less">
.xtx-backtop {
  position: fixed;
  right: 0px;
  bottom: 500px;
  z-index: 99;
  width: 80px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  color: #fff;
  a {
    color: inherit;
    display: inline-block;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    i {
      font-size: 40px;
    }
  }
}
</style>
