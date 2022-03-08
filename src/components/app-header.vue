<template>
  <header
    class="navbar navbar-expand-lg navbar-light bg-light app-header"
    :class="{ sticky: scrollTop }"
  >
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <!-- 汉堡菜单 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 菜单项 -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- 头部导航组件 -->
        <AppHeaderNav></AppHeaderNav>
        <template v-if="!scrollTop">
          <div class="search" :class="{ searchLine: focus }">
            <i class="iconfont icon-search"></i>
            <input
              type="text"
              @focus="focus = true"
              @blur="focus = false"
              class="search-input"
              placeholder="搜一搜"
            />
          </div>
          <div class="cart">
            <a class="curr" href="#">
              <i class="iconfont icon-cart"></i><em>2</em>
            </a>
          </div>
        </template>
        <template v-else>
          <div class="right">
            <a href="#">品牌</a>
            <a href="#">专题</a>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import AppHeaderNav from './app-header-nav.vue'
export default {
  name: 'AppHeader',
  setup() {
    const stickyNav = ref(true)
    const focus = ref(false)
    // 滚动距离
    const scroll = ref(0)
    const scrollFn = () => {
      scroll.value = document.documentElement.scrollTop
    }
    // 监听滚动事件
    onMounted(() => {
      window.addEventListener('scroll', scrollFn, false)
    })
    const scrollTop = computed({
      get() {
        return scroll.value >= 78 ? true : false
      },
      immediate: true,
    })
    return { focus, stickyNav, scroll, scrollFn, scrollTop }
  },

  components: { AppHeaderNav },
}
</script>

<style scoped lang="less">
.right {
  display: flex;
  width: 220px;
  border-left: 3px solid @xtxColor;
  padding-left: 15px;
  a {
    font-size: 16px;
    margin-right: 20px;
    &:hover {
      color: @xtxColor;
    }
  }
}
.searchLine {
  transition: all 0.6s;
  border: 1px solid @xtxColor !important;
}
@media screen and (max-width: 991px) {
  .navs {
    padding-left: 0 !important;
  }
  .search {
    margin-bottom: 5px !important;
  }
  .search,
  .cart {
    margin: 0 auto;
  }
}
.nav-item {
  flex: 1;
}
.sticky {
  height: 80px;
  position: sticky;
  top: 0;
  // left: 0;
  z-index: 999;
  box-shadow: 2px 2px 2px lightgray;
  transition: all 0.5s;
}
.navbar {
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 20px;
}
.app-header {
  background: #fff;
  .container {
    height: 100%;
    display: flex;
    align-items: center;
    align-content: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../assets/images/logo.png) no-repeat center 18px / contain;
    }
  }
  .search {
    width: 170px;
    height: 40px;
    position: relative;
    border: 1px solid #c5c4c4;
    line-height: 32px;
    padding: 2px;
    border-radius: 20px;
    &:focus {
      border: 1px solid red;
    }
    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
      background-color: transparent;
    }
  }
  .cart {
    width: 50px;
    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;
      .icon-cart {
        font-size: 22px;
      }
      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: @helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
