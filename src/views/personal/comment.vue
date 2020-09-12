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
          <span @click="myreply(value)">回复</span>
        </div>
        <!-- 判断到底需不需要成一级评论的结构 -->
        <commentitle :parent="value.parent" v-if="value.parent"></commentitle>
        <div class="text">{{value.content}}</div>
      </div>
    </div>
    <myfooter :post="article" :curren="reqly" @click="myclick"></myfooter>
  </div>
</template>

<script>
import myheader from "@/components/myhead.vue";
import {comment,getartcle} from "@/apis/artcle" //评论请求
import axios from "../../utils/axios.js"
import commentitle from "../../components/commentitle.vue"
import myfooter from "../../components/myfooter" // 底部

export default {

  components: {
    myheader,commentitle,myfooter
  },
  data(){
    return{
      comment:[], //数据
      article:{}, // 评论id
      reqly:{}    // 回复评论
    }
  },
 async mounted(){
    // 调用封装
    this.init()

    // 获取文章详情id数据
    let res2 = await getartcle(this.$route.params.id)
    this.article = res2.data.data[0]
  },

  methods:{
    // 封装
  async init(){
      let res = await comment(this.$route.params.id,{pageSize:50,pageIndex:1})
      // console.log(res);
     this.comment = res.data.data.map((value)=>{
      // console.log(value);
       value.user.head_img = axios.defaults.baseURL + value.user.head_img
       return value
      }); 
    },

    // 回复点击事件
    myreply(value){
      console.log(value);
       this.reqly = value
    },
    // 子传父的刷新页面
    myclick(e){
     this.init();
    //  scrollTo:让页面滚动到指定位置
     window.scrollTo(0,0)
    }
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