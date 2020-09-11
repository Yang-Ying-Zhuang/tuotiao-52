<template>
  <div>
    <myheader title="我的关注">
      <div slot="left" class="iconfont iconjiantou2" @click="$router.back()"></div>
    </myheader>
      <div class="focus" v-for="(value,index) in list" :key="index">
        <div class="list">
          <div class="box">
            <img :src="url + value.head_img" alt />
            <div class="center">
              <p>{{value.nickname}}</p>
              <span>2019-9-9</span>
            </div>
            <span @click="myclick(value.id)">取消关注</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import myheader from "../../components/myhead";
import {interest,attention, unfriended } from "../../apis/user"; // 关注和取消关注
import axios from "../../utils/axios"
export default {
  components: {
    myheader,interest,attention,unfriended
  },
  data(){
    return{
      list:[],
      url:""
    }
  },
  async mounted(){
    this.init()
      // const res = await interest()
      // //  console.log(res);
      // this.list = res.data.data
      // this.url = axios.defaults.baseURL
      // this.list = this.list.map((value)=>{
      //   return value
      // })
  },
  methods:{
    // 封装 取消关注
     async init(){
        const res = await interest()
      //  console.log(res);
      this.list = res.data.data
      this.url = axios.defaults.baseURL
      this.list = this.list.map((value)=>{
        return value
      })
     },

   async myclick(id){
      const data = await unfriended(id)
      // console.log(data);
      this.$toast.success(data.data.message)
      this.init()
    }
  }
};
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>

   