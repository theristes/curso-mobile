import  firebase from  'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCNowFe3sgXme0BfyLChEDlIr0HKaWS6Mg",
    authDomain: "exemplo-curso.firebaseapp.com",
    databaseURL: "https://exemplo-curso.firebaseio.com",
    projectId: "exemplo-curso",
    storageBucket: "exemplo-curso.appspot.com",
    messagingSenderId: "567612755555",
    appId: "1:567612755555:web:4730f9c38a870e2efb3256",
    measurementId: "G-HYMPQENEZH"
};


const firebaseApp = firebase.initializeApp(config);
const auth =  firebaseApp.auth();

const db =  firebaseApp.firestore();
const storage = firebaseApp.storage();
const imagesRef = id => storage.ref().child(id);

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();


export { googleProvider, facebookProvider, db, storage, auth, imagesRef }