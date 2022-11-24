import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCdpAu_q2jWwY6PlNjmdlehC_hM8qox1X8',
  authDomain: 'qr-menu-f8dae.firebaseapp.com',
  projectId: 'qr-menu-f8dae',
  storageBucket: 'qr-menu-f8dae.appspot.com',
  messagingSenderId: '59283721330',
  appId: '1:59283721330:web:38ce1d61a4ab5ac54646eb',
  measurementId: 'G-5YVK0H5H1M',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
