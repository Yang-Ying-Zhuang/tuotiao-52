<template>
  <div class="cell">
      <div class="left">{{title}}</div>
      <div class="right">{{desc}}<span class="iconfont iconjiantou1"></span></div>
      <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    title:String,
    desc:String
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