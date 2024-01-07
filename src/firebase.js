// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf1AsaPz8Y7cLIXYaKpd2x84JHBAoS0GA",
  authDomain: "mud-cups.firebaseapp.com",
  projectId: "mud-cups",
  storageBucket: "mud-cups.appspot.com",
  messagingSenderId: "39881605942",
  appId: "1:39881605942:web:28027e68d83a429f9ee997",
  measurementId: "G-Q240Z2NTD7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
