import { getNewCartGoods } from '@/api/cart'

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
    // 修改购物车
    updateCart(state, goods) {
      const updateGoods = state.list.find((item) => item.skuId === goods.skuId)
      for (const key in goods) {
        if (
          goods[key] !== undefined &&
          goods[key] !== null &&
          goods[key] !== ''
        ) {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除购物车商品
    deleteCart(state, skuId) {
      const index = state.list.findIndex((item) => item.skuId == skuId)
      state.list.splice(index, 1)
    },
  },
  actions: {
    // 更新购物车
    updateCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
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

    // 获取商品列表
    async findCart(ctx, payload) {
      return new Promise(async (resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          // Promise.all([])
          const promiseArr = ctx.state.list.map((goods) => {
            return getNewCartGoods(goods.skuId)
          })
          const dataList = await Promise.all(promiseArr)
          dataList.forEach((item, i) => {
            ctx.commit('updateCart', {
              skuId: ctx.state.list[i].skuId,
              ...item.result,
            })
          })
          resolve()
        }
      })
    },

    // 删除购物车商品
    deleteCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 全选与取消全选
    CheckAllCart(ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.getters.validList.forEach((goods) => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
        }
      })
    },
  },
  getters: {
    // 有效商品列表
    validList(state) {
      return state.list.filter(
        (goods) => goods.stock > 0 && goods.isEffective == true
      )
    },
    // 有效商品件数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount(state, getters) {
      return (
        getters.validList.reduce((p, c) => {
          return p + Math.round(c.nowPrice * 100) * c.count
        }, 0) / 100
      )
    },
    // 无效商品列表
    invalidList(state) {
      return state.list.filter(
        (goods) => goods.stock <= 0 || !goods.isEffective
      )
    },
    // 已选商品列表
    selectedList(state, getters) {
      return getters.validList.filter((goods) => goods.selected)
    },
    // 已选商品总件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount(state, getters) {
      return (
        getters.selectedList.reduce(
          (p, c) => p + Math.round(c.nowPrice * 100) * c.count,
          0
        ) / 100
      )
    },
    // 是否全选
    isCheckAll(state, getters) {
      return (
        getters.validList.length !== 0 &&
        getters.selectedList.length == getters.validList.length
      )
    },
  },
}
