import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories() {
      const uid = firebase.auth().currentUser.uid
      const cats = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
      return Object.keys(cats).map(key => ({...cats[key], id: key}))
    },
    async createCategory({commit}, {title, limit}) {
      try {
        const uid = firebase.auth().currentUser.uid
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit}, {id, title, limit}) {
      try {
        const uid = firebase.auth().currentUser.uid
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
