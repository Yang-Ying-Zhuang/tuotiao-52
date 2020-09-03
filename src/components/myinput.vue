<template>
  <input :type="type" class="hminput"
   @input="handlerClick"
  :value="value">
</template>

<script>
export default {
  props:{
      type:String,
      value:""
  },
   data(){
     return{
     }
   },
   methods:{
     handlerClick(e){
       this.$emit("input",e.target.value)
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