<template>
   <div>
     <myheader title="我的收藏">
      <div slot="left" class="iconfont iconjiantou2" @click="$router.back()"></div>
    </myheader>
    <myjournalism :post="value" v-for="(value,index) in data" :key="index"></myjournalism>
   </div>
</template>

<script>
import myheader from "../../components/myhead" 
import myjournalism from "../../components/myjournalism"
import {collect} from "../../apis/user"
export default {
   components: {
     myheader,myjournalism
   },
   data(){
     return{
       data:[]
     }
   },

  async mounted(){
     const res = await collect()
    //  console.log(res);
     this.data = res.data.data
   }
}
</script>

<style>

</style>