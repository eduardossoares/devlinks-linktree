import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChN0KvoHRgLM6UgHhWHyd8BBsMrjqiheI",
  authDomain: "reactlinks-2fab0.firebaseapp.com",
  projectId: "reactlinks-2fab0",
  storageBucket: "reactlinks-2fab0.appspot.com",
  messagingSenderId: "810327310096",
  appId: "1:810327310096:web:1a1012d8f482203b9b2f95",
  measurementId: "G-2M3ESS8WNT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };