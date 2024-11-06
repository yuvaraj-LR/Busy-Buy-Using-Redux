import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDZjeSOUkdgQzjVrBjQBeBBIQxvor1qbQE",
    authDomain: "busy-buy-app-5fd69.firebaseapp.com",
    projectId: "busy-buy-app-5fd69",
    storageBucket: "busy-buy-app-5fd69.firebasestorage.app",
    messagingSenderId: "95764134362",
    appId: "1:95764134362:web:79138b9a06d393c26028e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

