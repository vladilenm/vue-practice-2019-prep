import Vue from 'vue'
import Vuex from 'vuex'
import currency from './currency'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    currency, auth, info, category, record
  }
})
