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

app = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const roomsCollection = db.collection('rooms')

export const createRoom = (room) => {
  return roomsCollection.add(room)
}

export const getRoom = async (id) => {
  const room = await roomsCollection.doc(id).get()
  return room.exists ? room.data() : null
}

export const updateRoom = async (id, room) => {
  return roomsCollection.doc(id).update(room)
}

export const deleteRoom = async (id, room) => {
  return roomsCollection.doc(id).delete(room)
}

export const useLoadRooms = () => {
  const rooms = ref([])
  const close = roomsCollection.onSnapshot((snapshot) => {
    rooms.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return rooms
}

export default firebase
