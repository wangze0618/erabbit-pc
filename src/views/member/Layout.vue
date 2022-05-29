<template>
  <div class="container">
    <AppMemberAside />
    <article class="article">
      <RouterView />
    </article>
  </div>
</template>
<script setup>
import AppMemberAside from '@/components/app-member-aside.vue'
</script>
<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  overflow-x: auto;
  .article {
    // width: 1000px;
    flex: 1;
  }
}
</style>
