<template>
  <div class="app">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({path:'/search'})">
        <van-icon name="search"/>
        <span>搜索商品</span>
      </div>
      <div class="user">
        <van-icon name="manager-o" @click="mycenter"/>
      </div>
    </div>
    <div>
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="(value,index)  in cateList" :key="index" :title="value.name">
          <!-- <div style="width:100%;height:400px;background:red">{{index}}</div> -->
          <!-- 上拉加载更多数据 -->
          <van-list
            v-model="value.loading"
            @load="onLoad"
            :finished="value.finished"
            :offset="10"
            finished-text="没有更多了">
            <!-- 下拉刷新 -->
            <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
              <mynews v-for="(v,i) in value.postlist" :key="i" :post="v"></mynews>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { category } from "../apis/cate"; // 栏目
import { getartcle } from "../apis/artcle"; // 文章
import mynews from "../components/myjournalism";

export default {
  components: { category, getartcle, mynews },

  data() {
    return {
      // 判断用户是否登录，都应该让头条栏目默认选中，所以要根据用户的登录状态进行索引的设置
      active: localStorage.getItem("heima-52") ? 1 : 0,
      cateList: [], // 栏目列表数据
    };
  },

  methods: {
    // 上拉加载更多数据
    onLoad() {
      // console.log(11);
      //在开发中不用加时
      setTimeout(async () => {
        this.cateList[this.active].pageIndex++;
        let posts = await getartcle({
          category: this.cateList[this.active].id,
          pageIndex: this.cateList[this.active].pageIndex,
          pageSize: this.cateList[this.active].pageSize,
        });
        // 将获取的数据存储到当前栏目的postlist数组中--追加
        this.cateList[this.active].postlist.push(...posts.data.data);
        // 本次请求完毕，将loading重置false,以便让用户可以继续加载下一页数据，否则‘正在加载中。。。’
        this.cateList[this.active].loading = false;
        // 经过本次请求之后，如果所有数据都加载完毕了则需要finished重置为true.标记所有数据加载完毕，后续请求不再响应
        if (posts.data.data.length < this.cateList[this.active].pageSize) {
          this.cateList[this.active].finished = true;
        }
      }, 2000);
    },
    // 下拉刷新
    onRefresh() {
      // 重新加载第一页
      // 1. 重置页码到1
      this.cateList[this.active].pageIndex = 1;
      //2. 数据清空
      this.cateList[this.active].postlist.length = 0;
      // 3.发起数据请求获取数据，//在开发中不用加时
      setTimeout(async () => {
        let posts = await getartcle({
          category: this.cateList[this.active].id,
          pageIndex: this.cateList[this.active].pageIndex,
          pageSize: this.cateList[this.active].pageSize,
        });
        // 将获取的数据存储到栏目的postList数组中--追加
        this.cateList[this.active].postlist.push(...posts.data.data);
        // 将isLoading 重置为false
        this.cateList[this.active].isLoading = false;
        // 将finished 重置为false,否则不能再进行上拉加载
        this.cateList[this.active].finished = false;
      }, 2000);
    },
    
    // 加载文章数据
    async init() {
      // 加载这个栏目的文章数据
      let posts = await getartcle({
        category: this.cateList[this.active].id, // 当前栏目文章的每个数据
        pageIndex: 1, //这个栏目每页所显示的记录数
        pageSize: 5, // 这个栏目 当前的页码
      });
      this.cateList[this.active].postlist = posts.data.data;
      // console.log(this.cateList);
    },
   
   // 跳转到个人中心
   mycenter(){
     const id = JSON.parse(localStorage.getItem("hei-52") || "{}").id
    //  console.log(id);
     this.$router.push({path:`/personal/${id}`})
   },

  },

  watch: {
    async active() {
      // console.log(this.cateList[this.active].id);
      //文章数据 加载这个栏目的文章的数据
      //   let posts = await getartcle({
      //   category: this.cateList[this.active].id, //当前分类对应的文章数据
      //   pageIndex: 1,
      //   pageSize: 10
      // });
      // //  console.log(posts);
      // // 将获取的数据存储到当前目录的postlist数组中
      // this.cateList[this.active].postlist = posts.data.data;
      // console.log(this.cateList);

      //封装调用文章数据 加载这个栏目的文章的数据
      this.init();

      // 我们得判断下当前的切换是否第一次切换，如果是 才进行数据的获取，否则不获取
      if (this.cateList[this.active].postlist.length == 0) {
        this.init();
      }
    },
  },

  async mounted() {
    // 获取原有 youheima 的存储数据，一开始是没有数据
    this.cateList = JSON.parse(localStorage.getItem("youheima") || "[]")
    // 判断一下this.cateList是索引数据是不是等于0,
    if(this.cateList.length == 0){
       // 栏目请求的数据
       const res = await category();
       // console.log(res);
       this.cateList = res.data.data;

    // 由于本地存储中并没有和头条这两个栏目，意味着我们需要进行相应的数据添加
    }else{
      // 如果登录过，就应该添加关注和头条
      if(localStorage.getItem("heima-52")){
        // 通过unshift方法可以接收两个对象追加: 可以将的指定的元素添加到数据的最前面
        this.cateList.unshift(
          {id:0,name:"关注",is_top:1},
          {id:999,name:"头条",is_top:1},
          )
          
       // 如果没有登录过，就只添加头条   
      }else{
         this.cateList.unshift({id:999,name:"头条",is_top:1})
      }
    }

    // 改造数据为复合我们业务需求的各式，简单说就是为数据添加的成员
    this.cateList = this.cateList.map((value) => {
      // console.log(value);
      return {
        ...value, //展开对象，我要这个对象的所有成员
        postlist: [], //这个栏目的新闻列表数据
        pageIndex: 1, //这个栏目每页所显示的记录数
        pageSize: 5, // 这个栏目 当前的页码
        loading: false, // 这个栏目的加载状态
        finished: false, //这个栏目的数据是否加载完毕
        isLoading: false, // 上拉刷新加载数据
      };
    });
    // console.log(this.cateList);

    // 加载当前栏目文章的数据
    this.init();

    // 添加doc元素，原生操作加号功能
     document.querySelector(".van-sticky").onclick = (e)=>{
          // console.log(e.target.className);
          // 判断获取类名
          if(e.target.className == "van-sticky"){
             this.$router.push({path:"/catemanager"})
          }
     }
       
  

  },
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
/deep/.van-sticky{
  padding-right: 50px;
  &::after{
    content: '+';
    position: absolute;
    width: 51px;
    height: 44px;
    background-color: #fff;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 42px;
    font-size: 35px;
  }
}
</style>