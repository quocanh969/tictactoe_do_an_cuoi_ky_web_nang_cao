import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBXvbTTHsRvW5_ZwkOIcSvd1q0Om3cfEFA",
    authDomain: "tic-tac-toe-cdf0b.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-cdf0b.firebaseio.com",
    projectId: "tic-tac-toe-cdf0b",
    storageBucket: "tic-tac-toe-cdf0b.appspot.com",    
    messagingSenderId: "466647427760",
    appId: "1:466647427760:web:8344f181ecc8cc73cc2975",
    measurementId: "G-ZT0C23Y9GP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}