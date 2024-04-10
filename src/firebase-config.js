// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzvENK09UXnuXgUSXQUdoCxsGmLsDArKc",
  authDomain: "chataapp-a1ead.firebaseapp.com",
  projectId: "chataapp-a1ead",
  storageBucket: "chataapp-a1ead.appspot.com",
  messagingSenderId: "1013974351893",
  appId: "1:1013974351893:web:fd9935fff5ebd9b9ad4e1c",
  measurementId: "G-2SXLZ410CT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider =  new GoogleAuthProvider();
export const db =  getFirestore(app);