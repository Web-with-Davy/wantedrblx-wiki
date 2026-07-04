const FOURTH_OF_JULY_ENABLED = true;

(function () {
    'use strict';

    if (!FOURTH_OF_JULY_ENABLED) return;
    if (sessionStorage.getItem('fourthOfJulySurpriseDone')) return;

    const now = new Date();
    if (now.getMonth() !== 6 || now.getDate() !== 4) return;

    function initFourthOfJuly() {
        if (!document.body) return;

        const PATRIOTIC_COLORS = [
            '#b22234', '#ffffff', '#3c3b6e',
            '#ff4444', '#aaaaff', '#ff6666',
            '#ccccff', '#ff0000', '#0000ff'
        ];

        const FLAG_DELAY_MS = 5000;

        const dimmer = document.createElement('div');
        dimmer.id = 'july-dimmer';
        document.body.appendChild(dimmer);

        const overlay = document.createElement('div');
        overlay.id = 'july-overlay';
        document.body.appendChild(overlay);

        const flag = document.createElement('div');
        flag.id = 'july-flag';
        flag.textContent = '🎆';
        flag.title = 'Click me!';
        document.body.appendChild(flag);

        const julyText = document.createElement('div');
        julyText.id = 'july-text';
        julyText.textContent = 'Happy 4th of July! 🎆';
        document.body.appendChild(julyText);

        const shockwave = document.createElement('div');
        shockwave.id = 'july-shockwave';
        document.body.appendChild(shockwave);

        function spawnConfetti(count) {
            for (let i = 0; i < count; i++) {
                const piece = document.createElement('div');
                piece.className = 'july-confetti-piece';
                piece.style.left = Math.random() * 100 + 'vw';
                piece.style.backgroundColor = PATRIOTIC_COLORS[Math.floor(Math.random() * PATRIOTIC_COLORS.length)];
                piece.style.setProperty('--fall-duration', (2 + Math.random() * 3) + 's');
                piece.style.setProperty('--fall-delay', (Math.random() * 2) + 's');
                piece.style.setProperty('--sway', (20 + Math.random() * 40) * (Math.random() > 0.5 ? 1 : -1) + 'px');
                piece.style.width = (6 + Math.random() * 10) + 'px';
                piece.style.height = (10 + Math.random() * 15) + 'px';
                piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                piece.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
                overlay.appendChild(piece);
            }
        }

        function spawnFirework(x, y) {
            const fw = document.createElement('div');
            fw.className = 'july-firework';
            fw.style.left = x + 'px';
            fw.style.top = y + 'px';
            const particleCount = 14 + Math.floor(Math.random() * 10);
            const color = PATRIOTIC_COLORS[Math.floor(Math.random() * PATRIOTIC_COLORS.length)];

            for (let i = 0; i < particleCount; i++) {
                const p = document.createElement('div');
                p.className = 'july-firework-particle';
                const angle = (360 / particleCount) * i;
                const dist = 50 + Math.random() * 80;
                const fx = Math.cos(angle * Math.PI / 180) * dist;
                const fy = Math.sin(angle * Math.PI / 180) * dist;
                p.style.setProperty('--fx', fx + 'px');
                p.style.setProperty('--fy', fy + 'px');
                p.style.backgroundColor = color;
                fw.appendChild(p);
            }
            overlay.appendChild(fw);
            setTimeout(() => fw.remove(), 1500);
        }

        let confettiInterval = null;
        function startConfettiLoop() {
            spawnConfetti(80);
            confettiInterval = setInterval(() => {
                spawnConfetti(30);
            }, 2500);
        }

        function stopConfettiLoop() {
            if (confettiInterval) {
                clearInterval(confettiInterval);
                confettiInterval = null;
            }
        }

        let fireworkInterval = null;
        function startFireworks() {
            fireworkInterval = setInterval(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * (window.innerHeight * 0.6);
                spawnFirework(x, y);
            }, 500);
        }

        function stopFireworks() {
            if (fireworkInterval) {
                clearInterval(fireworkInterval);
                fireworkInterval = null;
            }
        }

        function cleanupFourthOfJuly() {
            stopConfettiLoop();
            stopFireworks();

            while (overlay.firstChild) overlay.removeChild(overlay.firstChild);

            [flag, overlay, julyText, dimmer].forEach(el => {
                el.classList.add('july-fade-out');
            });

            setTimeout(() => {
                [flag, overlay, julyText, dimmer, shockwave].forEach(el => {
                    if (el.parentNode) el.parentNode.removeChild(el);
                });
            }, 1600);

            sessionStorage.setItem('fourthOfJulySurpriseDone', 'true');
        }

        function onFlagClick() {
            shockwave.classList.add('active');

            flag.classList.remove('idle');
            flag.classList.add('clicked');

            dimmer.classList.add('show');
            overlay.classList.add('active');

            startConfettiLoop();
            startFireworks();

            setTimeout(() => {
                julyText.classList.add('show');
            }, 400);

            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            spawnFirework(cx, cy);
            setTimeout(() => spawnFirework(cx - 120, cy - 60), 200);
            setTimeout(() => spawnFirework(cx + 120, cy - 90), 400);
            setTimeout(() => spawnFirework(cx - 60, cy - 120), 600);
            setTimeout(() => spawnFirework(cx + 60, cy - 150), 800);

            setTimeout(() => {
                if (!sessionStorage.getItem('fourthOfJulySurpriseDone')) {
                    cleanupFourthOfJuly();
                }
            }, 12000);
        }

        let flagClicked = false;

        flag.addEventListener('click', () => {
            flagClicked = true;
            onFlagClick();
        });

        overlay.addEventListener('click', () => {
            if (flagClicked) cleanupFourthOfJuly();
        });

        setTimeout(() => {
            flag.classList.add('show');

            setTimeout(() => {
                if (!flagClicked) {
                    flag.classList.add('missed');
                    setTimeout(() => {
                        [flag, overlay, julyText, dimmer, shockwave].forEach(el => {
                            if (el.parentNode) el.parentNode.removeChild(el);
                        });
                    }, 300);
                    sessionStorage.setItem('fourthOfJulySurpriseDone', 'true');
                }
            }, 6200);
        }, FLAG_DELAY_MS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFourthOfJuly);
    } else {
        initFourthOfJuly();
    }

})();
