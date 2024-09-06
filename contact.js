// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUlQaa6221X99k7yY7Ak1Hcfx6XWHJYc4",
  authDomain: "catering-reservation-76a58.firebaseapp.com",
  projectId: "catering-reservation-76a58",
  storageBucket: "catering-reservation-76a58.appspot.com",
  messagingSenderId: "689231471348",
  appId: "1:689231471348:web:194310e6ce17e1c158b4a1",
  measurementId: "G-MHEMN4MZQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Form validation function
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '') {
        alert('Please enter your name.');
        return false;
    }
    if (email === '') {
        alert('Please enter your email.');
        return false;
    } else if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    if (subject === '') {
        alert('Please enter a subject.');
        return false;
    }
    if (message === '') {
        alert('Please enter your message.');
        return false;
    }
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission

    if (!validateForm()) {
        return;
    }

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    try {
        // Add form data to Firestore
        await addDoc(collection(db, 'contacts'), {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: serverTimestamp()
        });

        document.getElementById('formMessage').textContent = "   Your message has been sent!";
        document.getElementById('formMessage').style.color = "white";
        document.getElementById('contactForm').reset(); // Reset the form

    } catch (error) {
        document.getElementById('formMessage').textContent = "Error sending message: " + error.message;
        document.getElementById('formMessage').style.color = "white";
    }
});
