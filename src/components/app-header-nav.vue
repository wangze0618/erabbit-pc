<template>
  <!-- 菜单项 -->
  <div class="app-header-nav">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0 navs">
      <li class="home"><RouterLink to="/">首页</RouterLink></li>
      <li
        v-for="item in list"
        :key="item.id"
        @mousemove="show(item)"
        @mouseleave="hide(item)"
      >
        <router-link @click="hide(item)" :to="`/category/${item.id}`">{{
          item.name
        }}</router-link>
        <div class="layer d-none d-lg-block" :class="{ open: item.open }">
          <ul>
            <li v-for="sub in item.children" :key="sub.id">
              <router-link @click="hide(item)" :to="`/category/sub/${sub.id}`">
                <img :src="sub.picture" alt="" />
                <p>{{ sub.name }}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })

    // 控制二级分类显示和隐藏
    const show = (item) => {
      store.commit('category/show', item.id)
    }
    const hide = (item) => {
      store.commit('category/hide', item.id)
    }

    return { list, show, hide }
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

.navs {
  padding-right: 20px;
}
.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }
  &.close {
    height: 0;
    opacity: 0;
  }

  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  z-index: 9999 !important;
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
      // flex: 1;
      text-align: center;
      a {
        font-size: 16px;
        line-height: 32px;
        // height: 32px;
        display: inline-block;
      }
      &:hover {
        > a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
        > .layer {
          z-index: 99;
        }
      }
    }
  }
}

.router-link-exact-active {
  padding: 0 7px;
  border-radius: 5px;
  color: #fff !important;
  background-color: @xtxColor;
}
</style>
