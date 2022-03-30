// 提供商品详情的API函数
import request from '@/utils/request'

// 根据商品id获取商品详情
export const findProduct = (id) => {
  return request('/goods', 'get', { id })
}
