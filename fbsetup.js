import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD45FPljdS6t_uZhdmWsVr2uxk607VIL50",
  authDomain: "ridelynk-d0c01.firebaseapp.com",
  projectId: "ridelynk-d0c01",
  storageBucket: "ridelynk-d0c01.firebasestorage.app",
  messagingSenderId: "383823522059",
  appId: "1:383823522059:web:6800437176fc446ecfda0e",
  measurementId: "G-C6G416EXZM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


const googleLogin = document.getElementById("google-signin-btn");
googleLogin.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
        const user=result.user;
        localStorage.setItem("user",JSON.stringify({
            name:user.displayName,
            email:user.email
        }));
      window.location.href = "home.html";
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
});


