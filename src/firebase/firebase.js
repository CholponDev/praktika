// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDt_rvOrOeymVaN86RqM2ssEM4CIsxlCQ",
  authDomain: "praktika-ee8f2.firebaseapp.com",
  projectId: "praktika-ee8f2",
  storageBucket: "praktika-ee8f2.firebasestorage.app",
  messagingSenderId: "558735626311",
  appId: "1:558735626311:web:48bc69b0b3fdc411366162",
  measurementId: "G-LZZ6V98XHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);