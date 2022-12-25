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

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const createDocument = (collection, document) => {
  return db.collection(collection).add(document)
}

// export const getCollection = async (collection) => {
//   const documents = await db
//     .collection(collection)
//     .get()
//     .then((querySnapshot) => {
//       let arr = querySnapshot.docs.map((doc) => {
//         return doc.data()
//       })
//       return arr
//     })
//   // console.log(documents)
//   return documents
// }

export const getCollection = async (collection) => {
  const snapshot = await db.collection(collection).get()
  let arrayOfData = snapshot.docs.map((doc) => doc.data())
  let arrayOfId = snapshot.docs.map((doc) => doc.id)

  const newArray = []

  for (let i = 0; i < arrayOfData.length; i++) {
    const element = arrayOfData[i]
    element.id = arrayOfId[i]
    newArray.push(element)
  }

  return newArray
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
