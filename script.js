// Young Entrepreneurs Collective - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeButtons();
    initializeScrollEffects();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Smooth scroll to section (if sections exist)
            const text = this.querySelector('.nav-text').textContent.toLowerCase();
            const targetSection = document.querySelector(`[data-section="${text}"]`);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Button interactions
function initializeButtons() {
    // Join YEC buttons
    const joinButtons = document.querySelectorAll('.join-button, .primary-button, .cta-primary-button');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simulate join action (replace with actual functionality)
            console.log('Join YEC clicked');
            // You can add actual join functionality here
        });
    });
    
    // Secondary buttons
    const secondaryButtons = document.querySelectorAll('.secondary-button, .cta-secondary-button');
    
    secondaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            console.log('Explore/Programs clicked');
            // Add navigation to programs/community page
        });
    });
    
    // View All Activity button
    const viewAllButton = document.querySelector('.view-all-button');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            console.log('View All Activity clicked');
            // Add navigation to activity feed page
        });
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
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
    
    // Observe sections for animation
    const sections = document.querySelectorAll('.features-section, .success-stories-section, .live-activity-section, .trust-section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards for staggered animation
    const cards = document.querySelectorAll('.feature-card, .story-card, .activity-card, .trust-item');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Counter animations for statistics
function initializeAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format numbers appropriately
            if (element.dataset.format === 'percent') {
                element.textContent = `${Math.floor(current)}%`;
            } else if (target >= 1000000) {
                element.textContent = `$${(current / 1000000).toFixed(0)}M`;
            } else if (target >= 1000) {
                element.textContent = Math.floor(current).toLocaleString();
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    };
    
    // Intersection Observer for statistics
    const parseTarget = (element) => {
        const text = element.textContent.trim();
        if (text.includes('%')) {
            element.dataset.format = 'percent';
            return parseInt(text.replace(/[%\\s]/g, ''), 10);
        }
        if (text.includes('$') && text.includes('M')) {
            return parseInt(text.replace(/[$M,]/g, ''), 10) * 1000000;
        }
        const numeric = parseInt(text.replace(/[,$]/g, ''), 10);
        return isNaN(numeric) ? 0 : numeric;
    };

    if (!('IntersectionObserver' in window)) {
        stats.forEach(stat => {
            const target = parseTarget(stat);
            if (target > 0) {
                animateCounter(stat, target);
            }
        });
        return;
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseTarget(element);
                
                if (target > 0) {
                    animateCounter(element, target);
                    statsObserver.unobserve(element);
                }
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Activity card interactions
function initializeActivityCards() {
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0px 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0px 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Social media links
function initializeSocialLinks() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Add actual social media links here
            console.log('Social media link clicked');
        });
    });
}

// Mobile menu toggle (if needed)
function initializeMobileMenu() {
    // Add mobile menu functionality if hamburger menu is added
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (mobileMenuToggle && navigation) {
        mobileMenuToggle.addEventListener('click', function() {
            navigation.classList.toggle('mobile-open');
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
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
}

// Form validation (if forms are added)
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation logic here
            console.log('Form submitted');
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeActivityCards();
    initializeSocialLinks();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeFormValidation();
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card,
    .story-card,
    .activity-card,
    .trust-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .feature-card.animate-in,
    .story-card.animate-in,
    .activity-card.animate-in,
    .trust-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .activity-card {
        transition: all 0.3s ease;
    }
    
    .nav-item {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .nav-item:hover {
        background-color: rgba(184, 134, 11, 0.1);
    }
    
    button {
        transition: all 0.3s ease;
    }
    
    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    button:active {
        transform: translateY(0);
    }
`;

document.head.appendChild(style);

// Export functions for potential external use
window.YECInteractive = {
    initializeNavigation,
    initializeButtons,
    initializeScrollEffects,
    initializeAnimations
};
