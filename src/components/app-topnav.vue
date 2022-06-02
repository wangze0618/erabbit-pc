<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <a href="javascript:;" @click="router.push('/member')">
              <i class="iconfont icon-user"></i>{{ profile.account }}
            </a>
          </li>
          <li>
            <a href="javascript:;" @click="logout">退出登录</a>
          </li>
        </template>
        <template v-else>
          <li>
            <a href="javascript:;" @click="$router.push('/login')">请先登录</a>
          </li>
          <li>
            <a href="javascript:;">免费注册</a>
          </li>
        </template>
        <li>
          <a href="javascript:;" @click="router.push('/member/order')"
            >我的订单</a
          >
        </li>
        <li>
          <a href="javascript:;">会员中心</a>
        </li>
        <li>
          <a href="javascript:;">帮助中心</a>
        </li>
        <li>
          <a href="javascript:;">关于我们</a>
        </li>
        <li>
          <a href="javascript:;"> <i class="iconfont icon-phone"></i>手机版 </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import router from '@/router'
import { computed } from 'vue'
import { useStore } from 'vuex'

// 获取用户的登录信息才能控制切换导航菜单
const store = useStore()
// 使用vuex的state需要设置计算属性
const profile = computed(
  () => {
    return store.state.user.profile
  },
  { immediate: true }
)
// 退出登录
const logout = () => {
  store.commit('user/setUser', {})
  store.commit('cart/setCart', [])
  router.push('/login')
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 30px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
