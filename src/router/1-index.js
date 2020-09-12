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
//新闻详情
import Article from "@/views/personal/article.vue"
//我的关注
import Myfollows from "../views/personal/myfollows.vue"
//收藏
import Mycollect from "../views/personal/mycollect.vue"
//评论
import Comment from "../views/personal/comment.vue"


const router = new VueRouter({
  routes: [
    {
      path: "/",     //添加路由默认重定向
      redirect:{name:"index"}
    },
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
      name: "editprofile",
      path: "/editprofile/:id",
      component: Editprofile
    },
    {
      name: "register",
      path: "/register",
      component: Register
    },
    {
      name: "article",
      path: "/article/:id",
      component: Article
    },
    {
      name: "myfollows",
      path: "/myfollows/:id",
      component: Myfollows
    },
    {
      name: "mycollect",
      path: "/mycollect/:id",
      component: Mycollect
    },
    {
      name: "comment",
      path: "/comment/:id",
      component: Comment
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
      next({
        name: "login"
      })
    }
  } else {
    next()
  }

})



// 暴露
export default router