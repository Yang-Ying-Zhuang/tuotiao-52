import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

//在main.js引入称为全局引入
import "./styles/reset.less"

// 提示框
import { Toast,Button,Uploader,Dialog,Field,Picker,Icon,Tab,Tabs,List,PullRefresh  } from 'vant';
Vue.use(Toast);
Vue.use(Button);
Vue.use(Uploader);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(Picker);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(PullRefresh);

//引入路由
import router from "./router/1-index"

new Vue({
  //注入路由
  router,
  render: h => h(App),
}).$mount('#app')
