import request from '@/utils/request'

export function getuutlist() {
    return request({
      url: '/uut',
      method: 'get',
      
    })
  }