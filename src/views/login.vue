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
        <input placeholder="密码" class="input" type="password" /> -->
        <myinput placeholder="请输入用户名"
        type="text"
        v-model="user.username"
        @input="myinp"
        :value="user">
        </myinput>

        <myinput  placeholder="请输入密码"
        type="password"
        v-model="user.password">
        </myinput>

      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <!-- <div data-v-4bc01e24 class="button">登录按钮</div> -->
      <mylogin text="登录" @click="login"></mylogin>
      
    </div>
  </div>
</template>

<script>
// 引入登录
import mylogin  from '../components/mybutton'
// 输入框
import myinput  from '../components/myinput'
// 引入路由
import axios from "@/utils/axios"
// 提示框
import 'vant/lib/index.css';  // 引入样式
import { Toast } from 'vant';
export default {
  // 注册
   components:{
     mylogin,myinput
  },
  data(){
    return{
      user:{
        username:"10086",
        password:"123"
      }
    }
  },

   methods:{
     login(e){
      //  console.log(this.user);
      axios.post("/login",this.user)
      .then(function(data){
        console.log(data);
        if(data.data.statusCode == 401){
           Toast(data.data.message);
        }else{
           Toast(data.data.message);
        } 
      })
      .catch(function(err){
        console.log(err);
      })
       
     },
     myinp(data){
      //  console.log(data);
        this.username = data
     }
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