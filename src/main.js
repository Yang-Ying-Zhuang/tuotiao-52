import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import less from "./styles/reset.less"

new Vue({
  less,
  render: h => h(App),
}).$mount('#app')
