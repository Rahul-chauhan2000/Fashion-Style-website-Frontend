// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//database adding
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUqmlf9KuXylMiCZNd1W2Nm0xXExay2ZU",
  authDomain: "online-fashion-style-web-9ce11.firebaseapp.com",
  projectId: "online-fashion-style-web-9ce11",
  storageBucket: "online-fashion-style-web-9ce11.firebasestorage.app",
  messagingSenderId: "430012866708",
  appId: "1:430012866708:web:a16f14b8ad8d14bbb5d481",
  measurementId: "G-2YK5GSPD8S"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };
