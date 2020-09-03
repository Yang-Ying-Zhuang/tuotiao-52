import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)


//引入
import Login from "../views/login.vue"

const router = new VueRouter({
  routes:[
    {
      name:"login",
      path:"/login",
      component:Login
    }
  ]
})

// 暴露
export default router