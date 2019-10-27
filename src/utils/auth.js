import Cookies from 'js-cookie'

const TokenKey='ATA-Token'

export function getToken(){
      return Cookies.get(TokenKey)
}


export function setToken(token){
      return Cookies.set(TokenKey,token)
}

