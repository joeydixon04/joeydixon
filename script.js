// ====== MOBILE MENU ======
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!menuToggle || !navLinks) return;

    const setMenuState = (isOpen) => {
        menuToggle.classList.toggle('active', isOpen);
        navLinks.classList.toggle('active', isOpen);
        document.body.classList.toggle('mobile-menu-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        navLinks.setAttribute('aria-hidden', String(!isOpen));
    };

    menuToggle.setAttribute('role', 'button');
    menuToggle.setAttribute('tabindex', '0');
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');

    menuToggle.addEventListener('click', () => {
        const isOpen = !navLinks.classList.contains('active');
        setMenuState(isOpen);
    });

    menuToggle.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        const isOpen = !navLinks.classList.contains('active');
        setMenuState(isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            setMenuState(false);
        });
    });

    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            setMenuState(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 700 && navLinks.classList.contains('active')) {
            setMenuState(false);
        }
    });
}

// ====== SCROLL PROGRESS BAR ======
function initProgressBar() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
    }, { passive: true });
}

// ====== PAGE TRANSITIONS ======
function pageTransitions() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.35s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 60);

    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http') && !link.getAttribute('target')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => { window.location.href = href; }, 340);
            });
        }
    });
}

// ====== IMAGE PROTECTION (DETERRENTS) ======
function initImageProtection() {
    const isEditableTarget = (target) => (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
    );

    const protectImage = (img) => {
        if (!(img instanceof HTMLImageElement)) return;
        img.setAttribute('draggable', 'false');
        img.setAttribute('data-protected-image', 'true');
        img.addEventListener('dragstart', (e) => e.preventDefault());
        img.addEventListener('contextmenu', (e) => e.preventDefault());
    };

    const protectWithin = (root) => {
        if (!root) return;
        if (root instanceof HTMLImageElement) {
            protectImage(root);
            return;
        }
        if (root.querySelectorAll) {
            root.querySelectorAll('img').forEach(protectImage);
        }
    };

    protectWithin(document);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) protectWithin(node);
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('contextmenu', (e) => {
        const target = e.target;
        if (target instanceof Element && target.closest('img, .gallery-thumb, .gallery-popup-item, #lightbox')) {
            e.preventDefault();
        }
    });

    document.addEventListener('dragstart', (e) => {
        const target = e.target;
        if (target instanceof Element && target.closest('img')) e.preventDefault();
    });

    document.addEventListener('keydown', (e) => {
        if (isEditableTarget(e.target)) return;
        const key = e.key.toLowerCase();
        const ctrlOrCmd = e.ctrlKey || e.metaKey;

        // Block common "save/view source/devtools" shortcuts.
        if (
            (ctrlOrCmd && key === 's') ||
            (ctrlOrCmd && key === 'u') ||
            (ctrlOrCmd && e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))
        ) {
            e.preventDefault();
        }
    });
}

// ====== GALLERY DATA ======
const galleries = {
    poster: {
        title: 'Poster Design',
        type: 'poster',
        images: [
            'images/posters/poster1.jpg','images/posters/poster2.jpg',
            'images/posters/poster3.jpg','images/posters/poster4.jpg',
            'images/posters/poster5.jpg','images/posters/poster6.jpg',
            'images/posters/poster7.jpg','images/posters/poster8.jpg',
            'images/posters/poster9.jpg','images/posters/poster10.jpg',
            'images/posters/poster11.jpg','images/posters/poster12.jpg',
			'images/posters/poster13.jpg','images/posters/poster14.jpg',
			'images/posters/poster15.jpg','images/posters/poster16.jpg',
			'images/posters/poster17.jpg','images/posters/poster18.jpg',
			'images/posters/poster19.jpg','images/posters/poster20.jpg',
			'images/posters/poster21.jpg','images/posters/poster22.jpg',
			'images/posters/poster23.jpg','images/posters/poster24.jpg',
			'images/posters/poster25.jpg','images/posters/poster26.jpg',
			'images/posters/poster27.jpg','images/posters/poster28.jpg',
			'images/posters/poster30.jpg','images/posters/poster31.jpg',
			'images/posters/poster32.jpg'
        ]
    },
    social: {
        title: 'Kansas City Pioneers',
        type: 'social',
        images: [
            'images/social/social1.jpg','images/social/social2.jpg',
            'images/social/social3.jpg','images/social/social4.jpg',
            'images/social/social5.jpg','images/social/social6.jpg',
            'images/social/social7.jpg','images/social/social8.jpg',
            'images/social/social9.jpg'
        ]
    }
};

function openGallery(category) {
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryTitle');
    const grid = document.getElementById('galleryGrid');
    const gallery = galleries[category];
    if (!gallery || !modal) return;

    title.textContent = gallery.title;
    grid.innerHTML = '';
    grid.className = 'gallery-popup-grid';
    if (gallery.type === 'social') grid.classList.add('gallery-popup-grid--masonry');

    gallery.images.forEach((src, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-popup-item';
        item.style.cursor = 'zoom-in';
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${gallery.title} ${i + 1}`;
        item.addEventListener('click', () => openLightbox(src, i, gallery.images));
        item.appendChild(img);
        grid.appendChild(item);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('galleryModal');
    if (e.target === modal) closeGallery();
});

// ====== LIGHTBOX ======
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = 'display:none;position:fixed;z-index:99999;top:0;left:0;width:100%;height:100%;background:rgba(13,13,13,0.97);justify-content:center;align-items:center;cursor:zoom-out;';

const lightboxImg = document.createElement('img');
lightboxImg.style.cssText = 'max-width:90%;max-height:90vh;object-fit:contain;transition:opacity 0.14s;';

const makeEl = (tag, text, css) => {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    el.style.cssText = css;
    return el;
};

const F = "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;cursor:pointer;transition:opacity 0.18s;user-select:none;color:#f2f1ec;position:fixed;z-index:100000;";
const lightboxClose   = makeEl('span', 'x', F + 'top:clamp(1rem,4vw,2rem);right:clamp(1rem,4vw,3rem);font-size:clamp(1.9rem,6vw,2.5rem);font-weight:300;line-height:1;');
const lightboxPrev    = makeEl('span', '<', F + 'left:clamp(0.75rem,4vw,2rem);top:50%;transform:translateY(-50%);font-size:clamp(1.5rem,5.6vw,2rem);font-weight:300;');
const lightboxNext    = makeEl('span', '>', F + 'right:clamp(0.75rem,4vw,2rem);top:50%;transform:translateY(-50%);font-size:clamp(1.5rem,5.6vw,2rem);font-weight:300;');
const lightboxCounter = makeEl('span', '', "position:fixed;bottom:clamp(1rem,4vw,2rem);left:50%;transform:translateX(-50%);font-size:clamp(0.55rem,2.8vw,0.65rem);letter-spacing:0.15em;color:rgba(242,241,236,0.4);font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;");

[lightboxImg, lightboxClose, lightboxPrev, lightboxNext, lightboxCounter].forEach(el => lightbox.appendChild(el));
document.body.appendChild(lightbox);

let lbIndex = 0, lbImages = [];

function openLightbox(src, i, images) {
    lbIndex = i; lbImages = images;
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    lightboxCounter.textContent = `${i + 1} / ${images.length}`;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() { lightbox.style.display = 'none'; document.body.style.overflow = ''; }

function navigate(dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = lbImages[lbIndex];
        lightboxImg.style.opacity = '1';
        lightboxCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
    }, 140);
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

[lightboxClose, lightboxPrev, lightboxNext].forEach(el => {
    el.addEventListener('mouseover', () => el.style.opacity = '0.38');
    el.addEventListener('mouseout',  () => el.style.opacity = '1');
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft')  navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'Escape')     closeLightbox();
    } else if (e.key === 'Escape') closeGallery();
});

// ====== INIT ======
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initProgressBar();
    pageTransitions();
    initImageProtection();
});

