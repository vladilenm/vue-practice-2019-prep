import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo({commit, getters}, toUpdate) {
      const userId = firebase.auth().currentUser.uid
      await firebase.database().ref(`/users/${userId}/info`).update(toUpdate)
      commit('setInfo', {...getters.info, ...toUpdate})
    },
    async fetchInfo({commit}) {
      const userId = firebase.auth().currentUser.uid
      const info = (await firebase.database().ref(`/users/${userId}/info`).once('value')).val()
      commit('setInfo', info)
    }
  },
  getters: {
    info: s => s.info
  }
}
