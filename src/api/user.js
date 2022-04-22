// 用户相关的接口
import request from '@/utils/request'

// 账号密码登录
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}
