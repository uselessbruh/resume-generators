import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCRIviX2euwCk1LLrAolno4Lk2YDeiE6yY",
    authDomain: "resume-generator-f22b0.firebaseapp.com",
    projectId: "resume-generator-f22b0",
    storageBucket: "resume-generator-f22b0.firebasestorage.app",
    messagingSenderId: "388665178749",
    appId: "1:388665178749:web:90b502a569b8df7cb64f14"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
