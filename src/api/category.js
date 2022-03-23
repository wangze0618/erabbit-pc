// 定义分类相关的API接口函数
import request from '@/utils/request'

// 获取所有分类
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

// 获取顶级类目信息
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
