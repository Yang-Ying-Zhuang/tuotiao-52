<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <!-- <input placeholder="请输入手机号" class="input" />
        <input placeholder="密码" class="input" type="password" />-->
        <myinput
          placeholder="请输入用户名"
          type="text"
          v-model="user.username"
          @input="myinp"
          :value="user"
          :rules="/^1[35789]\d{9}$|^1\d{4}$/"
          msg="手机号输入不合法"
        >
          <!-- 用户输入的号码规定 -->
        </myinput>

        <myinput placeholder="请输入密码" type="password" v-model="user.password"></myinput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <!-- <div data-v-4bc01e24 class="button">登录按钮</div> -->
      <mylogin @click="loginilu">登录</mylogin>
    </div>
  </div>
</template>

<script>
// 引入登录
import mylogin from "../components/mybutton";
// 输入框
import myinput from "../components/myinput";
// 引入基准路径
// import axios from "@/utils/axios"
// 封装user.js数据请求
import { login } from "../apis/user";

export default {
  // 注册
  components: {
    mylogin,
    myinput,
    login,
  },
  data() {
    return {
      user: {
        username: "10086",
        password: "123",
      },
    };
  },

  methods: {
    // 标记当前方法是异步方法
    async loginilu(e) {
      // axios.post("/login",this.user)

      // await:可以让异步操作先执行完，再执行后续的代码，同时可以获取then回调函数中的返回值
      // 说白了就是我们能够以同步的方式调用方法，所以我们可以接收到异步操作的返回值
      let res = await login(this.user);
      // console.log(res);
      if (res.data.statusCode === 401) {
        this.$toast.fail({
          message: res.data.message,
          duration: 2000,
        });
      } else {
        this.$toast.success({message: res.data.message});
        // 存储token数据
        localStorage.setItem("heima-52", res.data.data.token);
        // this.$router.push({path:'/personal/'+res.data.data.user.id})
        // this.$router.push({ name: "index" });

        // 获取可能传递的回传url
        console.log(window.location.hash);
        // decodeURIComponent()方法可以对url进行编码
        let backurl = decodeURIComponent(window.location.hash.split("=")[1])
        console.log(decodeURIComponent(backurl));

        if(backurl){
             this.$router.push({ path: backurl });
        }else{
          this.$router.push({ path: "/index" });
        }

      }

      // 没封装的请求
      // axios.post("/login",this.user)
      // //  console.log(this.user);
      // axios.post("/login",this.user)
      // .then(function(data){
      //   // console.log(data);
      //   if(data.data.statusCode == 401){
      //      Toast(data.data.message);
      //   }else{
      //      Toast(data.data.message);
      //   }
      // })
      // .catch(function(err){
      //   console.log(err);
      // })
    },
    myinp(data) {
      //  console.log(data);
      this.username = data;
    },
  },
};
</script>

<style lang="less">
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>