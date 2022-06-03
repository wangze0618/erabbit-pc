<template>
  <div class="d-none d-sm-block">
    <transition name="show">
      <div class="xtx-backtop" v-if="isShowBack" @click="backTo">
        <i class="iconfont icon-backtop"></i>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const top = ref(0)
const scrollTop = () => {
  top.value = document.documentElement.scrollTop
}
onMounted(() => {
  window.document.addEventListener('scroll', scrollTop, false)
})

const isShowBack = computed(() => {
  if (top.value >= 100) {
    return true
  } else {
    return false
  }
})

const backTo = () => {
  document.documentElement.scrollTop = 0
}
</script>

<style scoped lang="less">
.show-enter-active,
.show-leave-active {
  transition: opacity 0.5s ease;
}

.show-enter-from,
.show-leave-to {
  opacity: 0;
}
.xtx-backtop {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 2.604vw;
  bottom: 100px;
  z-index: 99;
  width: 50px;
  height: 50px;
  background-color: rgb(143, 143, 143);
  backdrop-filter: blur(5px);
  border-radius: 25px;
  color: #fff;
  i {
    font-size: 20px;
  }
}
</style>
