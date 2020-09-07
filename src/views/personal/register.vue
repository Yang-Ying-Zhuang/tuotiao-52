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
        <myinput
          placeholder="手机号码"
          class="input"
          :rules="/^1\d{4}$|^1[35789]\d{9}$/"
          msg="手机号码格式不正确"
          v-model="user.username"
        />
        <myinput
          data-v-744880be
          placeholder="昵称"
          class="input"
          :rules="/^[0-9a-zA-Z\u4e00-\u9fa5]{2,}$/"
          v-model="user.nickname"
          msg="昵称格式不正确"/>
        <myinput
          placeholder="密码"
          class="input"
          type="password"
          :rules="/^[0-9a-zA-Z]{3,}$/"
          msg="密码格式不正确"
          v-model="user.password"
        />
      </div>
      <p class="tips">
        有账号？
        <a href="#/login" class>去登录</a>
      </p>
      <mybutton data-v-4bc01e24 class="button" @click="myregister ">注册</mybutton>
    </div>
  </div>
</template>

<script>
import myinput from "../../components/myinput";
import mybutton from "../../components/mybutton";
import {register} from "../../apis/user"
export default {
  components: { myinput, mybutton,register },
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: "",
      },
    };
  },
  methods: {
    async myregister() {
      // console.log(this.user);
      const dataStr = await register(this.user)
      // console.log(dataStr);
      if(dataStr.data.message === "注册成功"){
         this.$toast.success("注册成功")
         this.$router.push({name:"login"})
      }else{
        this.$toast.fail("注册失败")
      }
    },
  },
};
</script>

<style lang="less" scoped>
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