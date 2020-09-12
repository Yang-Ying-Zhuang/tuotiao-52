<template>
  <div class="comments">
    <myheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="lists" v-for="(value) in comment" :key="value.id">
      <div class="item">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <!-- 判断到底需不需要成一级评论的结构 -->
        <commentitle :parent="value.parent" v-if="value.parent"></commentitle>

        <div class="text">{{value.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/myhead.vue";
import {comment} from "../../apis/artcle" //评论请求
import axios from "../../utils/axios.js"
import commentitle from "../../components/commentitle.vue"

export default {

  components: {
    myheader,comment,commentitle
  },
  data(){
    return{
      comment:[]
    }
  },
 async mounted(){
    let res = await comment(this.$route.params.id,{pageSize:50,pageIndex:1})
    console.log(res);
    this.comment = res.data.data.map((value)=>{
      // console.log(value);
       value.user.head_img = axios.defaults.baseURL + value.user.head_img
       return value
    })
      
  }
};
</script>

<style lang='less' scoped>
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>