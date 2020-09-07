import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)


//登录页
import Login from "../views/login.vue"
// 个人中心页
import Personal from "../views/personal/index.vue"
// 个人编辑页
import Editprofile from "../views/personal/editprofile.vue"
//注册页
import Register from "../views/personal/register.vue"
//首页
import Index from "../views/index.vue"
const router = new VueRouter({
  routes: [
    {
      name: "login",
      path: "/login",
      component: Login
    },
    {
      name: "index",
      path: "/index",
      component: Index
    },
    {
      name: "personal",
      path: "/personal/:id",
      component: Personal
    },
    {
      name: "edit_profile",
      path: "/editprofile/:id",
      component: Editprofile
    },
    {
      name: "register",
      path: "/register",
      component: Register
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 当前的跳转是否跳转到需要进行授权认证的页面，如/personal
  if (to.name == "personal") {
    let token = localStorage.getItem("heima-52")
    //  console.log(token);
    if (token) {
      next()
    } else {
      // console.log(11);
       next({name:"login"})
    }
  } else {
    next()
  }

})



// 暴露
export default router