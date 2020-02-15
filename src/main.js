import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import navbar from '@/layout/navbar'



//import persistentState from 'vue-persistent-state'
Vue.component('navbar-layout', navbar);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,

 
  render: h => h(App)
}).$mount('#app')
