import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

import { Dialog, Toast } from 'vant'
import { config } from '../config/index'

const request = axios.create({
  baseURL: `${config.baseApi}api`,
  timeout: 5000,
  withCredentials: false
  // headers: {
  // 	// clear cors
  // 	'Cache-Control': 'no-cache',
  // 	Pragma: 'no-cache'
  // }
})

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.loading) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    }
    // 在此处添加请求头等，如添加 token
    // if (store.state.token) {
    // config.headers['Authorization'] = `Bearer ${store.state.token}`
    // }
    console.log('1111')
    return config
  },
  (err: any) => {
    Promise.reject(err)
  }
)

request.interceptors.response.use(
  async (response: AxiosResponse) => {
    Toast.clear()
    const res = response.data
    if (res.code !== '200') {
      if (res.code === 401) return false
      if (res.code === 403) {
        Dialog.alert({
          title: '警告',
          message: res.msg
        }).then(() => {
          // do
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return response.data
  },
  (error: any) => {
    Toast.clear()
    let errorMsg = ''
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          errorMsg = '请求错误(400)'
          break
        case 401:
          errorMsg = '未授权,请登录(401)'
          break
        case 403:
          errorMsg = '拒绝访问(403)'
          break
        case 404:
          errorMsg = `请求地址出错: ${error.response.config.url}`
          break
        case 405:
          errorMsg = '请求方法未允许(405)'
          break
        case 408:
          errorMsg = '请求超时(408)'
          break
        case 500:
          errorMsg = '服务器内部错误(500)'
          break
        case 501:
          errorMsg = '服务未实现(501)'
          break
        case 502:
          errorMsg = '网络错误(502)'
          break
        case 503:
          errorMsg = '服务不可用(503)'
          break
        case 504:
          errorMsg = '网络超时(504)'
          break
        case 505:
          errorMsg = 'HTTP版本不受支持(505)'
          break
        default:
          errorMsg = `连接错误: ${error.message}`
      }
    } else {
      if (error.message === 'Network Error') errorMsg = '网络异常，请检查后重试！'
      errorMsg = '连接到服务器失败，请联系管理员'
    }
    Toast(errorMsg)
    return Promise.reject(error)
  }
)
export default request
