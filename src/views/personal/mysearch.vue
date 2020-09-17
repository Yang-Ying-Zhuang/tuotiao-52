<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search v-model="userkey" placeholder="请输入搜索关键词" shape="round"></van-search>
      <div @click="onSearch">搜索</div>
    </div>
    <div class="historyList1">
      <h2>历史记录</h2>
      <p v-for="(v,index) in historyList" :key="index" to @click="onSearch(v)">{{v}}</p>
    </div>
    <div class="historyList2">
      <h2>搜索结果</h2>
      <router-link
        v-for="(value,index) in list"
        :key="index"
        :to="'/article/'+ value.id"
      >{{value.title}}</router-link>
    </div>
  </div>
</template>

<script>
import { search } from "../../apis/artcle";
import { login } from "../../apis/user";
export default {
  data() {
    return {
      userkey: "",
      list: [],
      historyList: [],
    };
  },
  methods: {
    async onSearch(key) {
      // 有没有传值 值不能是事件对象  不能空字符
      if (key && typeof key != "object" && key.trim()) {
        this.userkey = key;
      }

      const res = await search(this.userkey);
      console.log(res);
      this.list = res.data.data;

      // 搜索历史不止一个，允许用户存储多个关键字，所以它的本质应该是一个数组
      let arr = JSON.parse(localStorage.getItem("heiamSearch") || "[]");
      // 将本次的关键字添加到数组,加在最前面
      arr.unshift(this.userkey);
      // 将当前关键字添加到本地存储
      // localStorage.setItem("heiamSearch", JSON.stringify(arr));
      // this.historyList.unshift(this.userkey);

      //1.判断当前关键字是否已经存在，如果存在，则删除再添加
      // 2.判断当前关键字的数量是否超出，如果超出，则先删除再添加
      if (key && typeof key == "object") {
        // 说明这里是单机搜索按钮
        if (arr.length >= 3) {
            arr.pop();
        }
        let index = arr.indexOf(this.userkey);
        if (index != -1) {
          // 如果有值的存在，满足多个删除一个
          arr.splice(index, 1);
        }
        arr.unshift(this.userkey);
        localStorage.setItem("heiamSearch", JSON.stringify(arr));
        // 重新获取更新之后的本地存储数据
        this.historyList = JSON.parse(localStorage.getItem("heiamSearch") || "[]");
        // arr.historyList.unshift(this.userkey)
      }
    },
  },
  mounted() {
    this.historyList = JSON.parse(localStorage.getItem("heiamSearch") || "[]" );
  },
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}

.historyList1,
.historyList2 {
  padding: 10px;
  border-bottom: 1px solid #ccc;

  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    line-height: 30px;
    border-bottom: 1px dashed orange;
  }
}
</style>