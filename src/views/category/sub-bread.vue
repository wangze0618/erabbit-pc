<template>
  <!-- 面包屑 -->
  <XtxBread>
    <XtxBreadItem :to="{ path: '/' }">首页</XtxBreadItem>
    <transition-group name="fade-right" mode="out-in">
      <XtxBreadItem
        v-if="category.top"
        :key="category.top.id"
        :to="`/category/${category.top.id}`"
        >{{ category.top.name }}</XtxBreadItem
      >
      <i class="iconfont icon-angle-right" v-if="category.sub"></i>
      <XtxBreadItem v-if="category.sub" :key="category.sub.id"
        >{{ category.sub.name }}
      </XtxBreadItem>
    </transition-group>
  </XtxBread>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import XtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
const route = useRoute()
const store = useStore()

const category = computed(() => {
  const cate = {}
  store.state.category.list.forEach((top) => {
    if (top.children) {
      const sub = top.children.find((sub) => sub.id === route.params.id)
      if (sub) {
        cate.top = { id: top.id, name: top.name }
        cate.sub = { id: sub.id, name: sub.name }
      }
    }
  })
  return cate
})
</script>

<style scoped lang="less"></style>
