import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store' //가져오기


Vue.config.productionTip = false

new Vue({
  store, // 변수입력 store : store
  render: h => h(App),
}).$mount('#app')
