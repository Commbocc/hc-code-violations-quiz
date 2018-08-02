import Vue from 'vue'
import App from './App.vue'

// import router from './router'
import store from './store'

store.dispatch('loadData')

new Vue({
  el: '#app',
  // router,
  store,
  render: h => h(App)
})
