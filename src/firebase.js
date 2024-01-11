import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signOut, updateCurrentUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiaYTqUo9R1DG9E1RnhhL1vFQWN160Smo",
  authDomain: "pratic-5626b.firebaseapp.com",
  projectId: "pratic-5626b",
  storageBucket: "pratic-5626b.appspot.com",
  messagingSenderId: "328377964004",
  appId: "1:328377964004:web:1e790fd94243a6535b63f1",
  gs:"pratic-5626b.appspot.com"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

