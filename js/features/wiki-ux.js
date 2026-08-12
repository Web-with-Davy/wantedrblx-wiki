function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const onScroll = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTop = 0;
    });
}

function initSearchShortcut() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    document.addEventListener('keydown', (e) => {
        const tag = document.activeElement && document.activeElement.tagName;
        if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.blur();
        }
    });

    searchInput.addEventListener('input', () => {
        searchInput.classList.toggle('has-value', searchInput.value.trim() !== '');
    });
}

function initMobileBottomNav() {
    const nav = document.getElementById('mobile-bottom-nav');
    if (!nav) return;

    const updateActiveItem = (page) => {
        nav.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === page);
        });
    };

    nav.addEventListener('click', (e) => {
        const item = e.target.closest('.mobile-nav-item[data-page]');
        if (!item) return;
        const page = item.dataset.page;
        if (!page) return;
        if (typeof window.loadPage === 'function') {
            window.loadPage(page);
        } else {
            window.location.hash = page === 'home' ? '' : page;
        }
    });

    document.addEventListener('wantedPageChanged', (e) => {
        if (e.detail && e.detail.page) updateActiveItem(e.detail.page);
    });

    const currentPage = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : 'home';
    updateActiveItem(currentPage || 'home');
}

function showCopyToast(message) {
    const toast = document.getElementById('copy-toast');
    if (!toast) return;
    toast.textContent = message || 'Copied!';
    toast.classList.add('visible');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('visible'), 2200);
}

window.showCopyToast = showCopyToast;

function copyPromoCode(code, btnEl) {
    const doFallback = () => {
        const ta = document.createElement('textarea');
        ta.value = code;
        ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try { document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(ta);
        showCopyToast('Copied: ' + code);
    };

    const onSuccess = () => {
        showCopyToast('Copied: ' + code);
        if (btnEl) {
            const original = btnEl.textContent;
            btnEl.textContent = '✓ Copied!';
            btnEl.classList.add('copied');
            clearTimeout(btnEl._resetTimer);
            btnEl._resetTimer = setTimeout(() => {
                btnEl.textContent = original;
                btnEl.classList.remove('copied');
            }, 2000);
        }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(onSuccess).catch(doFallback);
    } else {
        doFallback();
        onSuccess();
    }
}

window.copyPromoCode = copyPromoCode;

document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
    initSearchShortcut();
    initMobileBottomNav();
});
