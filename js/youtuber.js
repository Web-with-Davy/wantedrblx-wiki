const YOUTUBER_ENABLED = true;

(function () {
    'use strict';

    if (!YOUTUBER_ENABLED) return;

    const REDIRECT_URL = 'https://www.youtube.com/watch?v=FmIVQRCGbD0';
    const HAIR_IMAGE = 'https://tr.rbxcdn.com/180DAY-224bb55411c9176a317711b4fd30b7ab/420/420/HairAccessory/Webp/noFilter';
    const DELAY_MS = 10000;
    const FALL_MS = 7000;

    const style = document.createElement('style');
    style.textContent = `
        #yt-hair-link {
            position: fixed;
            top: -150px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 99999;
            display: block;
            transition: top 0s;
        }
        #yt-hair-link.fall {
            transition: top ${FALL_MS}ms linear;
            top: 110vh;
        }
        #yt-hair-link img {
            width: 80px;
            cursor: pointer;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
            display: block;
        }
    `;
    document.head.appendChild(style);

    function spawnHair() {
        const link = document.createElement('a');
        link.href = REDIRECT_URL;
        link.target = '_blank';
        link.rel = 'noopener';
        link.id = 'yt-hair-link';

        const img = document.createElement('img');
        img.src = HAIR_IMAGE;
        img.title = 'Click me!';
        link.appendChild(img);
        document.body.appendChild(link);

        link.getBoundingClientRect();
        link.classList.add('fall');

        setTimeout(() => {
            link.remove();
            setTimeout(spawnHair, DELAY_MS);
        }, FALL_MS + 200);
    }

    function init() {
        if (!document.body) return;
        setTimeout(spawnHair, DELAY_MS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
