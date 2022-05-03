<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      ref="formTarget"
      class="form"
      autocomplete="off"
      v-slot="{ errors }"
      :validation-schema="mySchema"
    >
      <!-- 密码登录 -->
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              name="account"
              type="text"
              placeholder="请输入用户名"
              v-model="form.account"
              :class="{ error: errors.account }"
            />
          </div>
          <div v-if="errors.account" class="error">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              name="password"
              type="password"
              placeholder="请输入密码"
              autocomplete="off"
              v-model="form.password"
              :class="{ error: errors.password }"
            />
          </div>
          <div v-if="errors.password" class="error">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <!-- 验证码登录 -->
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              name="mobile"
              v-model="form.mobile"
              type="text"
              placeholder="请输入手机号"
              maxlength="11"
              :class="{ error: errors.mobile }"
            />
          </div>
          <div v-if="errors.mobile" class="error">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              autocomplete="off"
              name="code"
              v-model="form.code"
              type="password"
              placeholder="请输入验证码"
              :class="{ error: errors.code }"
            />
            <span @click="send()" v-if="!isCount" class="code">发送验证码</span>
            <span v-else class="code disable">等待{{ time }}秒后重试</span>
          </div>
          <div v-if="errors.code" class="error">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field
            :as="XtxCheckbox"
            name="isAgree"
            :modelValue="form.isAgree"
            @updateValue="form.isAgree = $event"
          />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div v-if="errors.isAgree" class="error">
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" @click="loginValidate" class="btn">登录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import XtxCheckbox from '@/components/library/xtx-checkbox.vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validation'
import Message from '@/components/library/Message'
import {
  userAccountLogin,
  userMobileLoginMsg,
  userMobileLogin,
} from '@/api/user'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

// 倒计时
const time = ref(60)
const isCount = ref(false)

// 是否短信登录
const isMsgLogin = ref(false)

// vee-validate 校验基本步骤
// 1. 导入Form Field 组件，将form和input进行替换，需要加上name用来指定将来的校验规则函数的
// 2. Field 需要进行数据绑定
// 3. 定义Field的name属性指定的校验规则函数，Form的validation-schema接受定义好的校验规则是对象
// 表单信息对象
const form = reactive({
  isAgree: true,
  account: null,
  password: null,
  mobile: null,
  code: null,
})
const mySchema = {
  account: schema.account,
  password: schema.password,
  mobile: schema.mobile,
  code: schema.code,
  isAgree: schema.isAgree,
}

const formTarget = ref(null)
// 监听登录方式变化，清空输入框的内容
watch(isMsgLogin, () => {
  form.account = null
  form.password = null
  form.mobile = null
  form.code = null
})
// 点击 登录 按钮进行表单验证
const store = useStore()
const route = useRoute()
const router = useRouter()
const loginValidate = async () => {
  const valid = await formTarget.value.validate()
  /*
    1. 准备API来进行登录
    2. 调用API函数
    3. 成功：存储用户信息 + 跳转至来源页或首页 + 消息提示
    4. 失败：消息提示
  */
  if (valid) {
    if (isMsgLogin.value) {
      try {
        // 手机验证码登录
        const { result } = await userMobileLogin(form)
        const { id, account, avatar, mobile, nickname, token } = result
        store.commit('user/setUser', {
          id,
          account,
          avatar,
          mobile,
          nickname,
          token,
        })
        console.log(result)
        router.push(route.query.redirectUrl || '/')
        Message({ type: 'success', text: '登录成功' })
      } catch (error) {
        if (error.response) {
          Message({
            type: 'error',
            text: error.response.data.message || '登录失败',
          })
        }
      }
    } else {
      // 账号密码登录
      try {
        const { result } = await userAccountLogin(form)
        const { id, account, avatar, mobile, nickname, token } = result
        store.commit('user/setUser', {
          id,
          account,
          avatar,
          mobile,
          nickname,
          token,
        })
        await store.dispatch('cart/mergeCart')
        // 进行路由跳转
        router.push(route.query.redirectUrl || '/')
        Message({ type: 'success', text: '登录成功' })
      } catch (error) {
        if (error.response) {
          Message({
            type: 'error',
            text: error.response.data.message || '登录失败',
          })
        }
      }
    }
  }
}

// 点击发送验证码时检验手机号
const send = async () => {
  const valid = mySchema.mobile(form.mobile)
  if (valid == '手机号格式错误' || valid == '请输入手机号') {
    // 失败 就使用vee的setFieldError(字段，错误信息)
    formTarget.value.setFieldError('mobile', valid)
  } else {
    // 正确 发送请求
    try {
      isCount.value = true
      let countInterval = setInterval(() => {
        time.value--
        if (time.value <= 0) {
          clearInterval(countInterval)
          isCount.value = false
          time.value = 60
        }
      }, 1000)
      await userMobileLoginMsg(form.mobile)
      Message({ type: 'success', text: '发送成功' })
    } catch (error) {
      if (error.response.data) {
        Message({ type: 'error', text: error.response.data.message })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/*  账号容器 */
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          transition: all 0.5s;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          background-color: @xtxColor;
          line-height: 34px;
          font-size: 14px;
          color: #fff;
          padding: 0 5px;
          height: 34px;
          cursor: pointer;
          &.disable {
            color: #666;
            cursor: not-allowed;
            background: #dddcdc;
          }
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 27.5px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
