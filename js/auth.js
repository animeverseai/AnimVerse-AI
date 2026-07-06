alert("auth.js loaded");
import { app } from "../firebase-config.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);

// Signup
const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account Created Successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// Login
const loginBtn = document.getElementById("loginBtn");
alert(document.getElementById("loginBtn"));

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    alert("Login button clicked");

signInWithEmailAndPassword(auth, email, password)
.then(() => {
    alert("Login Successful");
})
.catch((error) => {
    alert(error.code);
});
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
             .then(() => {
        alert("Login Successful!");
        window.location.href = "../auth/dashboard.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}