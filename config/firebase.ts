import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration from your project
const firebaseConfig = {
  apiKey: "AIzaSyDdehAqad_IALxTrCj9DJWh4KLGXquckSA",
  authDomain: "movies-cabe1.firebaseapp.com",
  projectId: "movies-cabe1",
  storageBucket: "movies-cabe1.appspot.com",
  messagingSenderId: "803323996354",
  appId: "1:803323996354:android:a0a4324dff1801f3e9f35b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth (Expo handles persistence automatically)
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage for avatar uploads
const storage = getStorage(app);

export { auth, db, storage };
