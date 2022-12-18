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

export default firebase
