import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBI9a0NzWF7vo7piNNvhJ5kVcOlLjG6oko",
    authDomain: "oorka-fdc65.firebaseapp.com",
    projectId: "oorka-fdc65",
    storageBucket: "oorka-fdc65.appspot.com",
    messagingSenderId: "647472773974",
    appId: "1:647472773974:web:10a41477f93f65896374f7",
    measurementId: "G-H4D00GDMFQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export { auth, provider }