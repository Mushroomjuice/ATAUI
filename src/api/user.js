import request from '@/utils/request'

export function login(data) {
      return request({
        url: '/user/login',
        method: 'get',
        params:data
      })
    }


export function getInfo(token) {
      return request({
        url: '/user/info',
        method: 'post',
        params: { token }
      })
}
    