<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SubBread from './sub-bread.vue'
import SubFilter from './sub-filter.vue'
</script>

<style scoped lang="less"></style>
