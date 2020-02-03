import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/firebaseInit'

Vue.use(Vuex)
import product from './modules/product'
import custom from './modules/custom'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    product,custom
  }
})
