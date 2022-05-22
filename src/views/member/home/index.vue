<template>
  <div class="member-home">
    <!-- 概览 -->
    <HomeOverview></HomeOverview>
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <template #default>
        <div class="collect">
          <GoodsItem
            :goods="good"
            v-for="good in goodsList"
            :key="good.id"
          ></GoodsItem>
        </div>
      </template>
    </HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹">
      <div class="history">
        <GoodsItem
          :goods="good"
          v-for="good in goodsList"
          :key="good.id"
        ></GoodsItem>
      </div>
    </HomePanel>
    <!-- 猜你喜欢 -->

    <!-- <GoodsRelevant></GoodsRelevant> -->
  </div>
</template>
<script setup>
import HomeOverview from './components/home-overview.vue'
import HomePanel from './components/home-panel.vue'
import { ref, onBeforeMount } from 'vue'
import GoodsItem from '@/views/category/components/goods-item.vue'
import { getCollect } from '@/api/member'

// const goods = {
//   id: '1',
//   name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
//   picture:
//     'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
//   desc: '清汤鲜香 红汤劲爽',
//   price: '159.00',
// }

const goodsList = ref([])
onBeforeMount(async () => {
  const { result } = await getCollect({
    page: 1,
    pageSize: 4,
    collectType: 1,
  })
  goodsList.value = result.items
})
</script>

<style scoped lang="less">
.member-home {
}
.collect,
.history {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}
</style>
