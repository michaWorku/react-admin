import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfa0gIgd0kIPVAqp-52vaxSLrbbcOolEc",
  authDomain: "react-admin-1216192127.firebaseapp.com",
  projectId: "react-admin-1216192127",
  storageBucket: "react-admin-1216192127.appspot.com",
  messagingSenderId: "1084685797404",
  appId: "1:1084685797404:web:9c48870644f1e580a7b7d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);