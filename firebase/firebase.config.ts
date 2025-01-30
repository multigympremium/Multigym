// Import Firebase modules
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration from environment variables
const fire_base_config = {
  apiKey: process.env.EXPO_PUBLIC_apiKey,
  authDomain: process.env.EXPO_PUBLIC_authDomain,
  projectId: process.env.EXPO_PUBLIC_projectId,
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId,
};

console.log(fire_base_config, "fire_base_config");

// Initialize Firebase app only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(fire_base_config) : getApp();

// Initialize Firebase services
const auth = getAuth(app); // Firebase Authentication
const firestore = getFirestore(app); // Firestore Database
const storage = getStorage(app); // Firebase Storage

export { auth, firestore, storage };
