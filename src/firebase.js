import { initializeApp } from "firebase/app"

import {
  getFirestore
}

from "firebase/firestore"

import {
  getAuth,
  GoogleAuthProvider
}

from "firebase/auth"

const firebaseConfig = {

  apiKey: "AIzaSyBSbBESVmHcq7Kro1-ORjVZq4GIL6lKwSM",

  authDomain: "portfolio-app-8ed91.firebaseapp.com",

  projectId: "portfolio-app-8ed91",

  storageBucket: "portfolio-app-8ed91.firebasestorage.app",

  messagingSenderId: "459450346902",

  appId: "1:459450346902:web:32b3ebf376e83b95a641b7"
}

const app =
  initializeApp(firebaseConfig)

export const db =
  getFirestore(app)

export const auth =
  getAuth(app)

export const provider =
  new GoogleAuthProvider()