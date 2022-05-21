import Mock from 'mockjs'
import qs from 'qs'
// 基本配置
Mock.setup({
  // 随机模拟网络延迟ms
  timeout: '200-600',
})

// 模拟我的收藏
Mock.mock(/\member\/collect/, 'get', (config) => {
  const counts = 35
  const urlStr = config.url.split('?')[1]
  const params = qs.parse(urlStr)

  const items = []
  for (let i = 0; i < params.pageSize; i++) {
    items.push(
      Mock.mock({
        id: '@id',
        name: '@ctitle(10,20)',
        desc: '@ctitle(4,10)',
        price: '@float(100,200,2,2)',
        picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock(
          '@integer(1,8)'
        )}.jpg`,
      })
    )
  }

  return {
    msg: '请求数据成功',
    result: {
      counts,
      pageSize: +params.pageSize,
      page: +params.page,
      items,
    },
  }
})
