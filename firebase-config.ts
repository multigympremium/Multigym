// firebase-config.js
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VITE_apiKey,
  authDomain: process.env.VITE_authDomain,
  projectId: process.env.VITE_projectId,
  storageBucket: process.env.VITE_storageBucket,
  messagingSenderId: process.env.VITE_messagingSenderId,
  appId: process.env.VITE_appId,
};
// Initialize Firebase
if (!firebase?.apps?.length) {
  firebase?.initializeApp(firebaseConfig);
} else {
  firebase?.app();
}

export default firebase;
