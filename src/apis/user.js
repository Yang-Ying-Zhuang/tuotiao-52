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

// ### 编辑用户信息
// > 接口类型:【POST】
// > 需要验证:【Authorization 】
// > 接口地址: 
// /user_update/:id
export const editPersonalInfo = (id,data)=>{
  return myaxios({
    method:"POST",
    url:`/user_update/${id}` ,
    data
  })
}

