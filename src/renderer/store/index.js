import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules/index'

Vue.use(Vuex)
/** vuex的写法，从模块导入
 */
const store = new Vuex.Store({
  modules,
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations()
  // ],
  strict: process.env.NODE_ENV !== 'production'
})
export default store;