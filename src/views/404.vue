<template>
  <div class="main">
    <img src="@/assets/images/404.png" alt="" />
    <h1>404! 页面未找到！</h1>
    <button @click="$router.push('/')">回到首页</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped lang="less">
@fontSize: calc(0.6vw + 20px);
.main {
  text-align: center;
  img {
    width: auto;
    max-width: 400px;
    margin-top: 20px;
  }
  h1 {
    font-size: calc(@fontSize + 10px);
    margin-top: 20px;
    color: @xtxColor;
  }
  button {
    margin-top: 20px;
    width: 100px;
    height: 40px;
    border: none;
    background-color: @xtxColor;
    color: #fff;
    border-radius: 8px;
    font-size: 16px;
    border-bottom: 5px solid #1ba889;
    transition: all 0.1s;
    &:active {
      transform: translate(0, 3px);
      border-bottom: 2px solid;
    }
  }
}
</style>
