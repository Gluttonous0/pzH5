import axios from 'axios'
import store from './stroage'
import { Result } from '../types/api'
import { closeToast, showToast } from 'vant'

const http = axios.create({
  baseURL: 'https:/v3pz.itndedu.com/v3pz',
  timeout: 10000,
  headers: { terminal: 'h5' }
})

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    showToast({ type: 'loading', message: '加载中...', forbidClick: true, duration: 10000 })
    // 在发送请求之前做些什么
    const token = store.get('h5Token')
    //不需要添加token的api
    const whiteUrl = ['/get/code', '/user/authentication', '/login']
    if (token && !whiteUrl.includes(config.url as string)) {
      config.headers['h-token'] = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    //接口异常数据需要给用户提示
    const data: Result = response.data
    if (data.code === -1) {
      showToast({ type: 'fail', message: response.data.message, forbidClick: true })
    }
    if (data.code === -2) {
      showToast({ type: 'fail', message: '请重新登录', forbidClick: true })
      store.remove('h5Token')
      store.remove('h5UserInfo')
      store.remove('menuAside')
      window.location.href = window.location.origin + '/'
    }
    closeToast()
    return data.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    showToast({ type: 'fail', message: '系统异常', forbidClick: true })
    return Promise.reject(error)
  }
)

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return http.get(url, { params })
  },
  post<T>(url: string, params?: object): Promise<T> {
    return http.post(url, params)
  }
}
