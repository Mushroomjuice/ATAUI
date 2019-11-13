import request from '@/utils/request'

export function getuutlist() {
    return request({
      url: '/uut/info',
      method: 'get',
      
    })
  }

export function getmodulars(){
  return request({
    url:'/keyword/test_modular',
    method:'get'
  })
}

export function getuutdetailinfo(data){
  return request({
    url:'/uut/test_info_web/'+ data +'/',
    method:'get',
    
  })
}