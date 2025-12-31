const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check local storage for theme preference on load
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    }
});

// Scroll to Top Button Logic
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // Helper function to show error
        const showError = (input, msg) => {
            const formGroup = input.parentElement;
            const errorDisplay = formGroup.querySelector('.error-message');
            errorDisplay.innerText = msg;
            formGroup.classList.add('error');
            isValid = false;
        };

        // Reset errors
        document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

        if (name.value.trim() === '') showError(name, 'Name is required');
        if (email.value.trim() === '') showError(email, 'Email is required');
        else if (!/\S+@\S+\.\S+/.test(email.value)) showError(email, 'Email is invalid');
        if (message.value.trim() === '') showError(message, 'Message is required');

        if (isValid) {
            alert('Thank you! Your message has been sent.');
            contactForm.reset();
        }
    });
}

// Typing Animation Logic
const typingText = document.querySelector('.typing-text');
const roles = ["Biomedical Technologist and Engineering Draughtsperson"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 100 : 200);
    }
}

if (typingText) typeEffect();
 // Mobile Menu Toggle
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');

        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
});