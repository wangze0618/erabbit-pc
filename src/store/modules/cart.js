// 购物车模块
export default {
  namespaced: true,

  state() {
    return {
      // 购物车商品列表
      list: [],
    }
  },
  mutations: {
    // 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
    // 线上：比上面多 isCollect 有用 discount 无用 两项项信息
    insertCart(state, payload) {
      // 插入规则
      // 1. 先找下是否有相同商品
      // 2. 如果有相同的商品，查询他的数量，累加到payload上，再保存最新位置，原来的商品要删除
      // 3. 如没有相同的商品，保存在最新位置即可
      const sameIndex = state.list.findIndex(
        (goods) => goods.skuId === payload.skuId
      )
      if (sameIndex > -1) {
        // 找到相同的商品
        const count = state.list[sameIndex].count
        payload.count += count // 让payload的数量增加
        state.list.splice(sameIndex, 1) // 删除原来的
      }
      state.list.unshift(payload) // 增加新的
    },
  },
  actions: {
    // 加入购物车
    insertCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
  },
}
