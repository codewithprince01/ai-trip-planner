// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxmERuSRdbyOlZoduZtz8Ecesqow7mcpk",
  authDomain: "ai-trip-planner-408a1.firebaseapp.com",
  projectId: "ai-trip-planner-408a1",
  storageBucket: "ai-trip-planner-408a1.firebasestorage.app",
  messagingSenderId: "134236069076",
  appId: "1:134236069076:web:266ffe49d5b9e3b465ef41",
  measurementId: "G-XRYCBC9DM7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
