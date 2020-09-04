import axios from "axios"
//暴露

axios.defaults.baseURL = "http://127.0.0.1:3000"

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config);
  // 获取koten
  let token = localStorage.getItem("heima-52")
  // 判断是否有token如果有，则以请求的方式进行传递
  if(token){
    config.headers.Authorization = token
  }
  // 可以拦截请求对报文进行处理，但是拦截器并不会代替你来请求，只是发送请求时所传递的报文数据进行必要处理
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


import { Toast } from 'vant';

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response);
  // 判断
  if(response.data.message == "用户信息验证失败" || response.data.message == "用户信息验证失败!"){
    // console.log(11);
    Toast.fail(response.data.message);
    window.location.href = "#/login"
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});



// export default axios.create({
//   baseURL:"http://127.0.0.1:3000"
// })

export default axios