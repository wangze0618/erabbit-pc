<template>
  <div class="page-login">
    <LoginHeader> 欢迎登陆 </LoginHeader>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a
            href="javascript:;"
            :class="{ active: activeName === 'account' }"
            @click="changeTab('account')"
            >账户登录</a
          >
          <a
            href="javascript:;"
            :class="{ active: activeName === 'qrcode' }"
            @click="changeTab('qrcode')"
            >扫码登录</a
          >
        </nav>
        <!-- 账号登录&扫码登录 -->
        <div v-if="activeName === 'account'" class="account-box">表单</div>
        <!-- 二维码 -->
        <div v-if="activeName === 'qrcode'" class="qrcode-box">
          <img src="@/assets/images/qrcode.jpg" alt="" />
          <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
        </div>
      </div>
    </section>
    <LoginFooter></LoginFooter>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'

const activeName = ref('account')
const changeTab = (newTab) => {
  activeName.value = newTab
}
</script>

<style scoped lang="less">
@media screen and (max-width: 992px) {
  .login-section {
    display: flex;
    justify-content: center;
    background-color: rebeccapurple !important;
    .wrapper {
      position: static !important;
      transform: none !important;
      min-height: 400px;
      top: 54px;
      nav {
        height: 55px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        padding: 0 40px;
        text-align: right;
        align-items: center;
        a {
          flex: 1;
          line-height: 1;
          display: inline-block;
          font-size: 18px;
          position: relative;
          &:first-child {
            border-right: 1px solid #f5f5f5;
            text-align: left;
          }
          &.active {
            color: @xtxColor;
            font-weight: bold;
          }
        }
      }
    }
  }
}
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    transition: all, 0.5s;
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &:hover {
          color: unset;
        }
        &.active {
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
  }
}
// 二维码容器
.qrcode-box {
  text-align: center;
  padding-top: 40px;
  p {
    margin-top: 20px;
    a {
      color: @xtxColor;
      font-size: 16px;
    }
  }
}
</style>
