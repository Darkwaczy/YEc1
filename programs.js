// Programs Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Assessment option selection
    const assessmentOptions = document.querySelectorAll('.assessment-option');
    
    assessmentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            assessmentOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Optional: Store selection for later use
            const selectedStage = this.querySelector('.option-title').textContent;
            console.log('Selected stage:', selectedStage);
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Button hover effects and interactions
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Track card interactions
    const trackCards = document.querySelectorAll('.track-card');
    
    trackCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });

    // Pathway card interactions
    const pathwayCards = document.querySelectorAll('.pathway-card');
    
    pathwayCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Event registration functionality
    const registerButtons = document.querySelectorAll('.register-button');
    
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            
            // Simulate registration process
            this.textContent = 'Registered!';
            this.style.background = '#10B981';
            this.disabled = true;
            
            // Show confirmation message
            showNotification(`Successfully registered for: ${eventTitle}`);
        });
    });

    // Program comparison table interactions
    const tableRows = document.querySelectorAll('.table-row');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            if (!this.classList.contains('pricing')) {
                this.style.backgroundColor = 'rgba(184, 134, 11, 0.05)';
            }
        });
        
        row.addEventListener('mouseleave', function() {
            if (!this.classList.contains('alt') && !this.classList.contains('pricing')) {
                this.style.backgroundColor = 'transparent';
            }
        });
    });

    // Testimonial card interactions
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        });
    });

    // Progress tracking animation
    const progressIcon = document.querySelector('.tracking-icon.progress');
    if (progressIcon) {
        animateProgress(progressIcon, 75);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (mobileMenuToggle && navigation) {
        mobileMenuToggle.addEventListener('click', function() {
            navigation.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Form validation for assessment
    const assessmentForm = document.querySelector('.assessment-card');
    if (assessmentForm) {
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Get Recommendations';
        submitButton.className = 'primary-button';
        submitButton.style.marginTop = '24px';
        submitButton.style.width = '100%';
        
        assessmentForm.appendChild(submitButton);
        
        submitButton.addEventListener('click', function() {
            const selectedOption = document.querySelector('.assessment-option.active');
            
            if (!selectedOption) {
                showNotification('Please select your current entrepreneurial stage', 'error');
                return;
            }
            
            const stage = selectedOption.querySelector('.option-title').textContent;
            showRecommendations(stage);
        });
    }

    // Utility functions
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : '#EF4444'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    function animateProgress(element, targetPercentage) {
        let currentPercentage = 0;
        const increment = targetPercentage / 50; // 50 frames for smooth animation
        
        const animation = setInterval(() => {
            currentPercentage += increment;
            element.textContent = Math.round(currentPercentage) + '%';
            
            if (currentPercentage >= targetPercentage) {
                element.textContent = targetPercentage + '%';
                clearInterval(animation);
            }
        }, 20);
    }

    function showRecommendations(stage) {
        const recommendations = {
            'Idea Stage': [
                'Startup Fundamentals Certification',
                'Training Academy Access',
                'Idea to Launch Pathway'
            ],
            'Early Startup': [
                'Digital Marketing Mastery',
                'Mentorship Matching',
                'Growth Accelerator Pathway'
            ],
            'Scaling Phase': [
                'Leadership & Management Track',
                'Business Spotlight Program',
                'All Access Program'
            ],
            'Established Business': [
                'Leadership & Management Track',
                'Mentorship Program (as Mentor)',
                'Business Spotlight Program'
            ]
        };

        const stageRecommendations = recommendations[stage] || [];
        
        let message = `Based on your selection (${stage}), we recommend:\n\n`;
        stageRecommendations.forEach((rec, index) => {
            message += `${index + 1}. ${rec}\n`;
        });
        
        message += '\nWould you like to learn more about these programs?';
        
        if (confirm(message)) {
            // Scroll to the relevant section
            const targetSection = document.querySelector('.training-academy-section');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }

    // Initialize tooltips for feature icons
    const featureIcons = document.querySelectorAll('.feature-icon, .benefit-icon');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.3s ease';

                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.style.opacity = '0';
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                }
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    console.log('Programs page initialized successfully!');
});

// Additional utility functions for enhanced interactivity
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number, .duration-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            counter.textContent = Math.ceil(current);
            
            if (current < target) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
});
