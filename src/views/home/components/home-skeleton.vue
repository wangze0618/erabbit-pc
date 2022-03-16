<template>
  <div class="home-skeleton container">
    <div
      class="item col-sm-6 col-md-3"
      v-for="i in 4"
      :key="i"
      :style="{ backgroundColor: bg }"
    >
      <XtxSkeleton bg="#e4e4e4" width="100%" height="300px" animated />
      <XtxSkeleton bg="#e4e4e4" width="160px" height="24px" animated />
      <XtxSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSkeleton',
  props: {
    bg: {
      type: String,
      default: '#fff',
    },
  },
}
</script>

<style scoped lang="less">
.home-skeleton {
  //   width: 100%;
  //   height: 100%;
  display: flex;
  flex: 1;
  flex-wrap: wrap;

  justify-content: space-between;
  .item {
    height: 100%;
    flex: 1;
    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
@media screen and (max-width: 1201px) {
  .home-skeleton {
    width: 100%;
    height: 130px !important;
    display: flex;
    flex: 1;

    // justify-content: space-between;
    .item {
      flex: 1;
      .xtx-skeleton ~ .xtx-skeleton {
        display: block;
        margin: 10px auto 0;
      }
    }
  }
}
</style>
