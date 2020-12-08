/**
 * 封装Axios
 * 处理请求、响应错误信息
 */
import { ElMessage } from 'element-plus'
import axios from 'axios' // 引用axios

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:3000/web/api/', // 所有异步请求都加上/api,nginx转发到后端Springboot
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['-Token'] = getToken()
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data // res is my own data
    // console.log(res)
    if (res.status === 200 || res.ok === 1) {
      return Promise.resolve(res)
    } else {
      ElMessage.error(res.msg)
      return Promise.reject(new Error(res.msg || 'Error'))
    }
  },
  error => {
    console.log('err' + error) // for debug
    ElMessage.error(error)
    return Promise.reject(error)
  }
)

export default service // 导出封装后的axios
