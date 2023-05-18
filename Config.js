// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore}  from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRzxVw_d26jL3sQRI-A9NifXE9Z1Ixmuw",
  authDomain: "fir-6577e.firebaseapp.com",
  projectId: "fir-6577e",
  messagingSenderId: "845955805429",
  appId: "1:845955805429:web:af7e4d6c23213d794b55bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)