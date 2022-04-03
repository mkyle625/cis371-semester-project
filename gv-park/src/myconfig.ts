// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6e9vD86PgJUA_kJgQktZJMi3GvXeSycc",
    authDomain: "gvpark-50788.firebaseapp.com",
    projectId: "gvpark-50788",
    storageBucket: "gvpark-50788.appspot.com",
    messagingSenderId: "239868139046",
    appId: "1:239868139046:web:55e4c1f041c3c80f6238e7"
  };

  const app: FirebaseApp = initializeApp(firebaseConfig);
  const db: Firestore = getFirestore(app);
  export { app, firebaseConfig, db };