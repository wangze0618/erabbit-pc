<template>
  <div class="home-new container">
    <HomePannel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <template #right><XtxMore /></template>
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for="item in goods" class="col-sm-6 col-md-3" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePannel>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import xtxMore from '@/components/library/xtx-more.vue'
import HomePannel from './home-pannel.vue'
import { findNew } from '@/api/home'
export default {
  name: 'HomeNew',
  setup() {
    // 获取 新鲜好物 商品列表
    const goods = ref([])
    onMounted(async () => {
      const { result } = await findNew()
      goods.value = result
    })

    return { goods }
  },
  components: { HomePannel, xtxMore },
}
</script>

<style scoped lang="less">
.home-new {
  padding: 0;
}
.goods-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  min-height: 320px;
  li {
    padding: 0;
    padding-bottom: 5px;
    background: #f0f9f4;
    &:nth-child(4) {
      margin: 0;
    }
    .hoverShadow();
    img {
      width: 100%;
    }
    p {
      font-size: 18px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
@media screen and (max-width: 575px) {
  .goods-list {
    li {
      min-width: 230px;
      flex: 1;
    }
  }
}
@media screen and (min-width: 992px) {
  .goods-list {
    li {
      width: 230px;
      margin-right: 6px;
      flex: 1;
    }
  }
}
</style>
