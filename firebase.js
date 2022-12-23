import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDNqgjC3zIUoZPHx4jVpeaCvZwV-hWbaIk',
  authDomain: 'dnd-platform.firebaseapp.com',
  projectId: 'dnd-platform',
  storageBucket: 'dnd-platform.appspot.com',
  messagingSenderId: '599133981873',
  appId: '1:599133981873:web:f134539f75068fca112690',
  measurementId: 'G-C3RY8WYWQL',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

export const createDocument = (collection, document) => {
  return db.collection(collection).add(document)
}

export const getDocument = async (collection, id) => {
  const document = await db.collection(collection).doc(id).get()
  return document.exists ? document.data() : null
}

export const updateDocument = async (collection, id, document) => {
  return db.collection(collection).doc(id).update(document)
}

export const deleteDocument = async (collection, id, document) => {
  return db.collection(collection).doc(id).delete(document)
}

// export const useLoaddocuments = (collection) => {
//   const documents = ref([])
//   const close = db.collection(collection).onSnapshot((snapshot) => {
//     documents.value = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }))
//   })
//   onUnmounted(close)
//   return documents
// }

export default firebase
