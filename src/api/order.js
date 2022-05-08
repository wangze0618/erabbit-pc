// 订单相关的api接口

import request from '@/utils/request'

// 生成订单(即填写订单或结算页)
// 2022年5月8日 10:23:56
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}
