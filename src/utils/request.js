import axios from 'axios'
// import store from '@/store'


const service = axios.create({
      baseURL: process.env.VUE_APP_BASE_API,
      timeout:5000
})

service.interceptors.request.use(
      // error => {
      //       console.log(error)
      //       return Promise.reject(error)
      // }
)
service.interceptors.response.use(
      
)
export default service