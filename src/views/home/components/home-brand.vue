<template>
  <div ref="box">
    <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
      <template v-slot:right>
        <a
          @click="togglePrev"
          href="javascript:;"
          class="iconfont icon-angle-left prev"
          :class="{ disable: disablePrev }"
        ></a>
        <a
          @click="toggleNext"
          href="javascript:;"
          class="iconfont icon-angle-right next"
          :class="{ disable: disableNext }"
        ></a>
      </template>
      <div class="box">
        <ul
          class="list row gx-1"
          :style="{ transform: `translateX(${-index * width}px)` }"
        >
          <li v-for="i in brand" class="col-6 col-sm-4 col-md-3" :key="i">
            <RouterLink to="/">
              <img :src="i.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import { findBrand } from '@/api/home'
import { computed, onMounted, ref, watch } from 'vue'
import HomePanel from './home-panel'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup() {
    // 获取品牌数据
    const brand = ref([])
    onMounted(async () => {
      const { result } = await findBrand(10)
      brand.value = result
    })

    // 切换顺序
    const index = ref(0)
    const box = ref(null)
    const width = ref(0)
    let disableNext = ref(false)
    let disablePrev = ref(false)
    onMounted(() => {
      window.addEventListener('scroll', () => {
        width.value = window.innerWidth
      })
    })
    const geshu = computed(() => {
      // if (width.value > 1200) {
      //   return 3
      // } else if (width.value > 768 && width.value <= 1200) {
      //   return 3
      // } else if (width.value > 576 && width.value <= 768) {
      //   return 4
      // } else {
      //   return 5
      // }

      if (width.value < 576) {
        return 6
      } else if (width.value >= 576 && width.value < 768) {
        return 4
      } else if (width.value >= 768 && width.value < 1200) {
        return 4
      } else if (width.value >= 1200) {
        return 2
      }
    })
    watch(
      index,
      () => {
        if (index.value <= 0) {
          disablePrev.value = true
        } else {
          disablePrev.value = false
        }
        if (index.value < geshu.value - 2) {
          disableNext.value = false
        } else if (index.value == 0) {
          disableNext.value = false
        } else {
          disableNext.value = true
        }
      },
      { immediate: true }
    )

    const toggleNext = () => {
      index.value++
    }

    const togglePrev = () => {
      index.value--
    }

    return {
      brand,
      index,
      box,
      geshu,
      disablePrev,
      disableNext,
      width,
      toggleNext,
      togglePrev,
    }
  },
}
</script>

<style scoped lang="less">
.disable {
  cursor: not-allowed;
  pointer-events: none;
  background-color: gray !important;
}
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 305px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    flex-wrap: nowrap;

    li {
      margin-right: 0;
      // padding: 0;
      // min-width: 140px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 305px;
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  li {
    width: 20% !important;
  }
}
</style>
