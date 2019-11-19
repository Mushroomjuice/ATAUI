import request from '@/utils/request'


export function getSuiteTable(data){
    return request({
        url:'/item_suite/test_suite/',
        method:'get',
        params:{limit:data.limit,offset:data.offset}
    })
}


export function deleteSuiteItem(data){
    return request({
        url:'/item_suite/test_suite/',
        method:'delete',
        params:{id:data}
    })
}