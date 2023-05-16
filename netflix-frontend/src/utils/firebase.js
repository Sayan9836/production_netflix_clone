// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDzbV4QY8FdCjvNQOZxDpYUOLSIeZy2UtE",
  authDomain: "netflix-app-a95c7.firebaseapp.com",
  projectId: "netflix-app-a95c7",
  storageBucket: "netflix-app-a95c7.appspot.com",
  messagingSenderId: "800426472969",
  appId: "1:800426472969:web:41ba1b498d92c200486ad8",
  measurementId: "G-K2PJW2QW9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
