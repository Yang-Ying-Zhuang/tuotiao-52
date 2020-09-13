<template>
  <div class="commentItem">
      <!-- 渲染存储上级评论 -->
      <mycommitem 
      :parent="parent.parent"
      v-if="parent.parent"
      @childtheparent="child">
      </mycommitem>

      <div class="top">
          <div class="left">
              <span>{{parent.user.nickname}}</span> &nbsp;&nbsp;&nbsp;
              <span>2分钟前</span>
          </div>
          <span @click="child(parent)">回复</span>
      </div>
    
      <div class="bottom">{{parent.content}}</div>
  </div>
</template>

<script>
export default {
   // 如果为组件设置了，name属性，那么这个name属性就相当注册了当前的组件，可以直接使用
  name:"mycommitem",
    // 调用这个组件时，评论数据的parent
    props:['parent'],
   
   methods:{
       child(comment){
          this.$emit("childtheparent",comment)
       }
   }
}
</script>

<style lang='less' scoped>
    .commentItem{
        border: 1px solid #ccc;
        padding: 5px;
        margin-top: 10px;
        .top{
            font-size: 12px;
            color: #aaa;
            display: flex;
            justify-content: space-between;
        }
        .bottom{
            font-size: 13px;
            line-height: 40px;
        }
    }
</style>