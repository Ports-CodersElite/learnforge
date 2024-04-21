import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'; //https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';
// CDN imports above here for firebase (may change to normal imports)

const firebaseConfig = {
  apiKey: "AIzaSyDIjD10qMfqnGoKpneMSUJYnbvXyq6utBY",
  authDomain: "ateam-71ab2.firebaseapp.com",
  projectId: "ateam-71ab2",
  storageBucket: "ateam-71ab2.appspot.com",
  messagingSenderId: "673587268452",
  appId: "1:673587268452:web:86186e34bbb044199cc871",
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


//Takes in email, password and role as a string then creates the user with that information. Takes in url to login page/anywhere else.
export function createUser(email, password, role, redirUrl) {
  createUserWithEmailAndPassword(auth, email, password, redirUrl)
    .then((userCredential) => {
      setDbRole(role, userCredential);
      alert(`${userCredential.user.email} Has been created.`);
      window.location.href = redirUrl;
    })
    .catch((error) => {
      alert(`ERROR CODE: ${error.code} ERROR MESSAGE: ${error.message}`);
    });
}

// Sets the role for the user within the database
async function setDbRole(_role, userCredential) {
  await setDoc(doc(db, "users", userCredential.user.uid), {
    role: _role,
  });
}

// This function signs the user in with the email and password (string)
// and then redirects then with the redirectUrl (string)(FilePath)
export function signIn(email, password, redirectUrl) {
  if (auth.currentUser) {
    signOutFn('../index.html');
  } 

  //sign in with auto redirect
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(`Logged in as ${userCredential.user.uid}`);
      window.location.href = redirectUrl;
    })
    .catch((error) => {
      alert(`ERROR CODE: ${error.code} ERROR MESSAGE: ${error.message}`);
    });
}

// Signs the user out :)
export function signOutFn(redirectUrl) {
  if (auth == null) {
    return;
  }
  signOut(auth)
    .then(() => {
      window.location.href = redirectUrl;
      console.log(auth.auth.currentUser);
    })
    .catch((error) => {
      // An error happened.
    });
}

// Checks whether the user is logged in
export function userLoggedInQ() {
  if (user) {
    return true;
  } else {
    return false;
  }
}

// Session persistence managed using this
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Session persistence: (Logged In)');
    console.log('Email: ' + user.email);
    console.log('UID: ' + user.uid);
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('uid', user.uid);
  } else {
    console.log('Session persistence: (Logged Out)');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('uid');
  }
}) 

