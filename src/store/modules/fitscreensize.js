
//保存当前页面宽度和高度的数据
const state = {
    height: document.documentElement.clientHeight,
    width:document.documentElement.clientWidth
}


const mutations = {
    SET_HEIGHT: (state,height) =>{
        state.height = height
    },
    SET_WIDTH: (state,width) => {
        state.width = width
    }
}


const actions = {
    setheight( {commit} ,height) {
        commit('SET_HEIGHT', height)
    },
    setwidth( {commit}, width) {
        commit('SET_WIDTH',width)
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}