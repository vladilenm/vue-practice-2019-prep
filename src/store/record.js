import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({}, record) {
      const uid = firebase.auth().currentUser.uid
      return await firebase.database().ref(`/users/${uid}/records`).push(record)
    },
    async fetchRecords({}) {
      const uid = firebase.auth().currentUser.uid
      const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
      return Object.keys(records).map(key => ({...records[key], id: key}))
    },
    async fetchRecordById({}, id) {
      const uid = firebase.auth().currentUser.uid
      const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val()
      return {...record, id}
    }
  }
}
