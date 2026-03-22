// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
}

// Contact form submission
function handleSubmit(e) {
    e.preventDefault();
    
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.style.opacity = '0.5';
    
    setTimeout(() => {
        button.textContent = 'Sent!';
        button.style.opacity = '1';
        alert('Thank you for your message! I will get back to you within 24 hours.');
        e.target.reset();
        
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }, 1000);
}

// Smooth cursor follower effect
function customCursor() {
    if (window.innerWidth <= 768) return;

    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dotX = e.clientX;
        dotY = e.clientY;
    });
    
    function animate() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            width: 40px;
            height: 40px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, border 0.3s;
        }
        
        .cursor-dot {
            width: 6px;
            height: 6px;
            background: #fff;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
        }
        
        .custom-cursor.hover {
            width: 60px;
            height: 60px;
            border-color: #fff;
        }
        
        @media (min-width: 769px) {
            body {
                cursor: none;
            }
            
            a, button, .card, .cta-button {
                cursor: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    const hoverElements = document.querySelectorAll('a, button, .card, .cta-button');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Parallax effect on scroll
function parallaxScroll() {
    const parallaxElements = document.querySelectorAll('.card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.03 + (index * 0.01);
                const yPos = -(scrolled - elementTop) * speed;
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// Staggered text reveal animation
function textReveal() {
    const textElements = document.querySelectorAll('h2, h3');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.03}s`;
            element.appendChild(span);
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInChar {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        h2 span, h3 span {
            transform: translateY(20px);
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll
function smoothScroll() {
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

// Page transition effect
function pageTransitions() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 10001;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    document.body.appendChild(overlay);
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !link.getAttribute('target')) {
            link.addEventListener('click', (e) => {
                if (href && href !== 'mailto:' && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
                    e.preventDefault();
                    overlay.style.opacity = '1';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                }
            });
        }
    });
}

// Fade-in on scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.card, .about-intro-text, .about-what-i-do, .about-image, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Hero reveal
function heroReveal() {
    const hero = document.querySelector('.hero h1');
    const heroP = document.querySelector('.hero p');
    const heroBtn = document.querySelector('.hero .cta-button');
    
    if (hero) {
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroP) {
        setTimeout(() => {
            heroP.style.opacity = '1';
            heroP.style.transform = 'translateY(0)';
        }, 400);
    }
    
    if (heroBtn) {
        setTimeout(() => {
            heroBtn.style.opacity = '1';
            heroBtn.style.transform = 'translateY(0)';
        }, 700);
    }
}

// Liquid glass effect — mouse tracking only, no movement
function magneticButtons() {
    const buttons = document.querySelectorAll('.cta-button, .card');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
            const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
            button.style.setProperty('--mouse-x', `${mouseX}%`);
            button.style.setProperty('--mouse-y', `${mouseY}%`);
        });
    });
}

// Scroll progress bar
function scrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.5) 100%);
        width: 0%;
        z-index: 9998;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Floating elements on mouse move
function floatingElements() {
    if (window.innerWidth <= 768) return;

    const floaters = document.querySelectorAll('.hero h1, .hero p');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 10 - 5;
        const y = (e.clientY / window.innerHeight) * 10 - 5;
        
        floaters.forEach((floater, index) => {
            const speed = (index + 1) * 0.3;
            floater.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// ====== GALLERY POPUP ======

const galleries = {
    poster: {
        title: 'Poster Design',
        type: 'poster',
        images: [
            'images/posters/poster1.jpg',
            'images/posters/poster2.jpg',
            'images/posters/poster3.jpg',
            'images/posters/poster4.jpg',
            'images/posters/poster5.jpg',
            'images/posters/poster6.jpg',
            'images/posters/poster7.jpg',
            'images/posters/poster8.jpg',
            'images/posters/poster9.jpg',
            'images/posters/poster10.jpg',
            'images/posters/poster11.jpg',
            'images/posters/poster12.jpg',
            'images/posters/poster13.jpg',
            'images/posters/poster14.jpg',
            'images/posters/poster15.jpg',
            'images/posters/poster16.jpg',
            'images/posters/poster17.jpg',
            'images/posters/poster18.jpg',
            'images/posters/poster19.jpg',
            'images/posters/poster20.jpg',
            'images/posters/poster21.jpg',
            'images/posters/poster22.jpg',
            'images/posters/poster23.jpg',
            'images/posters/poster24.jpg',
            'images/posters/poster25.jpg',
            'images/posters/poster26.jpg',
            'images/posters/poster27.jpg',
            'images/posters/poster28.jpg',
            'images/posters/poster29.jpg',
            'images/posters/poster30.jpg',
            'images/posters/poster31.jpg',
            'images/posters/poster32.jpg'
        ]
    },
    social: {
        title: 'Social Media',
        type: 'social',
        images: [
            'images/social/social1.jpg',
            'images/social/social2.jpg',
            'images/social/social3.jpg',
            'images/social/social4.jpg',
            'images/social/social5.jpg',
            'images/social/social6.jpg',
            'images/social/social7.jpg',
            'images/social/social8.jpg',
            'images/social/social9.jpg',
            'images/social/social10.jpg',
            'images/social/social11.jpg',
            'images/social/social12.jpg',
            'images/social/social13.jpg',
            'images/social/social14.jpg',
            'images/social/social15.jpg',
            'images/social/social16.jpg',
            'images/social/social17.jpg',
            'images/social/social18.jpg',
            'images/social/social19.jpg',
            'images/social/social20.jpg'
        ]
    }
};

function openGallery(category) {
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryTitle');
    const grid = document.getElementById('galleryGrid');
    
    const gallery = galleries[category];
    if (!gallery) return;
    
    title.textContent = gallery.title;
    grid.innerHTML = '';

    // Add class to grid for social layout
    grid.className = 'gallery-popup-grid';
    if (gallery.type === 'social') {
        grid.classList.add('gallery-popup-grid--masonry');
    }
    
    const allImages = gallery.images;
    
    gallery.images.forEach((imagePath, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-popup-item';
        if (gallery.type === 'social') {
            item.classList.add('social-item');
        }
        item.style.cursor = 'zoom-in';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `${gallery.title} ${index + 1}`;
        
        item.addEventListener('click', () => {
            openLightbox(imagePath, index, allImages);
        });
        
        item.appendChild(img);
        grid.appendChild(item);
    });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target === modal) {
        closeGallery();
    }
});

// ====== IMAGE ZOOM LIGHTBOX ======

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
    display: none;
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.97);
    justify-content: center;
    align-items: center;
    cursor: zoom-out;
`;

const lightboxImg = document.createElement('img');
lightboxImg.style.cssText = `
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
    transition: opacity 0.15s ease;
    cursor: zoom-out;
`;

const lightboxClose = document.createElement('span');
lightboxClose.textContent = '×';
lightboxClose.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 3rem;
    font-size: 3rem;
    font-weight: 300;
    color: #fff;
    cursor: pointer;
    z-index: 100000;
    transition: opacity 0.3s ease;
    line-height: 1;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const lightboxPrev = document.createElement('span');
lightboxPrev.textContent = '←';
lightboxPrev.style.cssText = `
    position: fixed;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2.5rem;
    font-weight: 300;
    color: #fff;
    cursor: pointer;
    z-index: 100000;
    transition: opacity 0.3s ease;
    user-select: none;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const lightboxNext = document.createElement('span');
lightboxNext.textContent = '→';
lightboxNext.style.cssText = `
    position: fixed;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2.5rem;
    font-weight: 300;
    color: #fff;
    cursor: pointer;
    z-index: 100000;
    transition: opacity 0.3s ease;
    user-select: none;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const lightboxCounter = document.createElement('span');
lightboxCounter.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.6);
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    letter-spacing: 1px;
`;

lightbox.appendChild(lightboxImg);
lightbox.appendChild(lightboxClose);
lightbox.appendChild(lightboxPrev);
lightbox.appendChild(lightboxNext);
lightbox.appendChild(lightboxCounter);
document.body.appendChild(lightbox);

let currentLightboxIndex = 0;
let currentLightboxImages = [];

function openLightbox(imgSrc, index, allImages) {
    currentLightboxIndex = index;
    currentLightboxImages = allImages;
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
    updateLightboxCounter();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function updateLightboxCounter() {
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;
}

function lightboxNavigate(direction) {
    currentLightboxIndex += direction;

    if (currentLightboxIndex < 0) currentLightboxIndex = currentLightboxImages.length - 1;
    if (currentLightboxIndex >= currentLightboxImages.length) currentLightboxIndex = 0;

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = currentLightboxImages[currentLightboxIndex];
        lightboxImg.style.opacity = '1';
    }, 150);

    updateLightboxCounter();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxClose.addEventListener('mouseover', () => lightboxClose.style.opacity = '0.5');
lightboxClose.addEventListener('mouseout', () => lightboxClose.style.opacity = '1');

lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); lightboxNavigate(-1); });
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); lightboxNavigate(1); });

lightboxPrev.addEventListener('mouseover', () => lightboxPrev.style.opacity = '0.5');
lightboxPrev.addEventListener('mouseout', () => lightboxPrev.style.opacity = '1');
lightboxNext.addEventListener('mouseover', () => lightboxNext.style.opacity = '0.5');
lightboxNext.addEventListener('mouseout', () => lightboxNext.style.opacity = '1');

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') lightboxNavigate(-1);
        if (e.key === 'ArrowRight') lightboxNavigate(1);
        if (e.key === 'Escape') closeLightbox();
    } else if (e.key === 'Escape') {
        closeGallery();
    }
});

// ====== INIT ======

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    fadeInOnScroll();
    heroReveal();
    magneticButtons();
    textReveal();
    smoothScroll();
    pageTransitions();
    scrollProgress();
    floatingElements();

    const hero = document.querySelector('.hero h1');
    const heroP = document.querySelector('.hero p');
    const heroBtn = document.querySelector('.hero .cta-button');
    
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        hero.style.transition = 'opacity 1s ease, transform 1s ease';
    }
    
    if (heroP) {
        heroP.style.opacity = '0';
        heroP.style.transform = 'translateY(30px)';
        heroP.style.transition = 'opacity 1s ease, transform 1s ease';
    }
    
    if (heroBtn) {
        heroBtn.style.opacity = '0';
        heroBtn.style.transform = 'translateY(30px)';
        heroBtn.style.transition = 'opacity 1s ease, transform 1s ease';
    }
});