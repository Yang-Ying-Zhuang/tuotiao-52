import axios from "axios"
//暴露
export default axios.create({
  baseURL:"http://127.0.0.1:3000"
})