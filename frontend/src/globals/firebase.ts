import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB74ZwfZM0mB3Ia-M9kC9KPznNrfTe3QLg",
  authDomain: "revocare-1.firebaseapp.com",
  projectId: "revocare-1",
  storageBucket: "revocare-1.appspot.com",
  messagingSenderId: "845561097679",
  appId: "1:845561097679:web:4687b9c05fc569c49ef6ba",
  measurementId: "G-F41DKV8T6Y"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

