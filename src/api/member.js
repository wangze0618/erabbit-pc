import request from '@/utils/request'

// θ·εζΆθ
export const getCollect = (data) => {
  return request('/member/collect', 'get', data)
}
