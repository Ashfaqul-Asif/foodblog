import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/firebaseInit'

Vue.use(Vuex)
import product from './modules/product'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    product
  }
})
