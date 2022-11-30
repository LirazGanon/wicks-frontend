import Vuex from 'vuex'

import { userStore } from './modules/user.store.js'
import { wapStore } from './modules/wap.store.js'
import { cmpStore } from './modules/cmps.store.js'
import { reviewStore } from './modules/review.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    wapStore,
    reviewStore,
    cmpStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
