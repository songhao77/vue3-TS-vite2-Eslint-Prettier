export interface IConfig {
  env: string
  mock?: boolean
  title: string
  baseUrl?: string // 项目地址
  baseApi?: string // api请求地址
  APPID?: string // 公众号appId  一般放在服务器端
  APPSECRET?: string // 公众号appScript 一般放在服务器端
  loading?: boolean
}

const dev: IConfig = {
  env: 'development',
  mock: false,
  title: '开发',
  baseUrl: 'http://130.54.3.153:9020',
  baseApi: '/',
  APPID: '',
  APPSECRET: '',
  loading: true
}

const prod: IConfig = {
  env: 'production',
  mock: false,
  title: '生产',
  baseUrl: '',
  baseApi: '',
  APPID: '',
  APPSECRET: '',
  loading: true
}

export const config: IConfig = import.meta.env.MODE === 'development' ? dev : prod
