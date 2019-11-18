import request from '@/utils/request'

export function getuutlist(offset,limit,order_by) {
    return request({
      url: '/uut/uut_info/?offset=' +
      offset +
      "&limit=" +
      limit +
      "&ordering=" +
      order_by,
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
    url:'/uut/test_info_web/'+ data,
    method:'get',
    
  })
}


export function updateuutdetailinfo(id,sequence,data){
  return request({
    url:"/uut/test_info_web/" +
    id +
    "/" +
    sequence +
    "/",
    method:'post',
    data
  })
  

}