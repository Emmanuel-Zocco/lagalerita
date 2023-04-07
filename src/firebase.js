import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyABCE05u-QC9JErTA0Ing46YpgBXDinDG4",
  authDomain: "la-galerita.firebaseapp.com",
  databaseURL: "https://la-galerita-default-rtdb.firebaseio.com",
  projectId: "la-galerita",
  storageBucket: "la-galerita.appspot.com",
  messagingSenderId: "613692365225",
  appId: "1:613692365225:web:05f777c93e0c24ac140cb8",
  measurementId: "G-GETQR6R54H"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const storage = firebase.storage();

export default { db, storage };
