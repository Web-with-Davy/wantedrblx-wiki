function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('top-tabs');
    const tabs = document.querySelectorAll('.tab');

    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('dropdown-btn')) return;
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

function initHeaderResize() {
    const header = document.querySelector('.fixed-header');
    const resizeHandle = document.querySelector('.header-resize-handle');
    const pageWrapper = document.querySelector('.page-wrapper');

    if (!header || !resizeHandle || !pageWrapper) return;

    const BASE_HEIGHT = 180;
    const BASE_WIDTH = 250;
    const MIN_WIDTH = 150;
    const MAX_WIDTH = 600;

    const isSidebarMode = () => document.body.classList.contains('left-sidebar-mode');

    const updateScale = (height) => {
        const scale = Math.max(0.5, Math.min(1, height / BASE_HEIGHT));
        document.documentElement.style.setProperty('--header-scale', scale);
    };

    const updateSidebarScale = (width) => {
        const scale = Math.max(0.4, Math.min(1.2, width / BASE_WIDTH));
        document.documentElement.style.setProperty('--sidebar-scale', scale);
    };

    const updatePagePadding = (size, isSidebar) => {
        if (isSidebar) {
            pageWrapper.style.paddingLeft = (size + 30) + 'px';
            pageWrapper.style.paddingTop = '';
        } else {
            pageWrapper.style.paddingTop = (size + 30) + 'px';
            pageWrapper.style.paddingLeft = '';
        }
    };

    const savedHeight = localStorage.getItem('headerHeight');
    const savedWidth = localStorage.getItem('headerWidth');

    if (isSidebarMode()) {
        const width = parseInt(savedWidth) || BASE_WIDTH;
        header.style.width = width + 'px';
        header.style.height = '';
        updatePagePadding(width, true);
        updateSidebarScale(width);
    } else if (window.innerWidth > 1024) {
        const height = parseInt(savedHeight) || BASE_HEIGHT;
        header.style.height = height + 'px';
        header.style.width = '';
        updatePagePadding(height, false);
        updateScale(height);
    } else {
        header.style.height = '';
        header.style.width = '';
        pageWrapper.style.paddingTop = '';
        pageWrapper.style.paddingLeft = '';
        updateScale(1);
    }

    let isResizing = false;
    let startX = 0, startY = 0;
    let startWidth = 0, startHeight = 0;

    resizeHandle.addEventListener('mousedown', (e) => {
        if (window.innerWidth <= 1024) return;
        isResizing = true;
        if (isSidebarMode()) {
            startX = e.clientX;
            startWidth = header.offsetWidth;
            document.body.style.cursor = 'ew-resize';
        } else {
            startY = e.clientY;
            startHeight = header.offsetHeight;
            document.body.style.cursor = 'ns-resize';
        }
        document.body.style.userSelect = 'none';
        e.preventDefault();
    });

    let animationFrameId = null;
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        if (animationFrameId) return;

        animationFrameId = requestAnimationFrame(() => {
            if (isSidebarMode()) {
                const deltaX = e.clientX - startX;
                const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidth + deltaX));
                header.style.width = newWidth + 'px';
                updatePagePadding(newWidth, true);
                updateSidebarScale(newWidth);
            } else {
                const deltaY = e.clientY - startY;
                const newHeight = Math.max(100, Math.min(600, startHeight + deltaY));
                header.style.height = newHeight + 'px';
                updatePagePadding(newHeight, false);
                updateScale(newHeight);
            }
            animationFrameId = null;
        });
    });

    document.addEventListener('mouseup', () => {
        if (!isResizing) return;
        isResizing = false;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        if (isSidebarMode()) {
            localStorage.setItem('headerWidth', header.offsetWidth);
        } else {
            localStorage.setItem('headerHeight', header.offsetHeight);
        }
    });
}

function initSidebarToggle(clickSfx) {
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebarStatus = document.getElementById("sidebar-status");

    if (sidebarToggle && sidebarStatus && document.body.classList.contains("left-sidebar-mode")) {
        sidebarToggle.classList.add("active");
        sidebarStatus.textContent = typeof t === 'function' ? t('toggle_on') : 'ON';
    }

    if (sidebarToggle && sidebarStatus) {
        sidebarToggle.addEventListener("click", () => {
            const isSidebar = document.body.classList.toggle("left-sidebar-mode");
            sidebarToggle.classList.toggle("active", isSidebar);
            sidebarStatus.textContent = isSidebar
                ? (typeof t === 'function' ? t('toggle_on') : 'ON')
                : (typeof t === 'function' ? t('toggle_off') : 'OFF');
            localStorage.setItem("sidebarMode", isSidebar);

            const header = document.querySelector('.fixed-header');
            const pageWrapper = document.querySelector('.page-wrapper');

            if (header && pageWrapper) {
                if (isSidebar) {
                    header.style.height = '';
                    pageWrapper.style.paddingTop = '';
                    const savedWidth = localStorage.getItem('headerWidth');
                    if (savedWidth) {
                        header.style.width = savedWidth + 'px';
                        pageWrapper.style.paddingLeft = (parseInt(savedWidth) + 30) + 'px';
                    }
                } else {
                    header.style.width = '';
                    pageWrapper.style.paddingLeft = '';
                    const savedHeight = localStorage.getItem('headerHeight');
                    if (savedHeight) {
                        header.style.height = savedHeight + 'px';
                        pageWrapper.style.paddingTop = (parseInt(savedHeight) + 30) + 'px';
                    }
                }
            }
        });
    }
}

function initCountdownTimer() {
    const countdownDisplay = document.getElementById('countdown-display');
    if (!countdownDisplay) return;

    const targetDate = window.COUNTDOWN_TARGET || new Date('2026-03-06T17:00:00Z');

    function updateCountdown() {
        const now = new Date();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            countdownDisplay.innerHTML = '<div class="countdown-time countdown-finished">UPDATE NOW!</div>';
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        countdownDisplay.innerHTML = `
            <div class="countdown-units">
                <div class="countdown-unit">
                    <div class="countdown-number">${days.toString().padStart(2, '0')}</div>
                    <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-unit">
                    <div class="countdown-number">${hours.toString().padStart(2, '0')}</div>
                    <div class="countdown-label">Hours</div>
                </div>
                <div class="countdown-unit">
                    <div class="countdown-number">${minutes.toString().padStart(2, '0')}</div>
                    <div class="countdown-label">Mins</div>
                </div>
                <div class="countdown-unit">
                    <div class="countdown-number">${seconds.toString().padStart(2, '0')}</div>
                    <div class="countdown-label">Secs</div>
                </div>
            </div>
        `;

        setTimeout(updateCountdown, 1000);
    }

    updateCountdown();
}