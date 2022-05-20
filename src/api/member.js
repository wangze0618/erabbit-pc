import request from '@/utils/request'

// 获取收藏
export const getCollect = (data) => {
  return request('/member/collect', 'get', data)
}
