import {getToken ,setToken,removeToken,} from '@/utils/auth'
import {login,getInfo,logout} from '@/api/user'
// import store from '@/store'
// import router, { resetRouter } from '@/router'





const state = {
      token: getToken(),
      name:'',
      roles:[],
}


const mutations ={
      SET_TOKEN:(state,token) => {
            state.token = token
      },
      SET_NAME:(state,name) => {
            state.name=name
      },
      SET_ROLES:(state,roles) => {
            state.roles=roles
      }
}

const actions = {
      //user login
      login({ commit },userinfo) {
            const {username,password} = userinfo

            return new Promise((resolve,reject) => {
                  login({username:username.trim(), password:password}).then(response => {
                        // 解构赋值
                        const { data } = response
                        commit('SET_TOKEN', data.token)
                        setToken(data.token)
                        resolve()
                  }).catch(error => {
                        reject(error)
                  })
            })
      },
      logout( { commit, state } ){
            return new Promise((resolve, reject) => {
                  logout(state.token).then(() => {
                        
                        commit('SET_TOKEN', '')
                        commit('SET_ROLES', [])
                        commit("SET_NAME",'')
                        
                        removeToken()
                        resolve()
                  }).catch(error => {
                        reject(error)
                  })
            })

      },
      getInfo({ commit, state}){
            return new Promise((resolve,reject) => {
                  getInfo(state.token).then(response => {
                        const {data} = response
                        const { roles, name } = data
                        
                        commit('SET_NAME',name)
                        commit('SET_ROLES',roles)
                        resolve(data)
                  }).catch(error => {
                        reject(error)
                  })
            }
            )
      },

}

export default {
      namespaced: true,
      state,
      mutations,
      actions
    }
    