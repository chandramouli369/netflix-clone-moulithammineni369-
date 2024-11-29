// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

//FIrebase thing

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgel_wdkY3VX7CsbkEoUwwwnBTvMNEt5Q",
  authDomain: "netflix-clone-8ff98.firebaseapp.com",
  projectId: "netflix-clone-8ff98",
  storageBucket: "netflix-clone-8ff98.firebasestorage.app",
  messagingSenderId: "944684979576",
  appId: "1:944684979576:web:0273f1d818aa3eb40f248d",
  measurementId: "G-1KGGNQ9N7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize auth here
// configure database in firebase 
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        // get the response of the user
        const res = await createUserWithEmailAndPassword(auth, email, password );
        //Get the details of the user in firebase
        const user = res.user;
        //Store the user in firebase database
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};