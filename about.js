// About Us Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navigation.classList.toggle('mobile-open');
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-animate');
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element) {
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[0-9.,]/g, '');
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            current += increment;
            step++;
            
            if (step >= steps) {
                current = number;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (suffix.includes('M')) {
                displayValue = (current).toFixed(0);
            } else if (number >= 1000) {
                displayValue = displayValue.toLocaleString();
            }
            
            element.textContent = displayValue + suffix;
        }, duration / steps);
    }

    // Button interactions
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Download report button
    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // Simulate download
            console.log('Downloading impact report...');
            // In a real implementation, this would trigger an actual download
        });
    }

    // CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button-primary, .cta-button-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (buttonText === 'Join YEC Today') {
                // Redirect to membership page
                console.log('Redirecting to membership page...');
            } else if (buttonText === 'Explore Community') {
                // Redirect to community page
                console.log('Redirecting to community page...');
            }
        });
    });

    // Social media links
    const socialLinks = document.querySelectorAll('.footer-social img, .member-social img');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Handle social media link clicks
            console.log('Opening social media link...');
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .timeline-animate .timeline-card {
        animation: slideInFromSide 0.6s ease forwards;
    }
    
    .timeline-item-right .timeline-card {
        transform: translateX(50px);
        opacity: 0;
    }
    
    .timeline-item-left .timeline-card {
        transform: translateX(-50px);
        opacity: 0;
    }
    
    @keyframes slideInFromSide {
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    button {
        transition: transform 0.15s ease;
    }
    
    .nav-link {
        transition: color 0.3s ease;
    }
    
    .footer-link-list a {
        transition: color 0.3s ease;
    }
`;
document.head.appendChild(style);
