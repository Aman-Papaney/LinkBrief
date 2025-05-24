// Firebase v9+ modular SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getAnalytics} from "firebase/analytics"


const firebaseConfig = {
	apiKey: "AIzaSyCjJYF82aygyw7Hh7SPAhY7x9up0drdUxE",
	authDomain: "linkbrief-fcc18.firebaseapp.com",
	projectId: "linkbrief-fcc18",
	storageBucket: "linkbrief-fcc18.firebasestorage.app",
	messagingSenderId: "479850236893",
	appId: "1:479850236893:web:d644c557f927b2b67a4434",
	measurementId: "G-YGP9SHJZW5",
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const analytics = getAnalytics(app)