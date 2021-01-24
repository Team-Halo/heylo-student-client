import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAdO0skVkzAcT1OP9M7Su_aH0R1jLtvJnU",
  authDomain: "heylo-69ae3.firebaseapp.com",
  databaseURL: "https://heylo-69ae3-default-rtdb.firebaseio.com",
  projectId: "heylo-69ae3",
  storageBucket: "heylo-69ae3.appspot.com",
  messagingSenderId: "391710873875",
  appId: "1:391710873875:web:62be326457c689dc15e2e6",
  measurementId: "G-4ZCJ3Z7CP3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export { db };
