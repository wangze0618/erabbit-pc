import { createStore } from 'vuex'


// A模块
const moduleA = {
  state: {
    username: 'mA'
  },
  getters: {
    newName: state => state.username + '!!!'
  },
  mutations: {
    updateName: state => state.username = 'mA AAAAA'
  }
}


// B模块
const moduleB = {
  namespaced: true,
  state: {
    username: 'mB'
  },
  getters: {
    newName: state => state.username + '!!!'
  },
  mutations: {
    updateName: state => state.username = 'mB BBBBB'
  },
  actions: {
    updateName(ctx) {
      setTimeout(() => {
        ctx.commit('updateName')
      }, 2000);
    }
  },
}














// export default createStore({
//   state: {
//     username: 'zs'
//   },
//   getters: {
//     newName(state) {
//       return state.username + '!!!'
//     }

//   },
//   mutations: {
//     updateName(state) {
//       state.username = 'wz'
//     }
//   },
//   actions: {
//     updateName(ctx) {
//       setTimeout(() => {
//         ctx.commit('updateName')
//       }, 2000);
//     }
//   },
//   modules: {
//   }
// })

export default createStore({
  modules: { moduleA, moduleB }
})