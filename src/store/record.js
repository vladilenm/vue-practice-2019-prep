import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({dispatch}, record) {
      const uid = await dispatch('getUid')
      return await firebase.database().ref(`/users/${uid}/records`).push(record)
    },
    async fetchRecords({dispatch}) {
      const uid = await dispatch('getUid')
      const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
      return Object.keys(records).map(key => ({...records[key], id: key}))
    },
    async fetchRecordById({dispatch}, id) {
      const uid = await dispatch('getUid')
      const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val()
      return {...record, id}
    }
  }
}
