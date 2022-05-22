<template>
  <div class="member-detail">
    <h1>Member-Detail</h1>
    <h2>{{ route.params.id }}</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped lang="less"></style>
