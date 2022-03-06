<template>
  <!-- 菜单项 -->
  <div class="app-header-nav">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0 navs">
      <li class="home"><RouterLink to="/">首页</RouterLink></li>
      <li>
        <a href="#">美食</a>
        <div class="layer d-none d-lg-block">
          <ul>
            <li v-for="i in 10" :key="i">
              <a href="#">
                <img
                  src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png"
                  alt=""
                />
                <p>果干</p>
              </a>
            </li>
          </ul>
        </div>
      </li>
      <li><a href="#">餐厨</a></li>
      <li><a href="#">艺术</a></li>
      <li><a href="#">电器</a></li>
      <li><a href="#">居家</a></li>
      <li><a href="#">洗护</a></li>
      <li><a href="#">孕婴</a></li>
      <li><a href="#">服装</a></li>
      <li><a href="#">杂货</a></li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup() {
    return {}
  },
}
</script>

<style scoped lang="less">
@media screen and (max-width: 1400px) {
  .layer ul {
    width: 1100px;
  }
}
@media screen and (max-width: 1200px) {
  .layer ul {
    width: 900px;
  }
}
@media screen and (max-width: 991px) {
  .navs {
    padding-left: 0 !important;
  }
}
.layer {
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: nowrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
.app-header-nav {
  //   position: relative;
  display: flex;
  flex: 1;

  .navs {
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    position: relative;
    flex: 1;
    li {
      flex: 1;
      text-align: center;
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {
        > a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
        > .layer {
          height: 132px;
          opacity: 1;
          z-index: 99;
        }
      }
    }
  }
}
</style>
