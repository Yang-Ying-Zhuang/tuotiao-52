import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)


//引入
import Login from "../views/login.vue"
import Personal from "../views/personal/index.vue"

const router = new VueRouter({
  routes: [{
      name: "login",
      path: "/login",
      component: Login
    },
    {
      name: "personal",
      path: "/personal",
      component: Personal
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