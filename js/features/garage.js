function initGarage(onOpen) {
    const garageIntro = document.getElementById("garage-intro");
    const loadSfx = document.getElementById("sfx-load");
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const hash = window.location.hash.replace(/^#/, '');

    if (path === 'privacy' || hash === 'privacy') {
        if (onOpen) onOpen(true);
        return;
    }

    if (localStorage.getItem("skipGarageIntro") === "true") {
        if (garageIntro) garageIntro.remove();
        if (onOpen) onOpen(true);
        return;
    }

    const openSequence = () => {
        if (loadSfx) {
            loadSfx.volume = 0.5;
            loadSfx.play().catch(() => { });
        }

        if (garageIntro) garageIntro.classList.add("open");
        if (onOpen) onOpen(false);

        setTimeout(() => {
            if (garageIntro) garageIntro.remove();
        }, 1500);
    };

    setTimeout(openSequence, 500);
}
