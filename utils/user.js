import { getDocument } from '~/firebase'

export default {
  setUidToLocalStorage: function (uid) {
    const userIdSerialized = JSON.stringify(uid)
    localStorage.setItem('uid', userIdSerialized)
  },
  fetchUser: async function (collection, id) {
    console.log('paramentrs of fetch user :>> ', collection, id)
    let fetchUser = await getDocument(collection, id)
    console.log('fetchUser >> ', fetchUser)
    return fetchUser
  },
  setUserInfoToLocalStorage: function (userFromFirestoreDatabase) {
    const userSerialized = JSON.stringify(userFromFirestoreDatabase)
    localStorage.setItem('dndUser', userSerialized)
  },
}
