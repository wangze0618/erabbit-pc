<template>
  <div class="xtx-pagination">
    <a href="javascript:;" v-if="myCurrentPage == 1" class="disabled">上一页</a>
    <a href="javascript:;" v-else>上一页</a>
    <span>...</span>
    <a href="javascript:;" class="active">3</a>
    <a href="javascript:;">4</a>
    <a href="javascript:;">5</a>
    <a href="javascript:;">6</a>
    <a href="javascript:;">7</a>
    <span>...</span>
    <a href="javascript:;">下一页</a>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
// 需要 按钮个数 当前页码 总页数 起始页码 结束页码 按钮数组

// 1.约定的按钮个数 5个
const count = 5
// 2. 当前显示的页码
const myCurrentPage = ref(0)
// 3. 总页数 = 总条数 / 每一页条数
const myTotal = ref(100) // 总条数
const myPageSize = ref(10) // 每一页的条数
// 4. 其他数据（总页数、起始按钮、结束按钮、按钮数组）
const pager = computed(() => {
  // 总页数
  const pageCount = Math.ceil(myTotal.value / myPageSize.value)
  const offset = Math.floor(count / 2)
  let start = myCurrentPage.value - offset
  let end = start + count - 1

  // 如果start<1
  if (start < 1) {
    start = 1
    end = start + count - 1 > pageCount ? pageCount : start + count - 1
  }
  // 如果end>pageCount
  if (end > pageCount) {
    end = pageCount
    start = end - count + 1 < 1 ? 1 : end - count + 1
  }
  const btnArr = []
  for (let i = start; i <= end; i++) {
    btnArr.push(i)
  }
  return { pageCount, btnArr }
})
console.log(pager.value.btnArr)
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
