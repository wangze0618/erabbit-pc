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

// 更新收货地址
// 2022年5月16日 20:55:40
export const updateAddress = (formData) => {
  return request(`/member/address/${formData.id}`, 'put', formData)
}

// 结算页-提交订单
// 2022年5月16日 21:41:26
export const submitOrder = (data) => {
  return request(`/member/order`, 'post', data)
}

// 获取订单详情
// 2022年5月17日 22:06:52
export const findOrderDetail = (id) => {
  return request(`/member/order/${id}`, 'get')
}
