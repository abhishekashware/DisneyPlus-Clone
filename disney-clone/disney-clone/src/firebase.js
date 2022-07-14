import {initializeApp} from 'firebase/app';
import {getAnalytics}  from 'firebase/analytics';
import {getAuth, GoogleAuthProvider,signInWithPopup, signInWithRedirect} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {collection, getDocs, getFirestore, query, where} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDY9tY87XjFepCkbUYbKUEcwXM7R4QP6lQ",
    authDomain: "tokyo-ring-239607.firebaseapp.com",
    databaseURL: "https://tokyo-ring-239607.firebaseio.com",
    projectId: "tokyo-ring-239607",
    storageBucket: "tokyo-ring-239607.appspot.com",
    messagingSenderId: "787876989195",
    appId: "1:787876989195:web:f055f92520331b6e32ba0e",
    measurementId: "G-0QGJZQ4Q8C"
  };
const firebaseApp=initializeApp(firebaseConfig);
const db=getFirestore();
const queryData=(db,coll)=>getDocs(collection(db,coll));
const auth=getAuth();
const provider=new GoogleAuthProvider();
const storage=getStorage(firebaseApp);

const queryDoc=(db,coll)=>getDocs(query(collection(db,coll)));
const signInPopup=()=>signInWithPopup(auth,provider);

export {queryDoc,queryData,signInPopup,auth, provider, storage};
export default db;
