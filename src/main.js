import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入路由
import router from "./router/1-index"

//在main.js引入称为全局引入
import "./styles/reset.less"

new Vue({
  //注入路由
  router,
  render: h => h(App),
}).$mount('#app')
