import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/firebaseInit'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
import product from './modules/product'
import custom from './modules/custom'

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    product,custom
  }
})
