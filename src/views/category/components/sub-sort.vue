<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
        >默认排序</a
      >
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
        >最新商品</a
      >
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
        >最高人气</a
      >
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
        >评论最多</a
      >
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod == 'asc',
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod == 'desc',
          }"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox
        @change="changeCheck"
        v-model:modelValue="sortParams.inventory"
        >仅显示有货商品</XtxCheckbox
      >
      <XtxCheckbox
        @change="changeCheck"
        v-model:modelValue="sortParams.onlyDiscount"
        >仅显示特惠商品</XtxCheckbox
      >
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import XtxCheckbox from '@/components/library/xtx-checkbox.vue'

// 1. 根据后台需要的参数定义数据对象
// 2. 根据数据对象，绑定组件（复选框，排序按钮）
// 3. 在操作排序组件的时候，需要反馈给数据对象
// sortField====>publishTime,orderNum,price,evaluateNum
// sortMethod====>asc为正序 desc为倒序
const emit = defineEmits(['sort-change'])

const sortParams = reactive({
  inventory: false,
  onlyDiscount: false,
  sortField: null,
  sortMethod: null,
})
// 改变排序
const changeSort = (sortField) => {
  if (sortField == 'price') {
    if (sortParams.sortMethod == null) {
      sortParams.sortMethod = 'desc'
    } else {
      sortParams.sortMethod = sortParams.sortMethod == 'asc' ? 'desc' : 'asc'
    }
  }
  sortParams.sortField = sortField
  emit('sort-change', sortParams)
}

const changeCheck = () => {
  emit('sort-change', sortParams)
}
</script>
<style scoped lang="less">
.sub-sort {
  min-height: 80px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    flex-wrap: wrap;

    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
