// Global state
let currentUser = null;
let isLoggedIn = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    setupForms();
    setupDashboardChart();
    checkAuthState();
}

// Navigation System
function setupNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
            
            // Update active nav link
            document.querySelectorAll('.nav__link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            if (this.classList.contains('nav__link')) {
                this.classList.add('active');
            }
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });

    // Handle footer navigation
    const footerLinks = document.querySelectorAll('.footer__column a[data-page]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
        });
    });
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Update page title
        updatePageTitle(pageId);
        
        // Initialize page-specific functionality
        if (pageId === 'dashboard') {
            initializeDashboard();
        }
    }
}

function updatePageTitle(pageId) {
    const titles = {
        'home': 'AI Mock Interviews - Master Your Interviews with AI-Powered Practice',
        'login': 'Login - AI Mock Interviews',
        'signup': 'Sign Up - AI Mock Interviews',
        'contact': 'Contact Us - AI Mock Interviews',
        'dashboard': 'Dashboard - AI Mock Interviews'
    };
    
    document.title = titles[pageId] || 'AI Mock Interviews';
}

// Mobile Menu
function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// Form Handling
function setupForms() {
    setupLoginForm();
    setupSignupForm();
    setupContactForm();
}

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Simulate login process
            simulateLogin(email, password);
        });
    }
}

function setupSignupForm() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Simulate signup process
            simulateSignup(name, email, password);
        });
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            simulateContactSubmission(data);
        });
    }
}

// Authentication Simulation
function simulateLogin(email, password) {
    // Show loading state
    const submitBtn = document.querySelector('#loginForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing In...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate successful login
        currentUser = {
            name: 'John Doe',
            email: email,
            joinDate: new Date().toLocaleDateString(),
            totalSessions: 24,
            hoursPracticed: 18.5,
            improvement: 23,
            streak: 7
        };
        
        isLoggedIn = true;
        
        // Update UI
        updateAuthState();
        showPage('dashboard');
        showSuccessMessage('Welcome back! Login successful.');
        
        // Reset form
        document.getElementById('loginForm').reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function simulateSignup(name, email, password) {
    const submitBtn = document.querySelector('#signupForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate successful signup
        currentUser = {
            name: name,
            email: email,
            joinDate: new Date().toLocaleDateString(),
            totalSessions: 0,
            hoursPracticed: 0,
            improvement: 0,
            streak: 0
        };
        
        isLoggedIn = true;
        
        // Update UI
        updateAuthState();
        showPage('dashboard');
        showSuccessMessage('Account created successfully! Welcome to AI Mock Interviews.');
        
        // Reset form
        document.getElementById('signupForm').reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function simulateContactSubmission(data) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Show success message
        showContactSuccessMessage();
        
        // Reset form
        document.getElementById('contactForm').reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function showContactSuccessMessage() {
    const contactForm = document.getElementById('contactForm');
    const existingMessage = contactForm.querySelector('.success-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';
    
    contactForm.appendChild(successMessage);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

function showSuccessMessage(message) {
    // Create and show a temporary success message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '90px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.zIndex = '1001';
    messageDiv.style.maxWidth = '400px';
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Auth State Management
function checkAuthState() {
    // Check if user is logged in (in a real app, this would check localStorage/sessionStorage)
    // For demo purposes, we'll start logged out
    updateAuthState();
}

function updateAuthState() {
    const authButtons = document.querySelector('.nav__auth');
    
    if (isLoggedIn && currentUser) {
        // Update navigation for logged-in state
        authButtons.innerHTML = `
            <span style="color: var(--color-text-secondary); margin-right: var(--space-16);">Welcome, ${currentUser.name.split(' ')[0]}</span>
            <button class="btn btn--outline btn--sm" data-page="dashboard">Dashboard</button>
            <button class="btn btn--primary btn--sm" onclick="logout()">Logout</button>
        `;
        
        // Re-setup navigation for new buttons
        setupNavigation();
    } else {
        // Reset to logged-out state
        authButtons.innerHTML = `
            <button class="btn btn--outline btn--sm" data-page="login">Login</button>
            <button class="btn btn--primary btn--sm" data-page="signup">Sign Up</button>
        `;
        
        // Re-setup navigation for new buttons
        setupNavigation();
    }
}

function logout() {
    currentUser = null;
    isLoggedIn = false;
    updateAuthState();
    showPage('home');
    showSuccessMessage('You have been logged out successfully.');
}

// Dashboard Functionality
function initializeDashboard() {
    if (!isLoggedIn) {
        showPage('login');
        return;
    }
    
    updateDashboardContent();
    setupDashboardChart();
}

function updateDashboardContent() {
    if (!currentUser) return;
    
    // Update welcome message
    const welcomeMessage = document.querySelector('.dashboard__header h2');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${currentUser.name.split(' ')[0]}!`;
    }
    
    // Update metrics
    const metricCards = document.querySelectorAll('.metric__card');
    if (metricCards.length >= 4) {
        metricCards[0].querySelector('.metric__value').textContent = currentUser.totalSessions;
        metricCards[1].querySelector('.metric__value').textContent = currentUser.hoursPracticed;
        metricCards[2].querySelector('.metric__value').textContent = `+${currentUser.improvement}%`;
        metricCards[3].querySelector('.metric__value').textContent = `${currentUser.streak} days`;
    }
}

function setupDashboardChart() {
    const chartCanvas = document.getElementById('progressChart');
    if (!chartCanvas) return;
    
    // Destroy existing chart if it exists
    if (window.dashboardChart) {
        window.dashboardChart.destroy();
    }
    
    const ctx = chartCanvas.getContext('2d');
    
    // Sample data for progress chart
    const progressData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [
            {
                label: 'Confidence Score',
                data: [45, 52, 58, 65, 72, 78],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Communication',
                data: [50, 58, 65, 71, 78, 85],
                borderColor: '#FFC185',
                backgroundColor: 'rgba(255, 193, 133, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Technical Skills',
                data: [40, 45, 52, 58, 65, 72],
                borderColor: '#B4413C',
                backgroundColor: 'rgba(180, 65, 60, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };
    
    window.dashboardChart = new Chart(ctx, {
        type: 'line',
        data: progressData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            }
        }
    });
}

// Dashboard Actions
function setupDashboardActions() {
    // Start New Practice
    const startPracticeBtn = document.querySelector('.dashboard__sidebar .btn--primary');
    if (startPracticeBtn) {
        startPracticeBtn.addEventListener('click', function() {
            alert('Starting new practice session... (This would open the practice interface in a full application)');
        });
    }
    
    // Review Feedback
    const reviewFeedbackBtns = document.querySelectorAll('.dashboard__sidebar .btn--outline');
    if (reviewFeedbackBtns[0]) {
        reviewFeedbackBtns[0].addEventListener('click', function() {
            alert('Opening feedback review... (This would show detailed feedback from previous sessions)');
        });
    }
    
    // View Analytics
    if (reviewFeedbackBtns[1]) {
        reviewFeedbackBtns[1].addEventListener('click', function() {
            alert('Opening analytics dashboard... (This would show detailed progress analytics)');
        });
    }
}

// Demo Functionality
function setupDemoActions() {
    const demoBtn = document.querySelector('.hero__actions .btn--outline');
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            alert('Demo video would play here showing the AI mock interview experience!');
        });
    }
}

// Smooth scrolling for internal links
function setupSmoothScrolling() {
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
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupDashboardActions();
    setupDemoActions();
    setupSmoothScrolling();
    
    // Add some interactive hover effects
    addInteractiveEffects();
});

function addInteractiveEffects() {
    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature__card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
    
    // Testimonial cards hover effect
    const testimonialCards = document.querySelectorAll('.testimonial__card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.dashboardChart) {
        window.dashboardChart.resize();
    }
    
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && window.dashboardChart) {
        // Refresh chart when page becomes visible
        window.dashboardChart.update();
    }
});

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showPage,
        simulateLogin,
        simulateSignup,
        logout,
        updateAuthState
    };
}