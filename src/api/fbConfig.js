import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWIyTikUzZzqBigZfPOx1uTmRnSTLvrZ0",
  authDomain: "website-27e08.firebaseapp.com",
  databaseURL: "https://website-27e08-default-rtdb.firebaseio.com",
  projectId: "website-27e08",
  storageBucket: "website-27e08.appspot.com",
  messagingSenderId: "527829326899",
  appId: "1:527829326899:web:1b062d482b647b9c425746",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
