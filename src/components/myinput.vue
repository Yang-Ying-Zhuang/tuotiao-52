<template>
  <input class="hminput"
   @input="handlerClick"
  :value="value"
  :class="{success:statu,error:!statu}"
  @change="handChange">
</template>

<script>
export default {
  props:{
      value:"",
      rules:RegExp, // 代表正则规则
      msg:String // 代表输入不合法的验证消息
  },
   data(){
     return{
       statu:true
     }
   },

   methods:{
     handlerClick(e){
      //  console.log(e.target.value);
      // 事件触发，用户和密码输入就触发
      let value = e.target.value
      // test则重的是匹配,验证当前用户的输入是否合法
      if(this.rules && this.rules.test(value)){
        //  console.log("成功");
         this.statu = true
      }else{
         this.statu = false
      }
       this.$emit("input",value)

     },
      handChange(e){
      let value = e.target.value
      if(this.rules && !this.rules.test(value)){
         this.$toast.fail({
           message:this.msg || "输入不正确",
           duration:3000
         })
      }

    }
  }
  
}
</script>

<style lang="less" scoped>
 .hminput{
        width:318/360*100vw;
        height: 60px;
        outline:none;
        border:none;
        border-bottom: 3px solid #ccc;
        font-size: 20px;
        line-height: 60px;
    }
    .success{
        border-bottom-color:green;
    }
    .error{
        border-bottom-color:red;
    }
</style>