// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRXc04sEbM77liVmwAxcvbeieQiUkTjEQ",
  authDomain: "qr-menu-ee3b2.firebaseapp.com",
  projectId: "qr-menu-ee3b2",
  storageBucket: "qr-menu-ee3b2.appspot.com",
  messagingSenderId: "99281697379",
  appId: "1:99281697379:web:00237a06eea0909d1cd656",
  measurementId: "G-WZVNLY5PGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;