import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {
      name: '赵三',
      age: 25,
      sex: '男'
    }
  },
  mutations: {
    setUserInfo(state, value) {
      state.userInfo.age += value
    }
  },
  actions: {
    setUserInfo(context, value) {
      setTimeout(() => {
        context.commit('setUserInfo', value)
      }, 1000)
    }
  },
  modules: {}
})
