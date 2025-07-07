/**
 * Main JavaScript file for Portfolio Website
 * Contains initialization for:
 * - GSAP animations
 * - AOS (Animate on Scroll)
 * - Theme toggling
 * - Mobile menu
 * - Lottie animations
 * - Smooth scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    ScrollTrigger.create({
        trigger: 'body',
        start: '80px top',
        onEnter: () => {
            navbar.classList.add('shadow-md', 'py-2');
            navbar.classList.remove('py-4');
        },
        onLeaveBack: () => {
            navbar.classList.remove('shadow-md', 'py-2');
            navbar.classList.add('py-4');
        }
    });

    // Parallax effect for hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const shapes = heroSection.querySelectorAll('.shape');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -scrollY * speed;
                
                gsap.to(shape, {
                    y: yPos,
                    ease: 'none',
                    duration: 0.3
                });
            });
        });
    }

    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.project-overlay');
            const image = card.querySelector('.project-image img');
            
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.3
            });
            
            gsap.to(image, {
                scale: 1.1,
                duration: 0.5
            });
            
            gsap.to(card, {
                y: -10,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.project-overlay');
            const image = card.querySelector('.project-image img');
            
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.3
            });
            
            gsap.to(image, {
                scale: 1,
                duration: 0.5
            });
            
            gsap.to(card, {
                y: 0,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                duration: 0.3
            });
        });
    });

    // Skill progress bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percentage = bar.style.width;
        
        gsap.fromTo(bar, 
            { width: '0%' },
            {
                width: percentage,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 80%'
                }
            }
        );
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%'
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Animate menu items if menu is visible
            if (!mobileMenu.classList.contains('hidden')) {
                const menuItems = mobileMenu.querySelectorAll('a, button');
                
                gsap.from(menuItems, {
                    opacity: 0,
                    y: 20,
                    stagger: 0.1,
                    duration: 0.4,
                    ease: 'power3.out'
                });
            }
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const html = document.documentElement;
    const themeIcons = document.querySelectorAll('.theme-toggle i');
    
    function updateThemeIcons(isDark) {
        themeIcons.forEach(icon => {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
    
    function toggleDarkMode() {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
        
        // Update theme icons
        updateThemeIcons(isDark);
        
        // Animate theme change
        if (isDark) {
            gsap.to('body', {
                backgroundColor: '#111827', // dark:bg-gray-900
                color: '#f9fafb', // dark:text-white
                duration: 0.3
            });
        } else {
            gsap.to('body', {
                backgroundColor: '#ffffff', // bg-white
                color: '#1f2937', // text-gray-900
                duration: 0.3
            });
        }
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'dark') {
        html.classList.add('dark');
        updateThemeIcons(true);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleDarkMode);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the height of the navbar
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                
                // Calculate the scroll position
                const scrollPosition = targetElement.offsetTop - navbarHeight;
                
                // Scroll to the target
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            fetch('/send-message', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message with animation
                    formSuccess.classList.remove('hidden');
                    gsap.from(formSuccess, {
                        opacity: 0,
                        y: -20,
                        duration: 0.5
                    });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        gsap.to(formSuccess, {
                            opacity: 0,
                            y: -20,
                            duration: 0.5,
                            onComplete: () => {
                                formSuccess.classList.add('hidden');
                                formSuccess.style.opacity = 1;
                                formSuccess.style.transform = 'none';
                            }
                        });
                    }, 5000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    // Initialize Lottie animations
    const contactLottie = document.getElementById('contact-lottie');
    if (contactLottie) {
        lottie.loadAnimation({
            container: contactLottie,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/static/lottie/contact-animation.json'
        });
    }

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-menu-link');
    
    function highlightNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Desktop nav
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Mobile nav
                mobileNavLinks.forEach(link => {
                    link.classList.remove('bg-gray-100', 'dark:bg-gray-700');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('bg-gray-100', 'dark:bg-gray-700');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Initial call to highlight the current section
    highlightNavLink();
}); 