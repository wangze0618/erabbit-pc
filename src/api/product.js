// 提供商品详情的API函数
import request from '@/utils/request'

// 根据商品id获取商品详情
export const findProduct = (id) => {
  return request('/goods', 'get', { id })
}

// 根据商品id获取同类商品推荐
export const findRelevantGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}

// 热销推荐
export const findGoodsHot = (id, type = 1, limit = 3) => {
  return request('/goods/hot', 'get', { id, type, limit })
}
