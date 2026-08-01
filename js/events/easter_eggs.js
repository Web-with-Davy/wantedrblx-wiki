(function () {
    let typed = "";

    const style = document.createElement("style");
    style.id = "easter-egg-effects-css";
    style.textContent = `
        @keyframes fire-flicker {
            0% { filter: brightness(1) contrast(1.2) drop-shadow(0 0 20px #ff4500); transform: scale(1); }
            25% { filter: brightness(1.3) contrast(1.4) drop-shadow(0 0 40px #ff8c00); transform: scale(1.02) rotate(0.5deg); }
            50% { filter: brightness(0.9) contrast(1.5) drop-shadow(0 0 60px #ff4500); transform: scale(1) rotate(-0.5deg); }
            75% { filter: brightness(1.4) contrast(1.2) drop-shadow(0 0 35px #ff0000); transform: scale(1.03) rotate(0.3deg); }
            100% { filter: brightness(1) contrast(1.2) drop-shadow(0 0 20px #ff4500); transform: scale(1); }
        }
        .fire-effect {
            animation: fire-flicker 1s infinite;
            position: relative;
            z-index: 2;
        }
        .flames-gif-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyY294ajdvem5wem1lNWQyMDg3cHIxYmIxMGhyZmQzN3VzNXdobWR4ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/q4voi8znbYANE5GtYI/200.gif');
            background-size: cover;
            background-position: center;
            mix-blend-mode: screen;
            pointer-events: none;
            z-index: 5;
            opacity: 0.8;
        }
        .jumpscare-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: black;
            z-index: 9999999;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: all;
            overflow: hidden;
        }
        .jumpscare-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            user-select: none;
            -webkit-user-drag: none;
        }
    `;
    document.head.appendChild(style);

    const easterEggs = [
        {
            word: "skeelee",
            action: () => showOverlay("skeelee-overlay", "https://c.tenor.com/zGQLL-kwwEoAAAAd/tenor.gif", 5000, null)
        },
        {
            word: "name",
            action: () => {
                const audio = new Audio("sounds/michael-dont-leave-me-here.aac");
                audio.play().catch(() => { });
                showOverlay("name-jumpscare", "images/name.webp", 5000, "fire");
            }
        }
    ];

    document.addEventListener("keydown", function (e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key.length === 1) {
            typed += e.key.toLowerCase();
            typed = typed.slice(-20);

            for (const egg of easterEggs) {
                if (typed.endsWith(egg.word)) {
                    egg.action();
                    typed = "";
                    break;
                }
            }
        }
    });

    function showOverlay(id, src, duration, effectType) {
        if (document.getElementById(id)) return;

        const overlay = document.createElement("div");
        overlay.id = id;
        overlay.className = "jumpscare-overlay";

        if (!effectType) {
            overlay.style.opacity = "0";
            overlay.style.transition = "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        }

        const img = document.createElement("img");
        img.src = src;
        img.className = "jumpscare-img";

        if (effectType === "fire") {
            img.classList.add("fire-effect");

            const flamesOverlay = document.createElement("div");
            flamesOverlay.className = "flames-gif-overlay";
            overlay.appendChild(flamesOverlay);
        }

        overlay.appendChild(img);
        document.body.appendChild(overlay);

        if (!effectType) {
            overlay.offsetHeight;
            overlay.style.opacity = "1";
        }

        setTimeout(() => {
            overlay.style.opacity = "0";
            overlay.style.transition = "opacity 0.2s ease-in";
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.remove();
                }
            }, 200);
        }, duration);
    }
})();
