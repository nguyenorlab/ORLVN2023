import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCg1h6a1UN-Erw60zPu_7DJp0kLFqO6FZE",
  authDomain: "orlvn-2023.firebaseapp.com",
  databaseURL: "https://orlvn-2023-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "orlvn-2023",
  storageBucket: "orlvn-2023.appspot.com",
  messagingSenderId: "362808581261",
  appId: "1:362808581261:web:dd29035de0a17c2a80d6c4",
  measurementId: "G-3SXXLD0FXP"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);