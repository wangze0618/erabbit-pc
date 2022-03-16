// 提供首页相关API函数
import request from "@/utils/request";

// 获取热门品牌
export const findBrand = (limit = 6) => {
    return request('/home/brand', 'get', { limit })
}

// 获取轮播图
export const findBanner = () => {
    return request('/home/banner', 'get')
}

// 首页-新鲜好物 
export const findNew = () => {
    return request('/home/new', 'get')
}

// 首页-人气推荐
export const findHot = () => {
    return request('/home/hot', 'get')
}