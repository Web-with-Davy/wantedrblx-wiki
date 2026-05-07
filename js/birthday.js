const BIRTHDAY_ENABLED = false;

(function () {
    'use strict';

    if (!BIRTHDAY_ENABLED) return;
    if (sessionStorage.getItem('birthdaySurpriseDone')) return;

    function initBirthday() {
        if (!document.body) return;

        const CONFETTI_COLORS = [
            '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff',
            '#ff9ff3', '#feca57', '#54a0ff', '#ff6348',
            '#7bed9f', '#a29bfe', '#fd79a8', '#00cec9'
        ];

        const CAKE_DELAY_MS = 10000;

        const dimmer = document.createElement('div');
        dimmer.id = 'birthday-dimmer';
        document.body.appendChild(dimmer);

        const overlay = document.createElement('div');
        overlay.id = 'birthday-overlay';
        document.body.appendChild(overlay);

        const cake = document.createElement('div');
        cake.id = 'birthday-cake';
        cake.textContent = '🎂';
        cake.title = 'Click me!';
        document.body.appendChild(cake);

        const bdayText = document.createElement('div');
        bdayText.id = 'birthday-text';
        bdayText.textContent = 'Happy Birthday Username! 🎉';
        document.body.appendChild(bdayText);

        const shockwave = document.createElement('div');
        shockwave.id = 'birthday-shockwave';
        document.body.appendChild(shockwave);

        const birthdayAudio = new Audio('sounds/birthday.mp3');
        birthdayAudio.preload = 'auto';

        function spawnConfetti(count) {
            for (let i = 0; i < count; i++) {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                piece.style.left = Math.random() * 100 + 'vw';
                piece.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
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
            fw.className = 'firework';
            fw.style.left = x + 'px';
            fw.style.top = y + 'px';
            const particleCount = 12 + Math.floor(Math.random() * 8);
            const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];

            for (let i = 0; i < particleCount; i++) {
                const p = document.createElement('div');
                p.className = 'firework-particle';
                const angle = (360 / particleCount) * i;
                const dist = 40 + Math.random() * 60;
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
            }, 600);
        }

        function stopFireworks() {
            if (fireworkInterval) {
                clearInterval(fireworkInterval);
                fireworkInterval = null;
            }
        }

        function cleanupBirthday() {
            [cake, overlay, bdayText, dimmer].forEach(el => {
                el.classList.add('fade-out');
            });

            stopConfettiLoop();
            stopFireworks();

            setTimeout(() => {
                [cake, overlay, bdayText, dimmer, shockwave].forEach(el => {
                    if (el.parentNode) el.parentNode.removeChild(el);
                });
            }, 1600);

            sessionStorage.setItem('birthdaySurpriseDone', 'true');
        }

        function onCakeClick() {
            shockwave.classList.add('active');

            cake.classList.remove('idle');
            cake.classList.add('clicked');

            dimmer.classList.add('show');
            overlay.classList.add('active');

            startConfettiLoop();
            startFireworks();

            setTimeout(() => {
                bdayText.classList.add('show');
            }, 400);

            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            spawnFirework(cx, cy);
            setTimeout(() => spawnFirework(cx - 100, cy - 50), 200);
            setTimeout(() => spawnFirework(cx + 100, cy - 80), 400);

            birthdayAudio.volume = 0.7;
            birthdayAudio.play().catch(() => {
                document.addEventListener('click', function retry() {
                    birthdayAudio.play();
                    document.removeEventListener('click', retry);
                }, { once: true });
            });

            birthdayAudio.addEventListener('ended', function () {
                cleanupBirthday();
            });

            setTimeout(() => {
                if (!sessionStorage.getItem('birthdaySurpriseDone')) {
                    cleanupBirthday();
                }
            }, 60000);
        }

        let cakeClicked = false;

        cake.addEventListener('click', () => {
            cakeClicked = true;
            onCakeClick();
        });

        setTimeout(() => {
            cake.classList.add('show');

            setTimeout(() => {
                if (!cakeClicked) {
                    cake.classList.add('missed');
                    setTimeout(() => {
                        [cake, overlay, bdayText, dimmer, shockwave].forEach(el => {
                            if (el.parentNode) el.parentNode.removeChild(el);
                        });
                    }, 300);
                    sessionStorage.setItem('birthdaySurpriseDone', 'true');
                }
            }, 6200);
        }, CAKE_DELAY_MS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBirthday);
    } else {
        initBirthday();
    }

})();
