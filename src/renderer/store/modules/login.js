const state = {
    loginState: false,
}

const mutations = {
    changeLoginState(state, flag) {
        console.log("flag", flag)
        state.loginState = flag
    },
}

const actions = {
    // someAsyncTask({ commit }) {
    //     // do something async
    //     commit('INCREMENT_MAIN_COUNTER')
    // }
}

export default {
    state,
    mutations,
    // actions
}
