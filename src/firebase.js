import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBpyvFIvM6PGt2H9RNVfdbTAsJGx71CnGQ",
  authDomain: "iepe-3c836.firebaseapp.com",
  databaseURL: "https://iepe-3c836.firebaseio.com",
  projectId: "iepe-3c836",
  storageBucket: "iepe-3c836.appspot.com",
  messagingSenderId: "449421580944",
  appId: "1:449421580944:web:e379d6969174f2b7c91615"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}

