<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="i in menuList" @mouseenter="categoryId = i.id" :key="i.id">
        <RouterLink :to="`/category/${i.id}`">{{ i.name }}</RouterLink>
        <!-- 右侧子菜单 -->
        <template v-if="i.children">
          <RouterLink
            :to="`/category/sub/${sub.id}`"
            v-for="sub in i.children"
            :key="sub.id"
            >{{ sub.name }}</RouterLink
          >
        </template>
        <!-- 骨架 -->
        <template v-else>
          <XtxSkeleton
            width="60px"
            height="18px"
            style="margin-right: 5px"
            bg="rgba(255,255,255,0.2)"
          ></XtxSkeleton>
          <XtxSkeleton
            width="50px"
            height="18px"
            bg="rgba(255,255,255,0.2)"
          ></XtxSkeleton>
        </template>
      </li>
    </ul>
    <!-- 右侧子菜单 -->
    <div class="layer">
      <h4>
        {{ currCategory && currCategory.id === 'brand' ? '品牌' : '分类' }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="ci in currCategory.goods" :key="ci.id">
          <RouterLink to="/">
            <img :src="ci.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ ci.name }}</p>
              <p class="desc ellipsis">{{ ci.desc }}</p>
              <p class="price"><i>¥</i>{{ ci.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>

      <!-- 品牌 -->
      <ul v-if="currCategory && currCategory.brands">
        <li class="brand" v-for="bd in currCategory.brands" :key="bd.id">
          <RouterLink to="/">
            <img :src="bd.picture" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ bd.place }}
              </p>
              <p class="name ellipsis">{{ bd.name }}</p>
              <p class="desc ellipsis-2">{{ bd.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive, ref, onMounted } from 'vue'
import { findBrand } from '@/api/home'
import XtxSkeleton from '@/components/library/xtx-skeleton.vue'
export default {
  name: 'HomeCategory',
  setup() {
    // 定义 品牌推荐 对象
    let brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [
        {
          id: 'brandChildren',
          name: '品牌推荐',
        },
      ],
      // 品牌列表
      brands: [],
    })
    const store = useStore()
    // 最终使用的数据 = 9个分类 + 1个品牌
    const menuList = computed(() => {
      // 得到9个分类且每个一级子分类下的
      const list = store.state.category.list.map((item) => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods,
        }
      })
      list.push(brand)
      return list
    })
    // 得到弹出层的推荐商品数据
    const categoryId = ref(null)
    const currCategory = computed(() => {
      return menuList.value.find((item) => item.id === categoryId.value)
    })
    // 获取品牌数据
    onMounted(async () => {
      // brand.brands
      const { result } = await findBrand()
      brand.brands = result
    })
    return { menuList, categoryId, currCategory }
  },
  components: { XtxSkeleton },
}
</script>

<style scoped lang="less">
.xtx-skeleton {
  animation: fade 0.5s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
.layer {
  width: 990px;
  height: 500px;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 250px;
  top: 0;
  display: none;
  padding: 0 15px;
  h4 {
    font-size: 20px;
    font-weight: normal;
    line-height: 80px;
    small {
      font-size: 16px;
      color: #666;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 310px;
      height: 120px;
      margin-right: 15px;
      margin-bottom: 15px;
      border: 1px solid #eee;
      border-radius: 4px;
      background: #fff;

      &:nth-child(3n) {
        margin-right: 0;
      }
      a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        padding: 10px;
        &:hover {
          background: #e3f9f4;
        }
        img {
          width: 95px;
          height: 95px;
        }
        .info {
          padding-left: 10px;
          line-height: 24px;
          width: 190px;
          .name {
            font-size: 16px;
            color: #666;
          }
          .desc {
            color: #999;
          }
          .price {
            font-size: 22px;
            color: @priceColor;
            i {
              font-size: 16px;
            }
          }
        }
      }
    }
    li.brand {
      height: 180px;
      a {
        align-items: flex-start;
        img {
          width: 120px;
          height: 160px;
        }
        .info {
          p {
            margin-top: 8px;
          }
          .place {
            color: #999;
          }
        }
      }
    }
  }
}
.home-category {
  width: 250px;
  height: 500px;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.7);
  position: relative;
  z-index: 99;
  margin-left: -10px;
  &:hover .layer {
    display: block;
  }
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
