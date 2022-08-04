
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq6YLU_hmG-zO8S50lvjH8bSGMMRWPxGQ",
  authDomain: "cellular-cortex-355815.firebaseapp.com",
  projectId: "cellular-cortex-355815",
  storageBucket: "cellular-cortex-355815.appspot.com",
  messagingSenderId: "348246776369",
  appId: "1:348246776369:web:49e1e595fbf326b0b81310"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
