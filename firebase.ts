// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9AOTISFtwIds8JJtacp8ZvSeFS9-BaNE",
  authDomain: "caja-clara-w4vdh.firebaseapp.com",
  databaseURL: "https://caja-clara-w4vdh-default-rtdb.firebaseio.com",
  projectId: "caja-clara-w4vdh",
  storageBucket: "caja-clara-w4vdh.firebasestorage.app",
  messagingSenderId: "1078712374746",
  appId: "1:1078712374746:web:39b08f40407f1681f85ce3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);