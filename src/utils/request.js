import axios from 'axios'
// import store from '@/store'
// import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'

const service = axios.create({
      baseURL: process.env.VUE_APP_BASE_API,
      timeout:10000
})

service.interceptors.request.use(
      config => {

            //做统一的请求拦截
            return config
      },
      error => {
            
            console.log(error)
            
            return Promise.reject(error)
      }
)
service.interceptors.response.use(
      response => {
            return response
      },

      
      error => {
            if (error.hasOwnProperty('response')) {
                  if (error.response.hasOwnProperty('status')) {
                        Interceptor(error.response.status)
                  
                        console.log(error.response.status, error.response.data)
                  }
                  else {
                        console.log(error.response)
                  }
            }else {
            console.log(error)
            }
            return Promise.reject(error)
      }

      
)

function Interceptor(val) {
      switch (val) {
        case 500:
          Message.error('Server Error!')
          break
        case 404:
          Message.error('Can not find API!')
          break
        case 401:
          Message.error('You have no Permission handle it!')
          break
        case 403:
          Message.error('You have no Permission handle it!')
          break
        case 400:
          Message.error('Params Error!')
          break
        case 504:
          Message.error('Access Server Timeout!')
          break
        case 405:
          Message.error('Method not allowed.')
          break
        default:
          Message.error('network error')
          break
      }
    }


export default service