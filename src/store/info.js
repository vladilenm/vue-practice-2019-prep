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
    async updateInfo({commit, getters, dispatch}, toUpdate) {
      const uid = await dispatch('getUid')
      await firebase.database().ref(`/users/${uid}/info`).update(toUpdate)
      commit('setInfo', {...getters.info, ...toUpdate})
    },
    async fetchInfo({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {

      }
    }
  },
  getters: {
    info: s => s.info
  }
}
