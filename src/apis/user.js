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

// 这个方法是一个需要授权认证的方法，所以需要手动的传递token
// 1.手动接收：登录成功之后能够获取到token
// 2.手动存储：本地存储
// 3.手动传递：通过axios的headers配置选项进行传递
// 接口类型:【GET】
// 需要验证:【 Authorization 】
// 接口地址: 
export const getUserById = (id)=>{
  return myaxios({
    url:`/user/${id}`,
    // 自定义的请求头，用于提供授权谁
    //headers:{后台规定的key:token}
    // headers:{Authorization:localStorage.getItem("heima-52")}
  })
}