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
          this.mycateList = res.data.data
        }

    // 获取为添加的栏目数据
    this.myatlarge = JSON.parse(localStorage.getItem("meiheima") || '[]');
  },
  methods:{
    // 已添加的栏目
      mydelete(index,value){
         this.myatlarge.push(value)
         this.mycateList.splice(index, 1); 
         //设置本地存储
        // localStorage.setItem("youheima",JSON.stringify(this.mycateList))
        
      },
    
    // 为添加的栏目
      add(index,value){
        console.log(index,value);
        this.mycateList.push(value),
        this.myatlarge.splice(index,1)
        // 设置本地存储
        // localStorage.setItem("meiheima",JSON.stringify(this.mycateList))
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