// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
