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

//收藏
// > 接口类型:【GET】
// > 需要验证:【Authorization 】
// > 接口地址: 
// /post_star/:id
export const collect = (id)=>{
  return myaxios({
     url:`/post_star/${id}`
  })
}

// 评论列表
// > 接口类型:【GET】
// > 接口地址: 
// /post_comment/:id
export const comment = (id,params)=>{
  return myaxios({
     url:`/post_comment/${id}`,
     params
  })
}



// 发布评论
// > 接口类型:【POST】
// > 需要验证:【Authorization 】
// > 接口地址: 
// /post_comment/:id
export const postcomment = (id,data)=>{
  return myaxios({
    method:"post",
     url:`/post_comment/${id}`,
     data
  })
}

// 文章搜索
// > 接口类型:【GET】
// > 接口地址: 
// /post_search
export const search = (keyword)=>{
  return myaxios({
     url:`/post_search`,
     params:{keyword}
  })
}


