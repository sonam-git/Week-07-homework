// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiTv6QPw46QlZmA1H7F8ifuFRmwJwdM-k",
  authDomain: "f22-week07-homework.firebaseapp.com",
  projectId: "f22-week07-homework",
  storageBucket: "f22-week07-homework.appspot.com",
  messagingSenderId: "65453357940",
  appId: "1:65453357940:web:255343c593ade0671c8a21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//connect for Authentication
const auth = getAuth(app);

//connect for Firestore DB
const db = getFirestore(app);

export { auth, db };