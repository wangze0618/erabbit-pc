<template>
  <header class="navbar navbar-expand-lg navbar-light bg-light app-header">
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
        <div class="search">
          <i class="iconfont icon-search"></i>
          <input type="text" class="search-input" placeholder="搜一搜" />
        </div>
        <div class="cart">
          <a class="curr" href="#">
            <i class="iconfont icon-cart"></i><em>2</em>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'
import AppHeaderNav from './app-header-nav.vue'
export default {
  name: 'AppHeader',
  setup() {
    return {}
  },
  components: { AppHeaderNav },
}
</script>

<style scoped lang="less">
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
.navbar {
  padding-top: 0;
  padding-bottom: 0;
}
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
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
  // .navs {
  //   // width: 820px;
  //   display: flex;
  //   justify-content: space-around;
  //   padding-left: 40px;
  //   flex: 1;
  //   li {
  //     flex: 1;
  //     //   margin-right: 40px;
  //     //   width: 38px;
  //     text-align: center;
  //     a {
  //       font-size: 16px;
  //       line-height: 32px;
  //       height: 32px;
  //       display: inline-block;
  //     }
  //     &:hover {
  //       a {
  //         color: @xtxColor;
  //         border-bottom: 1px solid @xtxColor;
  //       }
  //     }
  //   }
  // }
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
