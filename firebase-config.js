// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtJzEvWvx7A2rDJLobXK1cwYIqoaEeVMg",
  authDomain: "animverse-ai.firebaseapp.com",
  projectId: "animverse-ai",
  storageBucket: "animverse-ai.firebasestorage.app",
  messagingSenderId: "528665034632",
  appId: "1:528665034632:web:ab2d92587f782d1287c43d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
