// 给vee-validation提供校验函数
// 2022年4月19日 22:13:25
export default {
  // 用户名校验
  account(value) {
    // 1、非空验证 返回true就是验证成功，返回一个字符串就是失败，字符串就是错误提示
    if (!value) return '请输入用户名'
    // 2、规则：字母开头6-20字符之间
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '必须以字母开头且6-20个字符'
    return true
  },
  // 密码校验
  password(value) {
    // 1、非空验证 返回true就是验证成功，返回一个字符串就是失败，字符串就是错误提示
    if (!value) return '请输入密码'
    // 2、规则：6-24字符之间
    if (!/^\w{6,24}$/.test(value)) return '密码格式为6-24个字符'
    return true
  },
  // 手机号校验
  mobile(value) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
    return true
  },
  // 验证码校验
  code(value) {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码是6个数字'
    return true
  },
  // 协议勾选验证
  isAgree(value) {
    if (!value) return '请勾选同意用户协议'
    return true
  },
}
