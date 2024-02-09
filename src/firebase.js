// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDf1AsaPz8Y7cLIXYaKpd2x84JHBAoS0GA",
  authDomain: "mud-cups.firebaseapp.com",
  projectId: "mud-cups",
  storageBucket: "mud-cups.appspot.com",
  messagingSenderId: "39881605942",
  appId: "1:39881605942:web:28027e68d83a429f9ee997",
  measurementId: "G-Q240Z2NTD7",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
