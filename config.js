import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBZtiwDEH1vqV4bdVuA6H01POwOStIiVW8",
  authDomain: "book-santa-9707a.firebaseapp.com",
  databaseURL: "https://book-santa-9707a.firebaseio.com",
  projectId: "book-santa-9707a",
  storageBucket: "book-santa-9707a.appspot.com",
  messagingSenderId: "999527249423",
  appId: "1:999527249423:web:9082d84571cdaea8a4957a"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();