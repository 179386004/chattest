import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import SocketIO from "socket.io-client"
import VueSocketIO from 'vue-socket.io'

import $ from 'jquery'

Vue.config.productionTip = false

 
Vue.use(new VueSocketIO({
    debug: true,
    // 服务器端地址
    connection: 'http://localhost:3011',
    vuex: {
    }
}))
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
