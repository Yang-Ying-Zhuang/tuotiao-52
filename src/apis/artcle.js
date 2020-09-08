// 这个文件专门用来处理user表的数据请求的
import myaxios from "../utils/axios"


// 文章列表
// > 接口类型:【GET】
// > 接口地址: 
// /post
export const getartcle = (data)=>{
  return myaxios({
     url:"/post",
     params:data
  })
}

