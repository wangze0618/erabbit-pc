<template>
  <div class="member-order">
    <XtxTabs v-model:active="activeName">
      <XtxTabsPanel label="选项卡1" name="first">ss</XtxTabsPanel>
      <XtxTabsPanel
        v-for="i in 3"
        :key="i"
        :label="`tabs${i}`"
        :name="`name${i}`"
        >sh</XtxTabsPanel
      >
    </XtxTabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import XtxTabs from '@/components/library/xtx-tabs.vue'
import XtxTabsPanel from '@/components/library/xtx-tabs-panel.vue'

const activeName = ref('first')
</script>

<style scoped lang="less"></style>
