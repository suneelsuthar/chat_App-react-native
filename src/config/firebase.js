import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDxaiEwy4YBou7pxN0s6DI7YRHZWKQ3dyk",
    authDomain: "messenger-69b53.firebaseapp.com",
    databaseURL: "https://messenger-69b53.firebaseio.com",
    projectId: "messenger-69b53",
    storageBucket: "",
    messagingSenderId: "1008986909927",
    appId: "1:1008986909927:web:6a0c53d65d5de68af78642",
    measurementId: "G-EPZL291P7X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase