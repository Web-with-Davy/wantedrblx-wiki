function initSettingsPanel(clickSfx) {
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsPanel = document.getElementById('settings-panel');
    const settingsClose = document.getElementById('settings-close');
    const settingsBackdrop = document.querySelector('.settings-backdrop');

    if (!settingsToggle || !settingsPanel) return;

    const openSettings = () => {
        settingsPanel.classList.add('active');
    };

    const closeSettings = () => {
        settingsPanel.classList.remove('active');
    };

    settingsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        openSettings();
    });

    if (settingsClose) {
        settingsClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSettings();
        });
    }

    if (settingsBackdrop) {
        settingsBackdrop.addEventListener('click', () => {
            closeSettings();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsPanel.classList.contains('active')) {
            closeSettings();
        }
    });

    _initLanguageSelector();
}

function _initLanguageSelector() {
    const select = document.getElementById('language-select');
    if (!select || typeof i18n === 'undefined') return;

    const languages = i18n.getLanguages();
    select.innerHTML = languages.map(lang =>
        `<option value="${lang.code}">${lang.flag} ${lang.label}</option>`
    ).join('');
    select.value = i18n.getLang();
    select.addEventListener('change', () => {
        i18n.setLang(select.value);
    });
}