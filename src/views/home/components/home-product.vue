<template>
  <div class="home-product" ref="target">
    <HomePanel :title="cate.name" v-for="cate in list" :key="cate.id">
      <template #right>
        <div class="sub">
          <RouterLink
            v-for="sub in cate.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
            >{{ sub.name }}</RouterLink
          >
        </div>
        <XtxMore :path="`/category/${cate.id}`" />
      </template>
      <div class="box">
        <RouterLink
          class="cover d-none d-lg-block"
          :to="`/category/${cate.id}`"
        >
          <img class="img-fluid" :src="cate.picture" alt="" />
          <strong class="label">
            <span>{{ cate.name }}</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list row">
          <li
            v-for="item in cate.goods"
            :key="item.id"
            class="col-6 col-sm-6 col-md-4"
          >
            <HomeGoods :goods="item" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script setup name="HomeProduct">
import { ref } from 'vue'
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
import { useLazyData } from '@/hooks'
import { findGoods } from '@/api/home'

// 获取数据 懒加载
const { target, data: list } = useLazyData(async () => {
  return await findGoods()
})
</script>

<style scoped lang="less">
/deep/ h3 {
  min-width: 50px !important;
  max-width: 100px;
}
.home-product {
  background: #fff;
  height: 100%;
  .sub {
    // margin-bottom: 2px;++
    display: flex;
    // max-width: 350px;
    flex: 1;
    justify-content: space-evenly;
    align-items: center;
    a {
      padding: 2px 10px;
      font-size: 18px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 10px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      //   width: 240px;
      height: 610px;
      min-width: 280px !important;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        // width: 188px;
        width: 100%;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    // .goods-list {
    //   width: 990px;
    //   display: flex;
    //   flex-wrap: wrap;
    //   justify-content: space-around;
    //   &::after {
    //     content: '';
    //     // flex: auto;
    //   }
    //   li {
    //     width: 240px;
    //     height: 300px;
    //     margin-right: 10px;
    //     margin-bottom: 10px;
    //     &:nth-last-child(-n + 4) {
    //       margin-bottom: 0;
    //     }
    //     &:nth-child(4n) {
    //       margin-right: 0;
    //     }
    //   }
    // }
  }
}
</style>
