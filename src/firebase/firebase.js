// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PRO_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_LOCATION,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId:import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MESURE_ID
};




// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const Auth=getAuth(app)
export const database=getFirestore(app)