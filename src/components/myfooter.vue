<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span class="comment">
        <i class="iconfont iconpinglun-" @click="$router.push({path:`/comment/${post.id}`})"></i>
        <em>{{post.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" @click="mycollect(post.id)" :class="{active:post.has_star}"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>

    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5"></textarea>
      <div>
        <span class="fason" @click="sendComment">发 送</span>
        <span @click="cancel">取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { collect,postcomment } from "@/apis/artcle"; // 收藏

export default {

  props: {
    post: {
      type: Object,
      required: true,
    },
    curren:{
      type:Object
    }
  },
  data() {
    return {
      isFocus: false, // 是否有焦点
      list:[]
    };
  },
  methods: {
    // 取消
    cancel(){
      this.isFocus = false
      this.$refs.commtext.value = "",
      // 发出事件，让父组件将这个评论对象重置为null
      this.$emit("cancelclick")
    },
    //   获取焦点时触发
    handlerFocus() {
      this.isFocus = !this.isFocus;
     setTimeout(()=>{
        // 让文本域聚焦
      this.$refs.commtext.focus();
     },100)
  
    },

    // 评论发布
    async sendComment(e){
      //  console.log(this.$refs.commtext.value);
      // 获取文本框内容
      let data = { content:this.$refs.commtext.value }
      //判断this.curren有没有值
       if(this.curren){
            // 获取回复评论当前id
           data.parent_id = this.curren.id
       }
      // console.log(data);
      let res = await postcomment(this.post.id,data)
      // console.log(res);
      this.$toast.success( res.data.message)
      this.$emit("click",e)
      this.$refs.commtext.value = ""
      this.isFocus = false
    },

    // 点击收藏
    async mycollect(id) {
       const res = await collect(id);
       this.$toast.success(res.data.message);
       this.post.has_star = !this.post.has_star;
    },
  },

   // 监听curren 的值的变化
  watch:{
   curren(newv,oldv){
    //  console.log(newv,oldv);
  // 只有用户点击回复，才出弹框
   if(this.curren){
       this.isFocus = true
    }
   }
  },

};
</script>

<style lang='less' scoped>
.comment {
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 0;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
  .fason{
    margin-bottom: 10px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  .active {
    color: red;
  }

  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
