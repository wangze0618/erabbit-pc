<template>
  <div class="home-new container">
    <HomePannel title="人气推荐" ref="target" subTitle="人气爆款 不容错过">
      <!-- <template #right><XtxMore /></template> -->
      <!-- 面板内容 -->
      <Transition name="fade">
        <ul class="goods-list" v-if="list.length">
          <li v-for="item in list" class="col-sm-6 col-md-3" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img :src="item.picture" alt="" />
              <p class="name ellipsis">{{ item.title }}</p>
              <!-- <p class="price">&yen;{{ item.alt }}</p> -->
              <p class="item-alt">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </HomePannel>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import xtxMore from '@/components/library/xtx-more.vue'
import HomePannel from './home-panel.vue'
import { findHot } from '@/api/home'
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeHot',
  setup() {
    // const list = ref([])
    // onMounted(async () => {
    //   const { result } = await findHot()
    //   list.value = result
    // })

    // 获取 新鲜好物 商品列表
    // 数据懒加载
    const { data, target } = useLazyData(findHot)
    return { list: data, target }
  },
  components: { HomePannel, xtxMore, HomeSkeleton },
}
</script>

<style scoped lang="less">
.item-alt {
  font-size: 15px !important;
  color: #7e7e7e;
}
a:hover {
  color: unset;
}
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
