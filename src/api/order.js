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

// 获取我的订单
// 2022年5月25日 10:00:53
export const findOrderList = ({ page = 1, pageSize = 10, orderState = 0 }) => {
  return request(`/member/order`, 'get', { page, pageSize, orderState })
}

/**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
export const cancelOrder = (orderId, cancelReason) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

/**
 * 删除订单
 * @param {Array<string>} ids - 删除订单，id集合
 * @returns
 */
export const deleteOrder = (ids) => {
  return request('/member/order', 'delete', { ids: [ids] })
}

// 确认收货
export const confirmOrder = (id) => {
  return request(`/member/order/${id}/receipt`, 'get')
}

// 查看物流
export const logisticsOrder = (id) => {
  return request(`/member/order/${id}/logistics`, 'get')
}

/**
 * 获取再次购买的订单结算信息
 * @param {String} id - 订单ID
 * @returns
 */
export const findOrderRepurchase = (id) => {
  return request(`/member/order/repurchase/${id}`, 'get')
}

// 模拟发货
export const consignOrder = (orderId) => {
  return request(`/member/order/consignment/${orderId}`, 'get')
}
