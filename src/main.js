import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import SocketIO from "socket.io-client"
import VueSocketIO from 'vue-socket.io'

import $ from 'jquery'

Vue.config.productionTip = false

 
Vue.use(new VueSocketIO({ 
    debug: true,
    // 服务器端地址
    connection: 'http://localhost:8840',
    vuex: {
    }
}))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
