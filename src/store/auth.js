import firebase from 'firebase/app'

export default {
  actions: {
    async login({commit, dispatch}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        await dispatch('fetchInfo')
      } catch (e) {
        commit('setError', e)
      }
    },
    async register({commit, dispatch}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = firebase.auth().currentUser.uid
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name: name
        })
        await dispatch('fetchInfo')
      } catch (e) {
        commit('setError', e)
        throw e
      }

    },
    async logout({commit}) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}
