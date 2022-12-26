import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

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

export const createDocument = async (collection, document) => {
  let docRef = db.collection(collection).doc()
  await docRef.set({
    ...document,
    doc_id: docRef.id,
  })

  // Alternatively:
  // // Add a new document with a generated ID
  // let docRef = await db.collection(collection).add({
  //   ...document,
  //   xid: '',
  // });
  // // Update the new document with the ID
  // await docRef.update({
  //   xid: docRef.id
  // });
}

export const getCollection = async (collection) => {
  const snapshot = await db.collection(collection).get()
  let arrayOfData = snapshot.docs.map((doc) => doc.data())
  return arrayOfData
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

export default firebase
