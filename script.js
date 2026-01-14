// Recrafted Futures - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize EmailJS with a working public key
    emailjs.init("user_1234567890abcdef"); // This is a placeholder - you'll need to get your actual key from EmailJS
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            
            // Toggle menu visibility
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', !isActive);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = !isActive ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinksSmooth = document.querySelectorAll('a[href^="#"]');
    navLinksSmooth.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.impact-card, .stat, .opportunity-item, .impact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Donation Amount Selection
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Clear custom amount input
            if (customAmountInput) {
                customAmountInput.value = '';
            }
        });
    });
    
    // Custom amount input handling
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            // Remove active class from amount buttons when custom amount is entered
            amountButtons.forEach(btn => btn.classList.remove('active'));
        });
    }
    
    // Form Validation and Submission
    const volunteerForm = document.querySelector('.form');
    const donationForm = document.querySelector('.donation-form-content');
    const contactForm = document.querySelector('.contact-form-content');
    
    // Volunteer Form Handling
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your interest! We\'ll be in touch soon.', 'success');
            this.reset();
        });
    }
    
    // Donation Form Handling
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Get selected amount
            const activeAmountBtn = document.querySelector('.amount-btn.active');
            const selectedAmount = activeAmountBtn ? activeAmountBtn.dataset.amount : data.amount;
            
            if (!selectedAmount && !data.amount) {
                showNotification('Please select or enter a donation amount.', 'error');
                return;
            }
            
            if (!data.name || !data.email) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate donation processing
            const amount = selectedAmount || data.amount;
            showNotification(`Thank you for your donation of $${amount}! Your contribution directly supports Title 1 engineering schools.`, 'success');
            this.reset();
            document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
        });
    }
    
    // Contact Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            const templateParams = {
                to_email: 'recraftedfutures@gmail.com',
                from_name: 'Anonymous',
                from_email: 'noreply@recraftedfutures.org',
                phone: data.phone || 'Not provided',
                school: data.school || 'Not provided',
                subject: data.subject || 'General Question',
                message: data.message,
                reply_to: data.email
            };
            
            // Try EmailJS first, fallback to mailto if it fails
            emailjs.send('service_1234567', 'template_1234567', templateParams)
                .then(function(response) {
                    showNotification('Thank you for your message! We will get back to you.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.error('EmailJS error:', error);
                    // Fallback to mailto link
                    const subject = encodeURIComponent(data.subject || 'General Question');
                    const body = encodeURIComponent(
                        `Name: ${data.name}\n` +
                        `Email: ${data.email}\n` +
                        `Phone: ${data.phone || 'Not provided'}\n` +
                        `School: ${data.school || 'Not provided'}\n\n` +
                        `Message:\n${data.message}`
                    );
                    const mailtoLink = `mailto:recraftedfutures@gmail.com?subject=${subject}&body=${body}`;
                    window.open(mailtoLink);
                    showNotification('Opening your email client. Please send the email manually.', 'success');
                    contactForm.reset();
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            removeNotification(notification);
        });
    }
    
    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const suffix = element.textContent.replace(/[\d]/g, '');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
    
    // Accessibility: Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Accessibility: Focus Management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Initialize focus trapping for mobile menu
    if (navMenu) {
        trapFocus(navMenu);
    }
    
    // Performance: Lazy Loading for Images (if any are added later)
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Smooth reveal animations
    const revealElements = document.querySelectorAll('.section-title, .section-subtitle, .hero-title, .hero-subtitle');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Console welcome message
    console.log('%c Welcome to Recrafted Futures! ', 'color: #2c5aa0; font-size: 16px; font-weight: bold;');
    console.log('%cBuilding tomorrow together through sustainable community development.', 'color: #28a745; font-size: 12px;');
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for potential external use
window.RecraftedFutures = {
    showNotification: function(message, type) {
        // This would be the same showNotification function from above
        // Made available globally for external scripts
    }
};
// ===== PAYPAL DONATION LOGIC =====
let selectedAmount = 25;

document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAmount = btn.dataset.amount;
        document.getElementById('custom-amount').value = '';
    });
});

paypal.Buttons({
    style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'donate'
    },

    createOrder: function (data, actions) {
        const customAmount = document.getElementById('custom-amount').value;
        const amount = customAmount && customAmount > 0 ? customAmount : selectedAmount;

        return actions.order.create({
            purchase_units: [{
                amount: { value: amount },
                description: "Donation to Recrafted Futures"
            }]
        });
    },

    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            alert(
                "Thank you " +
                details.payer.name.given_name +
                "! Your donation was successful."
            );
        });
    },

    onError: function (err) {
        console.error(err);
        alert("Payment error. Please try again.");
    }
}).render('#paypal-button-container');
style: {
    layout: 'vertical',
    color: 'blue',
    shape: 'rect',
    label: 'donate'
},

