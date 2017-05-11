export default {
    RANDOM_DATA({ commit }) {
        setInterval(() => {
            commit('RANDOM_DATA')
        }, 3000)
    },
    CHANGE_TH_WIDTH({ commit }, thInfo) {
        setTimeout(() => {
            commit('CHANGE_TH_WIDTH', thInfo)
        }, 10)
    }
}