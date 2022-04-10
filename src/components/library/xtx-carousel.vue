<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="play">
    <!-- 图片容器 -->
    <ul class="carousel-body row">
      <!-- 显示的图片加上 fade -->
      <li
        class="carousel-item"
        v-for="(item, index) in sliders"
        :key="index"
        :class="{ fade: showIndex === index }"
      >
        <!-- 图片 -->
        <RouterLink v-if="item.hrefUrl" :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
        <!-- 商品列表 -->
        <div class="slider" v-else>
          <RouterLink
            v-for="goods in item"
            :key="goods.id"
            :to="`/product/${goods.id}`"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <!-- 上一张 -->
    <a @click="prev" href="javascript:;" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <!-- 下一张 -->
    <a @click="next" href="javascript:;" class="carousel-btn next"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <!-- 5个指示器 -->
    <div class="carousel-indicator">
      <!-- active 激活点 -->
      <span
        @click="showIndex = index"
        v-for="(item, index) in sliders"
        :key="index"
        :class="{ active: index === showIndex }"
      ></span>
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted, watch } from 'vue'

export default {
  name: 'XtxCarousel',
  props: {
    //  Array 轮播图数据
    sliders: {
      type: Array,
      required: true,
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false,
    },
    // 间隔时长
    durationTime: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    //  控制显示图片的索引（默认为0）
    const showIndex = ref(0)

    // 自动轮播的逻辑
    let timer = null
    const autoPlay = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        if (showIndex.value >= props.sliders.length - 1) {
          showIndex.value = 0
        } else {
          showIndex.value++
        }
      }, props.durationTime)
    }
    watch(
      () => props.sliders,
      (newVal) => {
        if (newVal.length && props.autoPlay) {
          autoPlay()
        }
      },
      { immediate: true }
    )
    // 鼠标移入暂停切换 移出自动播放
    const stop = () => {
      clearInterval(timer)
    }
    const play = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlay()
      }
    }
    // 点击切换
    const prev = () => {
      if (showIndex.value <= 0) {
        showIndex.value = props.sliders.length - 1
      } else {
        showIndex.value--
      }
    }
    const next = () => {
      if (showIndex.value >= props.sliders.length - 1) {
        showIndex.value = 0
      } else {
        showIndex.value++
      }
    }

    // 销毁组件 清楚定时器
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { showIndex, stop, play, prev, next }
  },
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 250px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      display: block;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.8s linear;
      &.fade {
        // display: inline-block;
        opacity: 1;
        z-index: 1;
        // transition: opacity 0.8s linear;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: opacity 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>
