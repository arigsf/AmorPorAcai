import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCLbBQrmscGlfMQ9ETP7JszYzyWPOSeUIQ",
    authDomain: "amorporacai-a4494.firebaseapp.com",
    projectId: "amorporacai-a4494",
    storageBucket: "amorporacai-a4494.appspot.com",
    messagingSenderId: "612588184771",
    appId: "1:612588184771:web:97f227d0cf286f3dadae76",
    measurementId: "G-YTTLQZMLJ0"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }