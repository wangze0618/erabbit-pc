import { createStore } from "vuex";
import cart from "./modules/cart";
import category from "./modules/category";
import user from "./modules/user";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    cart,
    category,
  },
  plugins: [
    // 默认存储在localstorage
    createPersistedState({
      // 本地存储的名字
      key: "erabbit-pc",
      // 需要存储的模块
      paths: ["user", "cart"],
    }),
  ],
});
