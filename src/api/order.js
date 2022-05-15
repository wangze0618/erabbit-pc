// 订单相关的api接口

import request from '@/utils/request'

// 生成订单(即填写订单或结算页)
// 2022年5月8日 10:23:56
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}

// 添加收货地址
// 2022年5月15日 22:23:19
export const addAddress = (data) => {
  return request('/member/address', 'post', data)
}

// 获取收货地址列表
// 2022年5月15日 22:48:43
export const getAddress = () => {
  return request('/member/address', 'get')
}
