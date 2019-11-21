import request from '@/utils/request'


export function getSuiteTable(data){
    return request({
        url:'/item_suite/test_suite/',
        method:'get',
        params:data
    })
}


export function deleteSuiteItem(data){
    return request({
        url:'/item_suite/test_suite/',
        method:'delete',
        params:{id:data}
    })
}



export function getDeatilSuiteConfig(id){
    return request({
        url:'/item_suite/test_suite/' + id,
        method:'get',
        
    })
}

export function getsuitestation(){
    return request({
        url:'/keyword/test_station',
        method:'get'
    })
}