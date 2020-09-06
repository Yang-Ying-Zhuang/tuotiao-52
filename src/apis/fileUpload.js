// 这个文件专门用来处理user表的数据请求的
import myaxios from "../utils/axios"

// 文件上传
// 接口类型:【POST】
// 需要验证:【Authorization 】
// 接口地址: 
export const upfile = function(data){
  return myaxios({
    method:"post",
    url:"/upload",
      // 如果传入的参数是formdata,就可以直接作为参数
    data
  })

}