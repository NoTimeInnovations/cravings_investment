import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwhj6BXqv5UTLN9LYqhcnqkTlCiOcUE3g",
  authDomain: "cravings-investments.firebaseapp.com",
  projectId: "cravings-investments",
  storageBucket: "cravings-investments.firebasestorage.app",
  messagingSenderId: "1038029951162",
  appId: "1:1038029951162:web:9033d1287f3ab9055e7283"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);