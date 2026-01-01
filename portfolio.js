// Ensure page starts at the top on load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// 1. EmailJS මුලින්ම සක්‍රීය (Initialize) කරන්න
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("fRjtXvJUGYvJlmR-R"); // ඔබේ Public Key එක මෙතැනට ඇතුළත් කළා
    }
})();

// 2. බොත්තම් ක්ලික් කළ විට ක්‍රියාත්මක වන ප්‍රධාන Function එක
function sendNotification(actionType) {
    if (typeof emailjs === 'undefined') return;
    
    const serviceID = "service_vu2pskk"; 
    const templateID = "template_aj4mx1y"; 

    // Template එකේ ඇති {{name}}, {{title}}, {{message}} යන කොටස් වලට දත්ත යැවීම
    const templateParams = {
        name: "Sewmini's Portfolio Visitor",
        title: actionType,
        message: `Someone just clicked the ${actionType} button on your portfolio!`
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then(() => {
            console.log("Success! Sewmini will receive your " + actionType + " notification.");
        }, (error) => {
            console.log("Failed...", error);
        });
}

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check local storage for theme preference on load
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
}

if (themeToggle) {
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
}

// Scroll to Top Button Logic
const scrollTopBtn = document.getElementById("scrollTopBtn");
const navbar = document.querySelector('.navbar');

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }

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
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('Thank you! Your message has been sent.');
                    contactForm.reset();
                } else {
                    alert('Oops! There was a problem submitting your form.');
                }
            }).catch(error => {
                alert('Oops! There was a problem submitting your form.');
            });
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

// Project Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Like Button Logic
const likeBtn = document.getElementById('likeBtn');
if (likeBtn) {
    const likeIcon = likeBtn.querySelector('i');
    const likeText = likeBtn.querySelector('.btn-text');
    const likeCount = likeBtn.querySelector('.like-count');
    let count = 25; // Base count

// Check if previously liked
    const isLiked = localStorage.getItem('portfolioLiked') === 'true';
    
if (isLiked) {
        likeBtn.classList.add('liked');
        likeIcon.className = 'fas fa-heart';
        likeText.textContent = 'Liked';
        likeCount.textContent = count + 1;
    }

    likeBtn.addEventListener('click', () => {
if (likeBtn.classList.contains('liked')) {
            likeBtn.classList.remove('liked');
            likeIcon.className = 'far fa-heart';
            likeText.textContent = 'Like';
            likeCount.textContent = count;
            localStorage.setItem('portfolioLiked', 'false');
    } else {
            likeBtn.classList.add('liked');
            likeIcon.className = 'fas fa-heart';
            likeText.textContent = 'Liked';
            likeCount.textContent = count + 1;
            localStorage.setItem('portfolioLiked', 'true');

            // Send email notification using the contact form's action URL
            sendNotification("Liked");
        }
    });
}

// Payment Modal Logic
const paymentModal = document.getElementById('paymentModal');
const paymentBtns = document.querySelectorAll('.payment-btn');
const closePaymentBtn = document.querySelector('.close-modal');
const paymentForm = document.getElementById('paymentForm');
const planInfo = document.getElementById('selectedPlanInfo');

if (paymentModal) {
    paymentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const planName = btn.getAttribute('data-plan');
            const planPrice = btn.getAttribute('data-price');
            planInfo.innerHTML = `<strong>Selected Plan:</strong> ${planName} <br> <strong>Total:</strong> ${planPrice}`;
            paymentModal.style.display = 'block';
        });
    });

    closePaymentBtn.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = paymentForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Processing...';
        
        setTimeout(() => {
            alert('Payment Successful! (Demo Mode)');
            paymentModal.style.display = 'none';
            paymentForm.reset();
            btn.innerText = originalText;
        }, 1500);
    });
}

// Share Button Logic
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        sendNotification("Shared");
        // Try to use the native share API (Mobile/Modern Browsers)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Sewmini Ruwanthika | Portfolio',
                    text: 'Check out this amazing portfolio!',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share canceled or failed', err);
            }
        } else {
            // Fallback to copying link to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                const originalHTML = shareBtn.innerHTML;
                shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    shareBtn.innerHTML = originalHTML;
                }, 2000);
            });
        }
    });
}

// Follow & Subscribe Button Logic
const followBtn = document.querySelector('.action-btn.follow');
if (followBtn) {
    followBtn.addEventListener('click', () => sendNotification("Followed"));
}

const subscribeBtn = document.querySelector('.action-btn.subscribe');
if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => sendNotification("Subscribed"));
}

// Contact Email Click Logic (Copy to Clipboard)
const contactEmail = document.getElementById('contactEmail');
if (contactEmail) {
    contactEmail.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(contactEmail.innerText).then(() => {
            alert('Email address copied to clipboard!');
        });
    });
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
const viewButtons = document.querySelectorAll('.view-btn');

if (lightbox) {
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            lightbox.style.display = "block";
            lightboxImg.src = btn.getAttribute('href');
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}