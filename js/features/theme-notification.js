(function () {
    'use strict';

    const THEME_NOTIFICATION_CONFIG = {
        notification: true,
        christmas: true,
        aero: false,
        classic: false
    };

    const THEMES = [
        { key: 'christmas', value: 'christmas', label: 'Christmas' },
        { key: 'aero', value: 'frutiger-aero', label: 'Frutiger Aero' },
        { key: 'classic', value: 'classic', label: 'Classic' }
    ];

    function getCurrentTheme() {
        if (document.body.classList.contains('christmas-theme')) return 'christmas';
        if (document.body.classList.contains('frutiger-aero')) return 'aero';
        return 'classic';
    }

    function showThemeTransition(theme) {
        const themeKey = theme === 'frutiger-aero' ? 'aero' : theme;
        const previousOverlay = document.getElementById('theme-transition');
        if (previousOverlay) previousOverlay.remove();

        const overlay = document.createElement('div');
        overlay.id = 'theme-transition';
        overlay.dataset.theme = themeKey;
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = `<span>${themeKey === 'christmas' ? 'Christmas Theme' : themeKey === 'aero' ? 'Frutiger Aero' : 'Classic Theme'}</span>`;
        document.body.appendChild(overlay);

        void overlay.offsetWidth;
        window.setTimeout(() => overlay.classList.add('shrinking'), 40);
        window.setTimeout(() => overlay.remove(), 1350);
    }

    function showThemeNotification() {
        if (!THEME_NOTIFICATION_CONFIG.notification || document.getElementById('theme-notification')) return;

        const currentTheme = getCurrentTheme();
        const theme = THEMES.find(item => THEME_NOTIFICATION_CONFIG[item.key] && item.key !== currentTheme);
        if (!theme) return;

        const button = document.createElement('button');
        button.id = 'theme-notification';
        button.type = 'button';
        button.dataset.theme = theme.key;
        button.textContent = `Try ${theme.label} theme`;
        button.setAttribute('aria-label', `Try the ${theme.label} theme`);

        button.addEventListener('click', () => {
            const themeSelect = document.getElementById('theme-select');
            if (!themeSelect) return;
            themeSelect.value = theme.value;
            themeSelect.dispatchEvent(new Event('change', { bubbles: true }));
            button.remove();
        });

        document.body.appendChild(button);
    }

    document.addEventListener('wantedThemeChanged', (event) => {
        if (event.detail && event.detail.theme && !event.detail.initial) {
            const settingsPanel = document.getElementById('settings-panel');
            if (settingsPanel) settingsPanel.classList.remove('active');
            showThemeTransition(event.detail.theme);
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showThemeNotification, { once: true });
    } else {
        showThemeNotification();
    }
})();