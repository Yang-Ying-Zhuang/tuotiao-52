<template>
  <div>
    <myhead title="编辑个人资料">
      <div slot="left" class="iconfont iconjiantou2" @click="$router.back()"></div>
      <div slot="right" class="manager"  @click="$router.push({path:'/'})">
        <van-icon name="wap-home-o"/>
      </div>
      
    </myhead>
    <div class="myimg">
      <img :src="msg.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <mycell title="昵称" :desc="msg.nickname" @click="nickshow = !nickshow"></mycell>
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="clickNickname">
      <!-- <van-field label="昵称" placeholder="请输入用户名" /> -->
      <van-field
        :value="msg.nickname"
        required
        label="文本"
        placeholder="请输入手机号"
        ref="nick"
        @input="getuser"
      />
    </van-dialog>

    <mycell title="密码" :desc="msg.password" type="password" @click="namePassword = !namePassword"></mycell>
    <van-dialog
      v-model="namePassword"
      title="修改密码"
      show-cancel-button
      @confirm="updatepassword"
      :before-close="beforeclose"
    >
      <van-field
        label="原密码"
        placeholder="请输入密码"
        type="text"
        :value="yuanpass"
        @input="yuanpassword"
      />
      <van-field
        label="新密码"
        placeholder="请输入密码"
        type="password"
        :value="xinpass"
        @input="xinpassword"
      />
    </van-dialog>

    <mycell title="性别" :desc="msg.gender==1?'男':'女'" @click="usergender = !usergender"></mycell>
    <van-dialog v-model="usergender" title="请选择性别" show-cancel-button @confirm="clickgender">
      <van-picker :columns="columns" @change="onChange" />
    </van-dialog>
  </div>
</template>

<script>
// 引入头部
import myhead from "../../components/myhead";
// 引入单元表格
import mycell from "../../components/mycell";
//引入请求的数据
import { getUserById, editPersonalInfo } from "../../apis/user";
// 引入基准路径
import URL from "@/utils/axios";
// 引入上传文件
import { upfile } from "../../apis/fileUpload.js";

export default {
  components: {
    myhead,
    mycell,
    upfile,
    URL,
    editPersonalInfo,
  },
  data() {
    return {
      msg: {},
      nickshow: false,
      username: "",
      namePassword: false,
      yuanpass: "",
      xinpass: "",
      usergender: false,
      columns: ["女", "男"],
      genderindex: "",
    };
  },
  async mounted() {
    // console.log(this.$route.params.id);
    const id = this.$route.params.id;
    const res = await getUserById(id);
    // console.log(res);
    if (res.data.message === "获取成功") {
      this.msg = res.data.data;

      //  对图片处理
      //  1、如果有图片数据，应该在路径前面拼接基准路径
      //  2、如果没有图片数据，也应该赋值一个默认图片路径
      if (res.data.data.head_img) {
        //  console.dir(URL);
        //  console.log(URL.defaults.baseURL);
        this.msg.head_img = URL.defaults.baseURL + res.data.data.head_img;
      } else {
        this.msg.head_img =
          URL.defaults.baseURL + "/uploads/images/default.png";
      }
    } else {
      this.$toast.fail("获取失败");
    }
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // file.file:是当前的文件对象
      // console.log(file);
      let formdata = new FormData();
      formdata.append("file", file.file);
      let res = await upfile(formdata);
      // console.log(res);
      if (res.data.message === "文件上传成功") {
        this.msg.head_img = URL.defaults.baseURL + res.data.data.url;
        // 上传文件成功文件，立刻进行用户图像的更新,注意所需要的参数数据是后台返回的图片的目录数据，而不是包含了服务器地址的
        // console.log(this.msg.id);
        let result = await editPersonalInfo(this.msg.id, {
          head_img: res.data.data.url,
        });
        // console.log(result);
        if (result.data.message === "修改成功") {
          this.$toast.success("修改用户头像成功");
        } else {
          this.$toast.fail("修改用户头像失败");
        }
      } else {
        this.$toast.fail("上传文件失败");
      }
    },
    getuser(data) {
      // console.log(data);
      this.username = data;
    },
    async clickNickname() {
      // input:封装的van-filed中，文本框的ref值就是input
      // console.log(this.$refs.nick.$refs.input.value);
      // console.log(this.username);
      if (this.username.trim() !== "" || this.username != "") {
        let str = await editPersonalInfo(this.msg.id, {
          nickname: this.username,
        });
        // console.log(str);
        if (str.data.message === "修改成功") {
          this.msg.nickname = this.username;
          this.$toast.success("修改用户名成功");
        } else {
          this.$toast.fail("修改用户名失败");
        }
      } else {
        this.$toast.fail("用户名不能为空");
      }
    },
    // 原密码
    yuanpassword(data) {
      this.yuanpass = data;
    },
    // 新密码
    xinpassword(resdata) {
      this.xinpass = resdata;
    },
    async updatepassword() {
      // console.log(this.yuanpass);
      if (this.yuanpass != "" || this.xinpass != "" ) {
        if (this.yuanpass == this.msg.password) {
          const str = await editPersonalInfo(this.msg.id, {
            password: this.xinpass,
          });
          console.log(str);
          if (str.data.message === "修改成功") {
            this.msg.password = this.xinpass;
            this.$toast.success("修改密码成功");
            // 请空原密码
            this.yuanpass = this.xinpass = "";
          } else {
            this.$toast.fail("修改密码失败");
          }
        } else {
          this.$toast.fail("密码错误");
        }
      } else {
        this.$toast.fail(" 密码不能为空");
      }
    },
    // 阻止密码错误关闭，用户体验
    beforeclose(action, done) {
      //  console.dir(action)
      //  console.dir(done)
      if (action == "confirm") {
        if (this.yuanpass !== this.msg.password) {
          done(false);
        } else {
          done();
        }
      } else {
        // 请空原密码
        this.yuanpass = this.xinpass = "";
        done();
      }
    },

    // 男和女
    onChange(a, gender, index) {
      this.genderindex = index;
    },
    async clickgender() {
      // console.log(this.genderindex);
      let str = await editPersonalInfo(this.msg.id, {
        gender: this.genderindex,
      });
      // console.log(str);
      if (str.data.message === "修改成功") {
        this.msg.gender = this.genderindex;
        this.$toast.success("修改性别成功");
      } else {
        this.$toast.fail("修改性别失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.manager{
  font-size: 26px;
  color: red;
}
.myimg {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 140px;
  img {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    border-radius: 50px;
  }
  /deep/.van-uploader__upload {
    width: 90 / 360 * 100vw;
    height: 90 / 360 * 100vw;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>