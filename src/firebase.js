import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAiaYTqUo9R1DG9E1RnhhL1vFQWN160Smo",
  authDomain: "pratic-5626b.firebaseapp.com",
  projectId: "pratic-5626b",
  storageBucket: "pratic-5626b.appspot.com",
  messagingSenderId: "328377964004",
  appId: "1:328377964004:web:1e790fd94243a6535b63f1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)