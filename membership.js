// Membership Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page functionality
    initializeNavigation();
    initializeForm();
    initializeSmoothScrolling();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = 'membership.html';
    
    // Set active navigation item
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('nav-link-active');
        }
    });
    
    // Handle mobile menu toggle (if needed in future)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
}

// Form handling
function initializeForm() {
    const form = document.getElementById('membershipForm');
    const submitButton = document.querySelector('.form-submit');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearFieldError);
        });
        
        // Handle tier selection from pricing cards
        const pricingButtons = document.querySelectorAll('.pricing-button');
        const tierSelect = document.getElementById('tier');
        
        pricingButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                let tierValue = '';
                if (button.classList.contains('pricing-button-starter')) {
                    tierValue = 'starter';
                } else if (button.classList.contains('pricing-button-professional')) {
                    tierValue = 'professional';
                } else if (button.classList.contains('pricing-button-elite')) {
                    tierValue = 'elite';
                }
                
                if (tierSelect && tierValue) {
                    tierSelect.value = tierValue;
                }
                
                // Scroll to application form
                const formContainer = document.querySelector('.application-form-container');
                if (formContainer) {
                    formContainer.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.form-submit');
    const formData = new FormData(form);
    
    // Validate all fields
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
    }, 2000);
}

// Form validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    clearFieldError(e);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
    }
    
    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    
    // Add error styles
    if (!document.querySelector('.error-styles')) {
        const style = document.createElement('style');
        style.className = 'error-styles';
        style.textContent = `
            .form-input.error,
            .form-select.error,
            .form-textarea.error {
                border-color: #ef4444;
            }
            .field-error {
                color: #ef4444;
                font-size: 12px;
                margin-top: 4px;
                font-family: var(--font-secondary);
            }
        `;
        document.head.appendChild(style);
    }
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showSuccessMessage() {
    // Create success modal or notification
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">✓</div>
            <h3>Application Submitted Successfully!</h3>
            <p>Thank you for your interest in joining YEC. We'll review your application and get back to you within 2-3 business days.</p>
            <button class="success-modal-close">Close</button>
        </div>
    `;
    
    // Add modal styles
    if (!document.querySelector('.success-modal-styles')) {
        const style = document.createElement('style');
        style.className = 'success-modal-styles';
        style.textContent = `
            .success-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            .success-modal-content {
                background: white;
                padding: 32px;
                border-radius: 8px;
                text-align: center;
                max-width: 400px;
                margin: 20px;
            }
            .success-icon {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                background-color: var(--color-green);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                margin: 0 auto 16px;
            }
            .success-modal h3 {
                font-family: var(--font-primary);
                font-weight: 600;
                font-size: 20px;
                color: var(--color-dark);
                margin-bottom: 12px;
            }
            .success-modal p {
                font-family: var(--font-secondary);
                font-size: 16px;
                color: var(--color-gray-medium);
                line-height: 1.5;
                margin-bottom: 24px;
            }
            .success-modal-close {
                background-color: var(--color-primary);
                color: white;
                border: none;
                border-radius: 6px;
                padding: 12px 24px;
                font-family: var(--font-tertiary);
                font-weight: 600;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(successModal);
    
    // Handle close button
    const closeButton = successModal.querySelector('.success-modal-close');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(successModal);
    });
    
    // Close on backdrop click
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            document.body.removeChild(successModal);
        }
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-button-primary, .cta-button-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const formContainer = document.querySelector('.application-form-container');
            if (formContainer) {
                formContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle "View Benefits" buttons
    const benefitsButtons = document.querySelectorAll('.hero-button-secondary');
    benefitsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const benefitsSection = document.querySelector('.benefits-section');
            if (benefitsSection) {
                benefitsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle "Compare All Features" button
    const compareButton = document.querySelector('.compare-button');
    if (compareButton) {
        compareButton.addEventListener('click', function(e) {
            e.preventDefault();
            // This could open a modal or navigate to a comparison page
            alert('Feature comparison coming soon!');
        });
    }
}

// Initialize animations and interactions
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.benefit-card, .pricing-card, .testimonial-card, .process-step, .trust-feature'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation styles
    if (!document.querySelector('.animation-styles')) {
        const style = document.createElement('style');
        style.className = 'animation-styles';
        style.textContent = `
            .benefit-card,
            .pricing-card,
            .testimonial-card,
            .process-step,
            .trust-feature {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .benefit-card.animate-in,
            .pricing-card.animate-in,
            .testimonial-card.animate-in,
            .process-step.animate-in,
            .trust-feature.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Stagger animation for grid items */
            .benefit-card:nth-child(1) { transition-delay: 0.1s; }
            .benefit-card:nth-child(2) { transition-delay: 0.2s; }
            .benefit-card:nth-child(3) { transition-delay: 0.3s; }
            .benefit-card:nth-child(4) { transition-delay: 0.4s; }
            .benefit-card:nth-child(5) { transition-delay: 0.5s; }
            .benefit-card:nth-child(6) { transition-delay: 0.6s; }
            
            .pricing-card:nth-child(1) { transition-delay: 0.1s; }
            .pricing-card:nth-child(2) { transition-delay: 0.2s; }
            .pricing-card:nth-child(3) { transition-delay: 0.3s; }
            
            .testimonial-card:nth-child(1) { transition-delay: 0.1s; }
            .testimonial-card:nth-child(2) { transition-delay: 0.2s; }
            .testimonial-card:nth-child(3) { transition-delay: 0.3s; }
        `;
        document.head.appendChild(style);
    }
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseInt(target.replace(/[^\d]/g, ''));
        const prefix = target.replace(/[\d,]/g, '');
        const suffix = target.replace(/[\d,]/g, '').replace(prefix, '');
        
        if (numericValue) {
            let current = 0;
            const increment = numericValue / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
            }, 20);
        }
    });
}

// Initialize counter animation when stats section is visible
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Handle pricing card interactions
function initializePricingInteractions() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize pricing interactions
initializePricingInteractions();

// Handle form field focus effects
function initializeFormEffects() {
    const formFields = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });
    
    // Add focus styles
    if (!document.querySelector('.form-focus-styles')) {
        const style = document.createElement('style');
        style.className = 'form-focus-styles';
        style.textContent = `
            .form-group.focused .form-label {
                color: var(--color-primary);
                transform: translateY(-2px);
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize form effects
initializeFormEffects();

// Utility function to debounce events
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

// Handle window resize events
window.addEventListener('resize', debounce(() => {
    // Recalculate any layout-dependent features
    console.log('Window resized');
}, 250));

// Handle scroll events for header effects (if needed)
let lastScrollTop = 0;
window.addEventListener('scroll', debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header');
    
    if (header) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        header.style.transition = 'transform 0.3s ease';
    }
    
    lastScrollTop = scrollTop;
}, 10));

// Export functions for potential external use
window.MembershipPage = {
    validateForm,
    showSuccessMessage,
    animateCounters
};
