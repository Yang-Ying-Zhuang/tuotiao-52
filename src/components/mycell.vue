<template>
  <div class="cell" @click="myclick">
      <div class="left">{{title}}</div>
      <div class="right">{{type==='password'?'******':desc}}
        <span class="iconfont iconjiantou1"></span>
      </div>
      <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    title:String,
    desc:String,
    type:String
  },
  methods:{
    myclick(e){
      this.$emit("click",e)
    },
  }
}
</script>

<style lang='less' scoped>
.cell{
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    > .right{
        font-size: 13px;
        color: #888;
    }
}
</style>