import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
//Imports Above here

const firebaseConfig = {
  apiKey: "AIzaSyDIjD10qMfqnGoKpneMSUJYnbvXyq6utBY",
  authDomain: "ateam-71ab2.firebaseapp.com",
  projectId: "ateam-71ab2",
  storageBucket: "ateam-71ab2.appspot.com",
  messagingSenderId: "673587268452",
  appId: "1:673587268452:web:86186e34bbb044199cc871",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export function createUser(email, password, role) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setDbRole(role, userCredential);
      alert(`${userCredential.user.email} Has been created.`);
    })
    .catch((error) => {
      alert(`ERROR CODE: ${error.code} ERROR MESSAGE: ${error.message}`);
    });
}

async function setDbRole(_role, userCredential) {
  await setDoc(doc(db, "users", userCredential.user.uid), {
    role: _role,
  });
}

export function signIn(email, password, redirectUrl) {
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

export function userLoggedInQ() {
  const user = auth.currentUser;
  if (user) {
    return true;
  } else {
    return false;
  }
}
