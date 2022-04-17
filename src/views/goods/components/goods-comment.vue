<template>
  <XtxLoading v-if="isShow"></XtxLoading>
  <div v-else class="goods-comment">
    <!-- 评价头部 -->
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            href="javascript:;"
            v-for="(item, index) in commentInfo.tags"
            :key="item.title"
            :class="{ active: currIndex == index }"
            @click="changeTag(index)"
            >{{ item.title }}（{{ item.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        @click="changeSort('null')"
        href="javascript:;"
        :class="{ active: reqParams.sortField === null }"
        >默认</a
      >
      <a
        @click="changeSort('createTime')"
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'createTime' }"
        >最新</a
      >
      <a
        @click="changeSort('praiseCount')"
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        >最热</a
      >
    </div>
    <!-- 评价列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <XtxStar :star="item.score"></XtxStar>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <!-- 评论图片组件 -->
          <GoodsCommentImage
            v-if="item.pictures.length"
            :pictures="item.pictures"
          />
          <div class="time">
            <span>2020-10-10 10:11:22</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <XtxPagination />
  </div>
</template>
<script setup>
import { findGoodsCommentInfo, findGoodsCommentList } from '@/api/product'
import { ref, onMounted, inject, reactive, watch, onBeforeMount } from 'vue'
import XtxStar from '@/components/library/xtx-star.vue'
import XtxLoading from '@/components/library/xtx-loading.vue'
import GoodsCommentImage from './goods-comment-image.vue'
import XtxPagination from '@/components/library/xtx-pagination.vue'

const isShow = ref(false)

// 评论数据
const commentInfo = ref('null')
const goods = inject('goods')
// 准备筛选条件数据
const reqParams = reactive({
  page: 1,
  pageSize: 10,
  hasPicture: null,
  tag: null,
  // 排序方式 praiseCount热度 | createTime最新
  sortField: null,
})

// 激活的tag初识索引
const currIndex = ref(0)
const changeTag = (index) => {
  currIndex.value = index
  const tag = commentInfo.value.tags[index]
  if (tag.type == 'all') {
    reqParams.hasPicture = null
    reqParams.tag = null
  } else if (tag.type == 'img') {
    reqParams.hasPicture = true
    reqParams.tag = null
  } else {
    reqParams.hasPicture = null
    reqParams.tag = tag.title
  }
  reqParams.page = 1
}
// 获取数据
onMounted(async () => {
  isShow.value = true
  const { result } = await findGoodsCommentInfo(goods.value.id)
  result.tags.unshift({
    title: '有图',
    tagCount: result.hasPictureCount,
    type: 'img',
  })
  result.tags.unshift({
    title: '全部评价',
    tagCount: result.evaluateCount,
    type: 'all',
  })
  commentInfo.value = result
  isShow.value = false
})
// 更改排序
const changeSort = (field) => {
  reqParams.page = 1
  reqParams.sortField = field
}

// 评论列表数据
const commentList = ref('null')
watch(
  reqParams,
  async () => {
    isShow.value = true
    const { result } = await findGoodsCommentList(goods.value.id, reqParams)
    commentList.value = result.items
    isShow.value = false
  },
  { immediate: true }
)
// 定义转换数据的函数
const formatSpecs = (specs) => {
  return specs.reduce((p, c) => `${p} ${c.name}: ${c.nameValue}`, '').trim()
}
const formNickname = (nickname) => {
  return nickname.replaceAll(nickname.slice(1, nickname.length - 1), '****')
}
</script>
<style scoped lang="less">
.list {
  padding: 0 20px;
  .item {
    display: flex;
    padding: 25px 10px;
    border-bottom: 1px solid #f5f5f5;
    .user {
      width: 160px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        padding-left: 10px;
        color: #666;
      }
    }
    .body {
      flex: 1;
      .score {
        line-height: 40px;
        // .iconfont {
        //   color: #ff9240;
        //   padding-right: 3px;
        // }
        .attr {
          padding-left: 10px;
          color: #666;
        }
      }
    }
    .text {
      color: #666;
      line-height: 24px;
    }
    .time {
      color: #999;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
  }
}
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
