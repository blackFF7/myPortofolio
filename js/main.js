// Smooth scroll behavior for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 90;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    });
});

// Close mobile menu when link clicked (optional)
navLinks.forEach(anchor => {
    anchor.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// Add animation to skill cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.skill-card, .project-card, .stat-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active link highlight
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animate counter on about section
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target'), 10) || parseInt(counter.innerText.replace(/\D/g, ''), 10) || 0;
            const count = parseInt(counter.innerText.replace(/\D/g, ''), 10) || 0;
            const increment = Math.max(1, Math.floor(target / speed));
            
            if (count < target) {
                counter.innerText = Math.min(target, count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        // Only animate when element is in view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counter.hasAttribute('data-animated')) {
                    counter.setAttribute('data-animated', 'true');
                    updateCount();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
};

animateCounters();

// Mobile menu toggle (if you add a mobile menu button later)
const mobileMenuButton = document.querySelector('.mobile-menu-btn');
if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
}

console.log('Portfolio loaded successfully!');