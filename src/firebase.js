import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkhkyIwRnzRImxqsnySuqQyjoN0Npoy60",
  authDomain: "chatapp-rct.firebaseapp.com",
  projectId: "chatapp-rct",
  storageBucket: "chatapp-rct.appspot.com",
  messagingSenderId: "163853019670",
  appId: "1:163853019670:web:a8df4a15a7e4e18153a337",
  measurementId: "G-06NQ6DJ79R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage()
export const db = getFirestore()
