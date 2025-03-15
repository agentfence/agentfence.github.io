// AgentFence Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');
                
                // Clone navigation links
                const navLinksClone = navLinks.cloneNode(true);
                navLinksClone.classList.add('mobile-nav-links');
                
                // Clone CTA buttons
                const ctaButtonsClone = ctaButtons.cloneNode(true);
                ctaButtonsClone.classList.add('mobile-cta-buttons');
                
                // Append to mobile menu
                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(ctaButtonsClone);
                
                // Append mobile menu to header
                document.querySelector('header').appendChild(mobileMenu);
            }
            
            // Toggle mobile menu visibility
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip links that don't point to an element (e.g., "#")
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.click();
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Demo Section Functionality
    const demoTextarea = document.querySelector('.demo-input textarea');
    const demoButton = document.querySelector('.demo-input button');
    const demoResults = document.querySelector('.demo-results');
    
    if (demoButton && demoTextarea && demoResults) {
        demoButton.addEventListener('click', function() {
            const prompt = demoTextarea.value.trim();
            
            if (!prompt) {
                alert('Please enter a prompt to test.');
                return;
            }
            
            // Show loading state
            demoResults.innerHTML = '<div class="loading"><div class="spinner"></div><p>Running security assessment...</p></div>';
            
            // Simulate API call with timeout
            setTimeout(function() {
                // Sample security assessment results
                const securityScore = Math.floor(Math.random() * 100);
                let riskLevel, recommendations;
                
                if (securityScore < 30) {
                    riskLevel = 'High Risk';
                    recommendations = [
                        'Potential prompt injection vulnerability detected',
                        'Could lead to data leakage or unauthorized access',
                        'Consider implementing strict input validation',
                        'Add context boundaries to prevent manipulation'
                    ];
                } else if (securityScore < 70) {
                    riskLevel = 'Medium Risk';
                    recommendations = [
                        'Some security concerns identified',
                        'Potential for unintended behavior',
                        'Review prompt handling logic',
                        'Implement additional guardrails'
                    ];
                } else {
                    riskLevel = 'Low Risk';
                    recommendations = [
                        'No major security issues detected',
                        'Continue monitoring for edge cases',
                        'Consider periodic security reviews'
                    ];
                }
                
                // Generate HTML for results
                let resultsHTML = `
                    <div class="security-assessment">
                        <div class="security-score ${riskLevel.toLowerCase().replace(' ', '-')}">
                            <div class="score-value">${securityScore}</div>
                            <div class="score-label">Security Score</div>
                        </div>
                        <div class="assessment-details">
                            <div class="risk-level">
                                <strong>Risk Level:</strong> <span class="${riskLevel.toLowerCase().replace(' ', '-')}">${riskLevel}</span>
                            </div>
                            <div class="recommendations">
                                <strong>Recommendations:</strong>
                                <ul>
                `;
                
                recommendations.forEach(rec => {
                    resultsHTML += `<li>${rec}</li>`;
                });
                
                resultsHTML += `
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                
                demoResults.innerHTML = resultsHTML;
            }, 2000);
        });
    }
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show submission message
            const formParent = contactForm.parentElement;
            formParent.innerHTML = `
                <div class="form-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
            `;
            
            // In a real implementation, you would send the form data to a server
            console.log('Form submitted:', formObject);
        });
    }
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .workflow-step, .pricing-card, .audience-card, .resource-card');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Add CSS class for animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('page-loaded');
}); 