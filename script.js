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
        if (target instanceof Element && target.closest('img')) {
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

// ====== INIT ======
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initProgressBar();
    pageTransitions();
    initImageProtection();
});

