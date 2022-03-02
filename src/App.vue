<template>
  <div class="container">
    <!-- A模块 -->
    {{ $store.state.moduleA.username }}
    {{ $store.getters.newName }}
    <hr />
    <!-- B模块 namespaced:true -->
    {{ $store.state.moduleB.username }}
    {{ $store.getters['moduleB/newName'] }}
    <button
      @click="mutationsFn"
    >mutationsFn</button>
    <button @click="actionsFn">actionsFn</button>
  </div>
</template>
 
<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    // 调用Vuex子模块的 mutations actions
    const store = useStore()
    const mutationsFn = () => {
      store.commit('moduleB/updateName')
    }
    const actionsFn = () => {
      store.dispatch('moduleB/updateName')
    }
    return { mutationsFn, actionsFn }
  }
}
</script>
 
<style scoped lang = "scss">
</style>