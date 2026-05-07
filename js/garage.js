function initGarage(onOpen) {
    const garageIntro = document.getElementById("garage-intro");
    const loadSfx = document.getElementById("sfx-load");

    if (localStorage.getItem("skipGarageIntro") === "true") {
        if (garageIntro) garageIntro.remove();
        if (onOpen) onOpen(true);
        return;
    }

    const openSequence = () => {
        if (loadSfx && window.audioUnlocked) {
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
