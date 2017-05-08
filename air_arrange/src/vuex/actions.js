export default {
    RANDOM_DATA({ commit }) {
        setInterval(() => {
            commit('RANDOM_DATA')
        }, 3000)
    }
}