// 提供首页相关API函数
import request from "@/utils/request";

// 获取热门品牌
export const findBrand = (limit = 6) => {
    return request('/home/brand', 'get', { limit })
}