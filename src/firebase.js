import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "Enter your api key",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  }) ;

   const db = firebaseApp.firestore();

   export default db;