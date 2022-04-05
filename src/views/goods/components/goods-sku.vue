<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected }"
            v-if="val.picture"
            :src="val.picture"
            :alt="val.name"
            :title="val.name"
            @click="changeSku(item, val)"
          />
          <span
            :class="{ selected: val.selected }"
            @click="changeSku(item, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<script setup>
// 定义props
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({}),
  },
})
// 实现取消/选中功能
const changeSku = (item, val) => {
  if (val.selected) {
    val.selected = false
  } else {
    item.values.forEach((val) => {
      val.selected = false
    })
    val.selected = true
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin: 3px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  max-width: 500px;
  padding-left: 10px;
  padding-top: 20px;
  background-color: #f5f5f5;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
