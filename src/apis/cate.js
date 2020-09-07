// 这个文件专门用来处理user表的数据请求的
import myaxios from "../utils/axios"



// 栏目
// > 接口类型:【GET】
// > 验证:【Authorization 】
// > 接口地址: 
// /category
export const category = ()=>{
  return myaxios({
     url:"/category"
  })
}

