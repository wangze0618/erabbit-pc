// 用户相关的接口
import request from '@/utils/request'

// 账号密码登录
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}
// 发送短信验证码
export const userMobileLoginMsg = (mobile) => {
  return request('/login/code', 'get', { mobile })
}

// 验证码登录 默认123456
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}

// 获取个人信息
export const userInfo = () => {
  return request('/member/profile', 'get')
}
// 修改个人信息
export const changeUserInfo = (data) => {
  return request('/member/profile', 'put', data)
}
