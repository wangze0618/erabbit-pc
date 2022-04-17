<template>
  <div class="xtx-pagination">
    <!-- 当页码=1时，禁用按钮 -->
    <a href="javascript:;" @click="changePager(1)">首页</a>
    <a href="javascript:;" v-if="myCurrentPage == 1" class="disabled">上一页</a>
    <a href="javascript:;" v-else @click="changePager(myCurrentPage - 1)"
      >上一页</a
    >
    <span v-if="pager.start > 1">...</span>
    <a
      href="javascript:;"
      v-for="i in pager.btnArr"
      :key="i"
      :class="{ active: i === myCurrentPage }"
      @click="changePager((myCurrentPage = i))"
      >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      href="javascript:;"
      v-if="myCurrentPage < pager.pageCount"
      @click="changePager(myCurrentPage + 1)"
      >下一页</a
    >
    <a href="javascript:;" v-else class="disabled">下一页</a>
    <a
      href="javascript:;"
      @click="changePager((myCurrentPage = pager.pageCount))"
      >尾页</a
    >
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({
  total: {
    type: Number,
    default: 100,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
})
const emit = defineEmits(['current-change'])
// 需要 按钮个数 当前页码 总页数 起始页码 结束页码 按钮数组
// 1.约定的按钮个数 5个
const count = 5
// 2. 当前显示的页码
const myCurrentPage = ref(1)
// 3. 总页数 = 总条数 / 每一页条数
const myTotal = ref(100) // 总条数
const myPageSize = ref(10) // 每一页的条数
// 4. 其他数据（总页数、起始按钮、结束按钮、按钮数组）
const pager = computed(() => {
  // 总页数 10
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
  return { pageCount, btnArr, start, end }
})
// 监听props的变化
watch(
  props,
  () => {
    myTotal.value = props.total
    myPageSize.value = props.pageSize
    myCurrentPage.value = props.currentPage
  },
  { immediate: true }
)

// 切换分页函数
const changePager = (page) => {
  myCurrentPage.value = page
  // 通知父组件
  emit('current-change', page)
}
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
    transition: all 0.2s;
    &:hover {
      color: @xtxColor;
      border-color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      border-color: #e4e4e4;
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
