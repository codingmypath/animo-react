// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-92a5f.firebaseapp.com",
  projectId: "mern-estate-92a5f",
  storageBucket: "mern-estate-92a5f.appspot.com",
  messagingSenderId: "133938838928",
  appId: "1:133938838928:web:fdb76cb70a6bc8b3798715"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);