import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    // Yeh automatically check karta hai login ho gaya hai ya nahi
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = 'auth/dashboard.html';
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('error-message');

            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.error(error);
                errorMsg.textContent = "Galat email ya password. Dobara try karo.";
                errorMsg.style.display = 'block';
            }
        });
    }
});