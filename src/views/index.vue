<template>
  <div class="app">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" />
      </div>
    </div>
    <div>
      <van-tabs v-model="active" scrollspy swipeable>
        <van-tab  v-for="(value,index)  in cateList" :key='index' :title="value.name">11</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import {category} from "../apis/cate";
export default {
  components: { category },

  data() {
    return {
      active: "",
      cateList:{}
    };
  },
  async mounted(){
     // 获取用户id
    this.active == localStorage.getItem("heima-52") ? 1 : 0
    const res = await category()
    console.log(res);
    this.cateList = res.data.data
    
   
    
  }
//  @click="onClick"
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 40px;
  background-color: #ff0000;
  color: #ffffff;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  .iconfont {
    font-size: 50px;
    color: #ffffff;
  }
  .user {
    font-size: 20px;
  }
  .search {
    position: relative;
    flex: 1;
    height: 30px;
    line-height: 30px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    margin: 0 10px;
    text-align: center;
    .van-icon {
      font-size: 20px;
      position: absolute;
      left: 28%;
      top: 19%;
    }
  }
}
</style>