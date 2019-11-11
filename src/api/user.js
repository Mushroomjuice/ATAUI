import request from '@/utils/request'

export function login(data) {
      return request({
        url: '/api-token-auth/',
        method: 'post',
        params:data
      })
    }


export function getInfo(token) {
      return request({
        url: '/user/roles',
        method: 'get',
        params: { token }
      })
}


export function logout(token) {
  return request({
    url:'user/logout',
    method:'post',
    params:{ token }
  })
}

export function regist(data){
  return request({
    url:"/regist/user_regist/",
    method:'post',
    params:data
  })
}
    