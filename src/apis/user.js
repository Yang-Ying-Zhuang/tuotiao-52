// 这个文件专门用来处理user表的数据请求的
import myaxios from "../utils/axios"

export const login = function(data){
  // axios方法返回的是一个promise对象，用户接收之后可以then和catch
  return myaxios({
    method:"post",
    url:"/login",
    data
  })
}