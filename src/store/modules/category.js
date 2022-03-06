// 分类模块
import { findAllCategory } from '@/api/category';
import { topCategory } from '@/api/constants'
export default {
  namespaced: true,

  state() {
    return {
      // 分类信息集合 依赖topCategory重新设置，
      // 保证初始化就有数据，不白屏
      // 返回一个对象
      list: topCategory.map(item => ({ name: item })),
    };
  },
  mutations: {
    setList(state, payload) {
      state.list = payload
    },
    // 定义show hide 函数，控制当前分类的二级分类显示和隐藏
    show(state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide(state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  actions: {
    // 获取分类数据，并修改分类数据
    async getList(context) {
      const { result } = await findAllCategory();
      // 给每个分类加上控制二级分类显示隐藏的数据
      result.forEach(topItem => {
        // 默认隐藏
        topItem.open = false
      });
      context.commit('setList', result)
    }
  }
};
