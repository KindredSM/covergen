import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'
import { ref, onUnmounted } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCojHiidrbb2WtxOIVEAUxArU1fJBpT-Y8',
  authDomain: 'covergen-180fc.firebaseapp.com',
  projectId: 'covergen-180fc',
  storageBucket: 'covergen-180fc.appspot.com',
  messagingSenderId: '51009683776',
  appId: '1:51009683776:web:619e8d97b1bae71ca23aa5',
  measurementId: 'G-5EKHRYD9LQ'
}

const firebaseApp = initializeApp(config)
const db = getFirestore(firebaseApp)
const usersCollection = collection(db, 'users')

export const createUser = async (user) => {
  return await addDoc(usersCollection, user)
}

export const getUser = async (id) => {
  const userDoc = doc(db, 'users', id)
  const userSnap = await getDoc(userDoc)
  return userSnap.exists() ? userSnap.data() : null
}

export const updateUser = (id, user) => {
  const userDoc = doc(db, 'users', id)
  return updateDoc(userDoc, user)
}

export const deleteUser = (id) => {
  const userDoc = doc(db, 'users', id)
  return deleteDoc(userDoc)
}

export const useLoadUsers = () => {
  const users = ref([])
  const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(unsubscribe)
  return users
}
