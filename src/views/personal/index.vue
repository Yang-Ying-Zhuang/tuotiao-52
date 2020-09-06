<template>
  <div class="personal">
    <router-link :to="`/editprofile/`+ msg.id">
      <div class="profile">
        <img :src="baseURL + msg.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan">{{msg.nickname}}</span>
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <hmcell title="我的关注" desc="关注的用户"></hmcell>
    <hmcell title="我的跟帖" desc="跟帖/回复"></hmcell>
    <hmcell title="我的收藏" desc="文章/视频"></hmcell>
    <hmcell title="设置"></hmcell>
    <mybutton class="btn">退出</mybutton>
  </div>
</template>

<script>
// 引入表单单元格
import hmcell from "@/components/mycell"
// 引入按钮
import mybutton from "@/components/mybutton"
//引入请求的数据
import {getUserById} from "@/apis/user"
// 引入基准路径
import URL from "@/utils/axios"

export default {
  components:{
    hmcell,mybutton,getUserById
  },
  data(){
    return{
     msg:{},
     baseURL:""
    }
  },

 async mounted(){
  //  console.dir(URL);
    // console.log(this.$route.params.id);
    const id = this.$route.params.id
    const res = await getUserById(id)
    // console.log(res);
    if(res.data.message === "获取成功"){
       this.msg = res.data.data
       this.baseURL = URL.defaults.baseURL
    }else if(res.data.message === "用户信息验证失败"){
       this.$route.push({name:login})
    }
  }

};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
 
 .btn{
    width: 90%;
    background-color: #e22018;
   margin: 20px auto 0px;
  }
</style>