const YOUTUBER_ENABLED = true;

(function () {
    'use strict';

    if (!YOUTUBER_ENABLED) return;
    if (sessionStorage.getItem('youtuberEasterEggDone')) return;

    const REDIRECT_URL = 'https://www.youtube.com/watch?v=P28SlF7Lx1U';
    const HAIR_IMAGE = 'https://tr.rbxcdn.com/180DAY-224bb55411c9176a317711b4fd30b7ab/420/420/HairAccessory/Webp/noFilter';
    const DELAY_MS = 10000;

    const style = document.createElement('style');
    style.textContent = `
        #yt-hair {
            position: fixed;
            top: -150px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            z-index: 99999;
            cursor: pointer;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
            transition: top 0s;
        }
        #yt-hair.fall {
            transition: top 7s linear;
            top: 110vh;
        }
        #yt-hair.show {
            top: -150px;
        }
    `;
    document.head.appendChild(style);

    function initYoutuber() {
        if (!document.body) return;

        const link = document.createElement('a');
        link.href = REDIRECT_URL;
        link.target = '_blank';
        link.rel = 'noopener';
        link.style.cssText = 'position:fixed;top:-150px;left:50%;transform:translateX(-50%);z-index:99999;';
        link.id = 'yt-hair-link';

        const hair = document.createElement('img');
        hair.id = 'yt-hair';
        hair.src = HAIR_IMAGE;
        hair.title = 'Click me!';
        link.appendChild(hair);
        document.body.appendChild(link);

        let clicked = false;

        link.addEventListener('click', () => {
            clicked = true;
            sessionStorage.setItem('youtuberEasterEggDone', 'true');
            link.remove();
            style.remove();
        });

        setTimeout(() => {
            hair.getBoundingClientRect();
            hair.classList.add('fall');

            setTimeout(() => {
                if (!clicked) {
                    link.remove();
                    style.remove();
                    sessionStorage.setItem('youtuberEasterEggDone', 'true');
                }
            }, 3200);
        }, DELAY_MS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initYoutuber);
    } else {
        initYoutuber();
    }

})();