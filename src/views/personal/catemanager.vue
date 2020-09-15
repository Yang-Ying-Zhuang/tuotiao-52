<template>
  <div>
    <myhead title="栏目管理">
      <div slot="left" class="iconfont iconjiantou2" @click="$router.back()"></div>
    </myhead>
    <div class="column">
      <div class="lanmu">
        <h3>点击删除以下频道</h3>
      </div>
      <div class="list">
        <span v-for="(value,index) in mycateList" :key="index" @click="mydelete(index,value)">{{value.name}}</span>
        <!-- <span>热点</span>
          <span>热点</span>
          <span>热点</span>
          <span>热点</span>
          <span>热点</span>
          <span>热点</span>
          <span>热点</span>
          <span>热点</span>
          <span>热点</span>
          <span>热点</span>
          <span>热点</span>
          <span>热点</span>
          <span>热点</span>
        <span>热点</span>-->
      </div>
    </div>
    <div class="columnlist">
      <div class="lanmu">
        <h3>点击添加以下频道</h3>
      </div>
      <div class="list">
        <span v-for="(value,index) in myatlarge" :key="index" @click="add(index,value)">{{value.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
 import myhead from "../../components/myhead";
 import { category } from "@/apis/cate"; // 栏目
export default {
  components: {
    myhead,
  },
  data(){
    return{
      mycateList:[], // 本有的栏目数据
      myatlarge:[] //未添加的栏目数据
    }
  },
  async mounted(){
    // 获取本地存储数据
    this.mycateList = JSON.parse(localStorage.getItem("youheima") || '[]');
        if (this.mycateList.length == 0){
          // 栏目数据
          let res = await category()
          // console.log(res);
          this.mycateList = res.data.data;

          // 由于 关注和头条不允许用户进行操作
          // 1.关注得根据用户登录状态进行处理，如果登录了就有关注，如果没有登录就没有关注
          // 2.头条不管用户是否登陆过都会默认展示在首页导航中，不允许用户进行操作
          if(localStorage.getItem("heima-52")){
            // 如果登陆过就应该有关注和头条，这两个不允许用户进行操作，所以将这两个数据移除
            this.mycateList.splice(0,2)

          }else{
            // 没有登陆过，也要移除头条栏目
             this.mycateList.splice(0,1)
          }
        }
    // 获取未添加的栏目数据
    this.myatlarge = JSON.parse(localStorage.getItem("meiheima") || '[]');
  },

  methods:{
    // 已添加的栏目
      mydelete(index,value){
         this.myatlarge.push(value)
         this.mycateList.splice(index, 1); 
    //设置本地存储,操作执行完之后，要记得将数据进行本地存储，否则下次打开的时候数据会还原
        localStorage.setItem("youheima",JSON.stringify(this.mycateList))
        localStorage.setItem("meiheima",JSON.stringify(this.myatlarge))
      },
    // 未添加的栏目
      add(index,value){
        this.mycateList.push(value),
        this.myatlarge.splice(index,1)
    // 设置本地存储,操作执行完之后，要记得将数据进行本地存储，否则下次打开的时候数据会还原
        localStorage.setItem("youheima",JSON.stringify(this.mycateList))
        localStorage.setItem("meiheima",JSON.stringify(this.myatlarge))
      }
    
  }
}
</script>

<style lang="less" scoped>
.column,
.columnlist {
  padding: 0 10px;
  margin-bottom: 20px;
  h3 {
    margin-bottom: 10px;
    line-height: 40px;
    font-weight: bold;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    span {
      margin: 6px 0;
      margin-left: 9px;
      width: 21%;
      line-height: 30px;
      border: 1px #ccc solid;
      text-align: center;
    }
  }
}
</style>