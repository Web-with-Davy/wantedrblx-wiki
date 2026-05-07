const i18n = (() => {
    const STORAGE_KEY = 'wikiLanguage';
    const DEFAULT_LANG = 'en';

    let _currentLang = DEFAULT_LANG;

    function _detect() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && TRANSLATIONS[stored]) return stored;
        const browserLangs = navigator.languages || [navigator.language || 'en'];
        for (const bLang of browserLangs) {
            const code = bLang.split('-')[0].toLowerCase();
            if (TRANSLATIONS[code]) return code;
        }
        return DEFAULT_LANG;
    }

    function _save(code) {
        localStorage.setItem(STORAGE_KEY, code);
    }

    function translate(key) {
        const langStrings = TRANSLATIONS[_currentLang] || {};
        const enStrings   = TRANSLATIONS[DEFAULT_LANG]  || {};
        return langStrings[key] ?? enStrings[key] ?? key;
    }

    function setLang(code) {
        if (!TRANSLATIONS[code]) {
            console.warn(`[i18n] Unknown language: "${code}"`);
            return;
        }
        _currentLang = code;
        _save(code);
        document.documentElement.lang = code;

        const select = document.getElementById('language-select');
        if (select) select.value = code;

        _applyStaticTranslations();

        if (typeof loadPage === 'function' && typeof getCurrentPage === 'function') {
            loadPage(getCurrentPage(), false);
        }
    }

    function _applyStaticTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.innerHTML = translate(el.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = translate(el.getAttribute('data-i18n-placeholder'));
        });
    }

    function getLang()      { return _currentLang; }
    function getLanguages() { return typeof SUPPORTED_LANGUAGES !== 'undefined' ? SUPPORTED_LANGUAGES : []; }

    function init() {
        _currentLang = _detect();
        document.documentElement.lang = _currentLang;
        _applyStaticTranslations();
    }

    return { translate, setLang, getLang, getLanguages, init };
})();

function t(key) { return i18n.translate(key); }
