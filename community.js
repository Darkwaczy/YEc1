// Community Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeDirectory();
    initializeActivityFeed();
    initializeChapterCards();
    initializeForums();
    initializeScrollAnimations();
});

// Member directory data
const industryOptions = [
    'Technology',
    'Banking',
    'Marketing',
    'Logistics',
    'Healthcare',
    'Education',
    'CleanTech',
    'Food & Beverage',
    'Construction',
    'E-commerce'
];

const locationOptions = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
    'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT'
];

const membersData = [
    {
        name: 'Okechukwu Martins',
        title: 'Founder & CEO',
        company: 'Qrest Company, Co-founder Kargoo',
        tags: ['SaaS', 'AI/ML', 'B2B'],
        bio: 'Building AI-powered workflow automation tools. Mentor for early-stage SaaS founders.',
        location: 'Abia',
        industry: 'Technology',
        email: 'okechukwu@qrest.com',
        whatsapp: '2348011111111',
        avatar: 'assets/builder/f8c3608ee1a5a59765e1a82c9d04742836704717.webp'
    },
    {
        name: 'Chioma Nwojeh',
        title: 'Founder & CEO',
        company: 'Nich-The Branded Wears',
        tags: ['HealthTech', 'AI', 'B2B'],
        bio: 'AI-powered healthcare diagnostics. Seeking partnerships with medical institutions.',
        location: 'Abia',
        industry: 'Healthcare',
        email: 'chioma@nichts.com',
        whatsapp: '2348022222222',
        avatar: 'assets/builder/e37616c2a18681fce27be5d1ea95a8eec7100f78.webp'
    },
    {
        name: 'Christmas Ifeanyi',
        title: 'Founder & Creative Director',
        company: 'Have-More Foods',
        tags: ['Marketing', 'Branding', 'Agency'],
        bio: 'Full-service digital marketing agency. Mentor for service-based businesses and agencies.',
        location: 'Abia',
        industry: 'Marketing',
        email: 'christmas@havemorefoods.com',
        whatsapp: '2348033333333',
        avatar: 'assets/builder/92200fa0077c7171ed3876c332f80bb9adf05d4f.webp'
    },
    {
        name: 'Wisdom Lion Ekeleme',
        title: 'Founder & CEO',
        company: 'Lion Dynasty Multiglobal Company',
        tags: ['Logistics', 'Supply Chain', 'B2B'],
        bio: 'Sustainable supply chain solutions. Open to partnerships with e-commerce companies.',
        location: 'Abia',
        industry: 'Logistics',
        email: 'wisdom@liondynasty.com',
        whatsapp: '2348044444444',
        avatar: 'assets/builder/a4adaf0b6a99f2044425fa78d03c08dc24c8163e.webp'
    },
    {
        name: 'David Ololo. O',
        title: 'Founder & CEO',
        company: 'Tunched Tech/Tunched Ltd',
        tags: ['FinTech', 'Blockchain', 'B2C'],
        bio: 'Personal finance management platform. Looking for advisors with regulatory experience.',
        location: 'Abia',
        industry: 'Banking',
        email: 'david@tunched.com',
        whatsapp: '2348055555555',
        avatar: 'assets/builder/699fcafba0a0c892477cb5c5e51ee806d027bb86.webp'
    },
    {
        name: 'Kalu Kingsley',
        title: 'Founder & CEO',
        company: 'Ingstech, Bripp',
        tags: ['CleanTech', 'Sustainability', 'Hardware'],
        bio: 'Developing sustainable energy solutions. Looking for partnerships in renewable technology.',
        location: 'Akwa Ibom',
        industry: 'CleanTech',
        email: 'kalu@ingstech.com',
        whatsapp: '2348066666666',
        avatar: 'assets/builder/2f44510909616febc804c6f0707e4c6a276be5e8.webp'
    },
];

const moreMembersData = [
    {
        name: 'Amara Uzochukwu',
        title: 'Co-Founder',
        company: 'Zobo Moment',
        tags: ['FoodTech', 'E-commerce', 'B2C'],
        bio: 'Building a scalable D2C beverage brand. Open to distribution partners.',
        location: 'Lagos',
        industry: 'Food & Beverage',
        email: 'amara@zobomoment.com',
        whatsapp: '2348077777777',
        avatar: 'assets/builder/03d5005d9c6f90e0ddbd74e0a6044dd10a294251.webp'
    },
    {
        name: 'Kelvin Adebayo',
        title: 'Product Lead',
        company: 'Bripp',
        tags: ['FinTech', 'Payments', 'B2B'],
        bio: 'Designing secure payment rails for SMEs across Africa.',
        location: 'Oyo',
        industry: 'Banking',
        email: 'kelvin@bripp.africa',
        whatsapp: '2348088888888',
        avatar: 'assets/builder/1a2254744f1cbbd574b4da2c2df92c062ec90f58.webp'
    },
    {
        name: 'Aisha Bello',
        title: 'Founder',
        company: 'EduCloud',
        tags: ['EdTech', 'AI', 'B2B'],
        bio: 'Helping schools digitize learning with adaptive AI tools.',
        location: 'FCT',
        industry: 'Education',
        email: 'aisha@educloud.io',
        whatsapp: '2348099999999',
        avatar: 'assets/builder/64f83b93657aea6d0309dfdaec78250920fa2fa6.webp'
    },
    {
        name: 'Ifeoma Okoro',
        title: 'Founder & CEO',
        company: 'GreenBuild',
        tags: ['CleanTech', 'Construction', 'B2B'],
        bio: 'Sustainable building materials for fast-growing cities.',
        location: 'Enugu',
        industry: 'Construction',
        email: 'ifeoma@greenbuild.com',
        whatsapp: '2348101010101',
        avatar: 'assets/builder/8bf11482c6438f7833449a09978753e18bd16989.webp'
    },
    {
        name: 'David Ololo. O',
        title: 'Founder & CEO',
        company: 'Tunched Tech/Tunched Ltd',
        tags: ['FinTech', 'Blockchain', 'B2C'],
        bio: 'Personal finance management platform. Looking for advisors with regulatory experience.',
        location: 'Abia',
        industry: 'Banking',
        email: 'david@tunched.com',
        whatsapp: '2348055555555',
        avatar: 'assets/builder/699fcafba0a0c892477cb5c5e51ee806d027bb86.webp'
    },
    {
        name: 'Kalu Kingsley',
        title: 'Founder & CEO',
        company: 'Ingstech, Bripp',
        tags: ['CleanTech', 'Sustainability', 'Hardware'],
        bio: 'Developing sustainable energy solutions. Looking for partnerships in renewable technology.',
        location: 'Akwa Ibom',
        industry: 'CleanTech',
        email: 'kalu@ingstech.com',
        whatsapp: '2348066666666',
        avatar: 'assets/builder/2f44510909616febc804c6f0707e4c6a276be5e8.webp'
    }
];

let currentMembers = membersData.slice();
let loadMoreUsed = false;

function initializeDirectory() {
    const searchInput = document.querySelector('.search-input');
    const industrySelect = document.getElementById('industryFilter');
    const locationSelect = document.getElementById('locationFilter');
    const filterButton = document.querySelector('.filter-button');
    const loadMoreButton = document.querySelector('.load-more-button');

    renderMembers(currentMembers);
    populateFilterOptions(industrySelect, locationSelect);
    bindMemberActions();

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (industrySelect) {
        industrySelect.addEventListener('change', applyFilters);
    }

    if (locationSelect) {
        locationSelect.addEventListener('change', applyFilters);
    }

    if (filterButton) {
        filterButton.addEventListener('click', applyFilters);
    }

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            this.textContent = 'Loading...';
            this.disabled = true;

            setTimeout(() => {
                if (!loadMoreUsed) {
                    currentMembers = moreMembersData.slice();
                    loadMoreUsed = true;
                    showNotification('6 more members loaded!');
                } else {
                    currentMembers = membersData.slice();
                    loadMoreUsed = false;
                    showNotification('Showing first 6 members.');
                }
                renderMembers(currentMembers);
                bindMemberActions();
                applyFilters();
                this.textContent = 'Load More Members';
                this.disabled = false;
            }, 800);
        });
    }
}

function renderMembers(list) {
    const grid = document.querySelector('.members-grid');
    if (!grid) return;

    grid.innerHTML = list.map(member => `
        <div class="member-card" data-industry="${member.industry}" data-location="${member.location}">
            <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
            <h3 class="member-name">${member.name}</h3>
            <p class="member-title">${member.title}</p>
            <p class="member-company">${member.company}</p>
            <div class="member-tags">
                ${member.tags.map(tag => `<span class="member-tag">${tag}</span>`).join('')}
            </div>
            <p class="member-bio">${member.bio}</p>
            <div class="member-location">
                <img src="assets/builder/2ebc42fb54d86fe976f702d4b746c435afdaa9cf.svg" alt="Location" class="location-icon">
                <span>${formatLocation(member.location)}</span>
            </div>
            <div class="member-actions">
                <button class="connect-button" data-email="${member.email}">Connect</button>
                <button class="message-button" data-whatsapp="${member.whatsapp}">Message</button>
            </div>
        </div>
    `).join('');
}

function populateFilterOptions(industrySelect, locationSelect) {
    if (!industrySelect || !locationSelect) return;

    industrySelect.innerHTML = `<option value="all">All Industries</option>` +
        industryOptions.map(industry => `<option value="${industry}">${industry}</option>`).join('');
    locationSelect.innerHTML = `<option value="all">All Locations</option>` +
        locationOptions.map(location => `<option value="${location}">${location}</option>`).join('');
}

function formatLocation(location) {
    if (location === 'FCT') {
        return 'FCT, Abuja';
    }
    return `${location} State`;
}

function applyFilters() {
    const searchInput = document.querySelector('.search-input');
    const industrySelect = document.getElementById('industryFilter');
    const locationSelect = document.getElementById('locationFilter');

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const industryValue = industrySelect ? industrySelect.value : 'all';
    const locationValue = locationSelect ? locationSelect.value : 'all';

    const filtered = currentMembers.filter(member => {
        const matchesSearch = [
            member.name,
            member.company,
            member.bio,
            member.tags.join(' ')
        ].join(' ').toLowerCase().includes(searchTerm);

        const matchesIndustry = industryValue === 'all' || member.industry === industryValue;
        const matchesLocation = locationValue === 'all' || member.location === locationValue;

        return matchesSearch && matchesIndustry && matchesLocation;
    });

    renderMembers(filtered);
    bindMemberActions();
}

function bindMemberActions() {
    const connectButtons = document.querySelectorAll('.connect-button');
    const messageButtons = document.querySelectorAll('.message-button');

    connectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const email = this.getAttribute('data-email');
            showNotification(`Member email: ${email}`);
        });
    });

    messageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phone = this.getAttribute('data-whatsapp');
            const url = `https://wa.me/${phone}`;
            window.open(url, '_blank');
        });
    });
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
