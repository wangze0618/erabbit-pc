<template>
  <div class="home-panel">
    <!-- <div class="container"> -->
    <div class="head">
      <!-- 标题和副标题 -->
      <h3>
        {{ title }}<small>{{ subTitle }}</small>
      </h3>

      <!-- 右边 查看更多 -->
      <slot name="right" />
    </div>

    <!-- 默认插槽 面板主要内容 -->
    <slot name="default" />
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'HomePanel',
  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 副标题
    subTitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="less">
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: center;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
