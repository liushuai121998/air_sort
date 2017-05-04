import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

// 定义Vuex
Vue.use(Vuex)

// 暴露store对象
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})