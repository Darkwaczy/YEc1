// Community Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeSearch();
    initializeFilters();
    initializeMemberCards();
    initializeActivityFeed();
    initializeChapterCards();
    initializeForums();
    initializeScrollAnimations();
});

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const memberCards = document.querySelectorAll('.member-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            memberCards.forEach(card => {
                const name = card.querySelector('.member-name')?.textContent.toLowerCase() || '';
                const company = card.querySelector('.member-company')?.textContent.toLowerCase() || '';
                const bio = card.querySelector('.member-bio')?.textContent.toLowerCase() || '';
                const tags = Array.from(card.querySelectorAll('.member-tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
                
                const isMatch = name.includes(searchTerm) || 
                               company.includes(searchTerm) || 
                               bio.includes(searchTerm) || 
                               tags.includes(searchTerm);
                
                card.style.display = isMatch ? 'flex' : 'none';
            });
        });
    }
}

// Filter functionality
function initializeFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    const filterButton = document.querySelector('.filter-button');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // Add filter logic here
            console.log('Filter changed:', this.value);
        });
    });
    
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            // Toggle advanced filters
            console.log('Advanced filters toggled');
        });
    }
}

// Member card interactions
function initializeMemberCards() {
    const connectButtons = document.querySelectorAll('.connect-button');
    const messageButtons = document.querySelectorAll('.message-button');
    const loadMoreButton = document.querySelector('.load-more-button');
    
    connectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memberCard = this.closest('.member-card');
            const memberName = memberCard.querySelector('.member-name').textContent;
            
            // Simulate connection request
            this.textContent = 'Connecting...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Connected';
                this.style.backgroundColor = '#10B981';
                showNotification(`Connection request sent to ${memberName}!`);
            }, 1000);
        });
    });
    
    messageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memberCard = this.closest('.member-card');
            const memberName = memberCard.querySelector('.member-name').textContent;
            showNotification(`Opening message with ${memberName}...`);
        });
    });
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading more members
            setTimeout(() => {
                this.textContent = 'Load More Members';
                this.disabled = false;
                showNotification('More members loaded!');
            }, 1500);
        });
    }
}

// Activity feed interactions
function initializeActivityFeed() {
    const likeButtons = document.querySelectorAll('.stat-group');
    const registerButtons = document.querySelectorAll('.register-button');
    
    likeButtons.forEach(button => {
        if (button.querySelector('span')?.textContent.includes('likes')) {
            button.style.cursor = 'pointer';
            button.addEventListener('click', function() {
                const likeCount = this.querySelector('span');
                const currentCount = parseInt(likeCount.textContent.match(/\d+/)[0]);
                likeCount.textContent = `${currentCount + 1} likes`;
                
                // Add visual feedback
                this.style.color = '#B8860B';
                setTimeout(() => {
                    this.style.color = '';
                }, 300);
            });
        }
    });
    
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.textContent = 'Registered!';
            this.style.color = '#10B981';
            this.disabled = true;
            showNotification('Successfully registered for the event!');
        });
    });
}

// Chapter card interactions
function initializeChapterCards() {
    const joinChapterButtons = document.querySelectorAll('.join-chapter-button');
    const viewEventsButtons = document.querySelectorAll('.view-events-button');
    const startChapterButton = document.querySelector('.start-chapter-button');
    
    joinChapterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chapterCard = this.closest('.chapter-card');
            const chapterName = chapterCard.querySelector('.chapter-name').textContent;
            
            this.textContent = 'Joining...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Joined';
                this.style.backgroundColor = '#10B981';
                showNotification(`Successfully joined ${chapterName} chapter!`);
            }, 1000);
        });
    });
    
    viewEventsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const chapterCard = this.closest('.chapter-card');
            const chapterName = chapterCard.querySelector('.chapter-name').textContent;
            showNotification(`Viewing events for ${chapterName} chapter...`);
        });
    });
    
    if (startChapterButton) {
        startChapterButton.addEventListener('click', function() {
            showNotification('Opening chapter application form...');
        });
    }
}

// Forum interactions
function initializeForums() {
    const discussionItems = document.querySelectorAll('.discussion-item');
    const startDiscussionButton = document.querySelector('.start-discussion-button');
    const viewAllButton = document.querySelector('.view-all-button');
    
    discussionItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const title = this.querySelector('.discussion-title-text').textContent;
            showNotification(`Opening discussion: ${title}`);
        });
    });
    
    if (startDiscussionButton) {
        startDiscussionButton.addEventListener('click', function() {
            showNotification('Opening discussion composer...');
        });
    }
    
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            showNotification('Loading all discussions...');
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.member-card, .activity-post, .chapter-card, .story-card, .sidebar-widget');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility function to show notifications
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #B8860B;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        font-family: 'Nunito Sans', sans-serif;
        font-weight: 600;
        font-size: 14px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle CTA buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.primary-button, .primary-cta-button')) {
        showNotification('Redirecting to membership signup...');
    }
    
    if (e.target.matches('.secondary-button, .secondary-cta-button')) {
        showNotification('Opening contact form...');
    }
    
    if (e.target.matches('.join-button')) {
        showNotification('Opening YEC application...');
    }
});

// Add hover effects for interactive elements
document.addEventListener('mouseover', function(e) {
    if (e.target.matches('.member-card, .activity-post, .chapter-card, .story-card')) {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.matches('.member-card, .activity-post, .chapter-card, .story-card')) {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '';
    }
});

// Initialize tooltips for icons
function initializeTooltips() {
    const icons = document.querySelectorAll('.action-icon, .widget-icon, .location-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.textContent = this.alt || 'Icon';
            tooltip.style.cssText = `
                position: absolute;
                background-color: #1a1a1a;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            this._tooltip = tooltip;
        });
        
        icon.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                document.body.removeChild(this._tooltip);
                this._tooltip = null;
            }
        });
    });
}

// Initialize tooltips
initializeTooltips();

// Handle responsive navigation
function initializeResponsiveNav() {
    const nav = document.querySelector('.main-navigation');
    const navLinks = document.querySelector('.nav-links');
    
    // Add mobile menu toggle if needed
    if (window.innerWidth <= 768) {
        // Mobile navigation logic can be added here
        console.log('Mobile navigation initialized');
    }
}

// Initialize responsive features
initializeResponsiveNav();

// Handle window resize
window.addEventListener('resize', function() {
    initializeResponsiveNav();
});

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.3s ease';
                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.style.opacity = '0';
                    img.onload = function() {
                        this.style.opacity = '1';
                    };
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
initializeLazyLoading();

console.log('Community page JavaScript initialized successfully!');
