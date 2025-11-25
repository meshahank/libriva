// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDpNiBfj1WPVputBiSLBsdOnm0MFLjVYlE",
    authDomain: "flebooks.firebaseapp.com",
    projectId: "flebooks",
    storageBucket: "flebooks.firebasestorage.app",
    messagingSenderId: "458785971847",
    appId: "1:458785971847:web:ed6138c7df952c9f3d6222",
    measurementId: "G-XMD1VDPZGT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.querySelector(".contact_field input[placeholder='Name']");
    const emailInput = document.querySelector(".contact_field input[placeholder='Email']");
    const messageInput = document.querySelector(".contact_field textarea[placeholder='Message']");
    const submitButton = document.querySelector(".contact_form_submit");

    // Handle form submission
    submitButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Basic validation
        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            // Save data to Firestore
            await addDoc(collection(db, "messages"), {
                name,
                email,
                message,
                timestamp: new Date(), // Optional: Add a timestamp
            });
            // Reset the fields
            nameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";

            alert("Your message has been send successfully!");

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("There was an error submitting your message. Please try again later.");
        }
    });
});
