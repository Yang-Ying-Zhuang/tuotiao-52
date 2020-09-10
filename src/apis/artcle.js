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

// 点赞数据
// > 接口类型:【GET】
// > 需要验证:【Authorization 】
// > 接口地址: 
// /post_like/:id
export const give = (id)=>{
  return myaxios({
     url:`/post_like/${id}`
  })
}


