<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()"/>
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="myattention" :class="{active:list.has_follow}">{{list.has_follow?"取消关注":"关注"}}</span>
    </div>
    <div class="detail">
      <div class="title">{{list.title}}</div>
      <div class="desc">
        <span>{{list.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-html="list.content" v-if="list.type == 1"></div>
       <!-- <div class="content"></div> -->
      <video v-if="list.type == 2 "
        :src="list.content"
        autoplay
        loop
        poster="https://img.tupianzj.com/uploads/allimg/140710/1-140G01010250-L.jpg"
        controls>
      </video>

      <div class="opt">
        <span class="like" @click="zanclick" :class="{active:list.has_like}">
          <van-icon name="good-job-o"/>{{list.like_length}}赞
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="@/assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 底部 -->
    <myfooter class="bibu" :post="list"></myfooter>
  </div>
</template>

<script>
import { articledetails } from "../../apis/fileUpload"; // 文章详情
import { attention, unfriended } from "../../apis/user"; // 关注和取消关注
import { give } from "../../apis/artcle"; // 点赞]
import myfooter from "../../components/myfooter" // 底部

export default {
  components: { articledetails, attention, unfriended, give,myfooter },
  data() {
    return {
      list: {}, // 文章详情数据
    };
  },

  async mounted() {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    const id = this.$route.params.id;
    // 文章详情
    const res = await articledetails(id);
    console.log(res);
    this.list = res.data.data;
  },
  methods: {
    async myattention() {
      let data;
      // 判断用户有没有关注，如果关注了则取消，如果未关注 则关注
      if (this.list.has_follow) {
        data = await unfriended(this.list.user.id);
        // console.log(data);
      } else {
        data = await attention(this.list.user.id);
        // console.log(data);
      }
      this.list.has_follow = !this.list.has_follow;
      this.$toast.success(data.data.message);
    },

    // 点赞
    async zanclick() {
      let result = await give(this.list.id);
      // console.log(result);
        this.list.has_like = !this.list.has_like
       if(this.list.has_like){
         this.list.like_length = this.list.like_length +1
       }else{
         this.list.like_length = this.list.like_length -1
       }
       this.$toast.success(result.data.message);
    },
  },
};
</script>

<style lang='less' scoped>

.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: red;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
  }
  > .active {
    background-color: green;
    color: #fff;
    border: 1px solid #000;
  }
}
.detail {
   video{
  width: 100%;
}
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/ img {
      display: block;
      width: 100%;
    }
  }
 
}
.opt {
  padding-top: 30px;
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
     > span {
         background-color:red;
      }
  }
  .active{
    background-color:green;
    font-size: #fff;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px 60px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
