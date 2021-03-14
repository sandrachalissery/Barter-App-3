import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyA6AvuRRt39M5YRvV8P_WBE4seb8h8WOWk",
    authDomain: "barter-app-b2162.firebaseapp.com",
    projectId: "barter-app-b2162",
    storageBucket: "barter-app-b2162.appspot.com",
    messagingSenderId: "581612873418",
    appId: "1:581612873418:web:10aff4ed89c7d929693633"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
