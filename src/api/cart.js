// 封装购物车相关的API函数
import request from '@/utils/request'

/*
获取商品的 最新价格 库存 是否有效
2022年4月25日 21:12:27
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}
/*
获取商品的对应的sku数据
2022年5月2日 20:57:15
 */
export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合并购物车
 * 2022年5月3日 17:43:39
 */
export const mergeLocalCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

/**
 * 获取购物车列表
 * 2022年5月3日 21:07:10
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}
/**
 * 加入购物车
 * 2022年5月3日 21:54:49
 */
export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}
/**
 * 删除/清空购物车
 * 2022年5月3日 22:18:16
 */
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}

/**
 * 修改购物车商品选中状态，数量
 * 2022年5月4日 21:36:40
 */
export const updateCart = ({ skuId, selected, count }) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count })
}

/* 
购物车全选/取消全选
2022年5月4日 22:27:28
ids参数如果不传，表示用户访问的是全选和取消全选操作，后端根据selected确定用户是全选和取消全选
*/
export const CheckAllCart = ({ selected, ids }) => {
  return request(`/member/cart/selected`, 'put', { selected, ids })
}
