const tutorialSteps = [
    {
        title: "Welcome to the Wiki",
        body: "Hey there! Looks like you're new here. Want a quick tour to get you started?",
        target: ".neon-title",
        action: (cursor, highlight, animate) => {
            highlight.style.opacity = '0';
        }
    },
    {
        title: "Navigation Bar",
        body: "This is the site header. It contains the navigation tabs you'll use to jump between different sections of the wiki.",
        target: ".neon-title",
        action: (cursor, highlight, animate, toggleButtons) => {
            animate(cursor, ".neon-title", false, () => toggleButtons(true));
        }
    },
    {
        title: "Search Bar",
        body: "Use the search bar to quickly find any weapon, vehicle, NPC, or item across the entire wiki.",
        target: "#search-input",
        action: (cursor, highlight, animate, toggleButtons) => {
            const isMobile = window.matchMedia("(max-width: 1024px)").matches;

            const typeSearch = () => {
                const input = document.querySelector('#search-input');
                if (input) {
                    input.focus();
                    let text = "f";
                    input.value = "";
                    let i = 0;
                    const type = () => {
                        if (i < text.length) {
                            input.value += text[i];
                            input.dispatchEvent(new Event('input', { bubbles: true }));
                            i++;
                            setTimeout(type, 150);
                        } else {
                            toggleButtons(true);
                        }
                    };
                    setTimeout(type, 500);
                } else {
                    toggleButtons(true);
                }
            };

            if (isMobile) {
                const nav = document.getElementById('top-tabs');
                if (!nav.classList.contains('active')) {
                    animate(cursor, "#hamburger", true, () => {
                        setTimeout(() => {
                            animate(cursor, "#search-input", true, () => {
                                typeSearch();
                            });
                        }, 400);
                    });
                } else {
                    animate(cursor, "#search-input", true, () => {
                        typeSearch();
                    });
                }
            } else {
                animate(cursor, "#search-input", true, () => {
                    typeSearch();
                });
            }
        }
    },
    {
        title: "Navigation Menus",
        body: "The dropdown menus group the wiki into three areas: Combat (weapons, vehicles), World (locations, missions), and Economy (ATMs, store, codes).",
        target: window.matchMedia("(max-width: 1024px)").matches ? ".dropdown-btn" : ".dropdown-btn",
        action: (cursor, highlight, animate, toggleButtons) => {
            const isMobile = window.matchMedia("(max-width: 1024px)").matches;
            if (isMobile) {
                const nav = document.getElementById('top-tabs');
                const runNav = () => {
                    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
                    const btn = dropdownBtns[0];
                    if (btn) {
                        animate(cursor, btn, true, () => {
                            setTimeout(() => toggleButtons(true), 800);
                        });
                    } else {
                        toggleButtons(true);
                    }
                };

                if (!nav.classList.contains('active')) {
                    animate(cursor, "#hamburger", true, () => {
                        setTimeout(runNav, 400);
                    });
                } else {
                    runNav();
                }
            } else {
                const dropdowns = document.querySelectorAll('.dropdown');
                const dropdown = dropdowns[0];

                animate(cursor, ".dropdown-btn", false, () => {
                    if (dropdown) dropdown.classList.add('open');
                    setTimeout(() => {
                        const tabs = dropdown.querySelectorAll(".dropdown-tab");
                        if (tabs.length > 0) {
                            animate(cursor, tabs[0], true, () => {
                                setTimeout(() => {
                                    if (dropdown) dropdown.classList.remove('open');
                                    toggleButtons(true);
                                }, 800);
                            });
                        } else {
                            toggleButtons(true);
                        }
                    }, 800);
                });
            }
        }
    },
    {
        title: "Info Cards",
        body: "Every item in the wiki has its own card. Click the 'More Info' button on any card to expand stats, prices, and other details.",
        target: "#page-container",
        action: (cursor, highlight, animate, toggleButtons) => {
            const isMobile = window.matchMedia("(max-width: 1024px)").matches;
            const nav = document.getElementById('top-tabs');

            const runCardStep = () => {
                const checkCards = setInterval(() => {
                    const cards = document.querySelectorAll('#page-container .card');
                    if (cards.length > 0) {
                        clearInterval(checkCards);
                        const card = cards[0];
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });

                        setTimeout(() => {
                            const rect = card.getBoundingClientRect();
                            cursor.style.left = `${rect.left + rect.width / 2}px`;
                            cursor.style.top = `${rect.top + rect.height / 2}px`;
                            cursor.classList.add('active');

                            setTimeout(() => {
                                card.style.transform = 'translateY(-8px) skew(-1deg) scale(1.02)';
                                card.style.borderColor = 'var(--fg)';
                                const btn = card.querySelector('.card-details-toggle');
                                if (btn) {
                                    setTimeout(() => {
                                        animate(cursor, btn, true, () => toggleButtons(true));
                                    }, 800);
                                } else {
                                    toggleButtons(true);
                                }
                            }, 800);
                        }, 600);
                    }
                }, 500);

                setTimeout(() => {
                    clearInterval(checkCards);
                    if (!toggleButtons.called) toggleButtons(true);
                }, 5000);
            };

            if (isMobile && nav.classList.contains('active')) {
                animate(cursor, "#hamburger", true, () => {
                    setTimeout(runCardStep, 400);
                });
            } else {
                runCardStep();
            }
        }
    },
    {
        title: "Settings",
        body: "Open Settings to adjust music volume, card size, switch to sidebar mode, or upload your own background music.",
        target: "#settings-toggle",
        action: (cursor, highlight, animate, toggleButtons) => {
            const isMobile = window.matchMedia("(max-width: 1024px)").matches;
            const nav = document.getElementById('top-tabs');

            if (isMobile && !nav.classList.contains('active')) {
                animate(cursor, "#hamburger", true, () => {
                    setTimeout(() => {
                        animate(cursor, "#settings-toggle", true, () => toggleButtons(true));
                    }, 400);
                });
            } else {
                animate(cursor, "#settings-toggle", true, () => toggleButtons(true));
            }
        }
    },
    {
        title: "Close Settings",
        body: "When you're done tweaking, close the panel with the X button and get back to exploring!",
        target: "#settings-close",
        action: (cursor, highlight, animate, toggleButtons) => {
            animate(cursor, "#settings-close", true, () => toggleButtons(true));
        }
    },
    {
        title: "All Done!",
        body: "You're all set! Head back to the Home page any time to find what you need. Happy exploring!",
        target: '.tab[data-page="home"]',
        action: (cursor, highlight, animate, toggleButtons) => {
            const isMobile = window.matchMedia("(max-width: 1024px)").matches;
            const nav = document.getElementById('top-tabs');

            if (isMobile && !nav.classList.contains('active')) {
                animate(cursor, "#hamburger", true, () => {
                    setTimeout(() => {
                        animate(cursor, '.tab[data-page="home"]', true, () => toggleButtons(true));
                    }, 400);
                });
            } else {
                animate(cursor, '.tab[data-page="home"]', true, () => toggleButtons(true));
            }
        }
    }
];

let currentStep = 0;

function initTutorial() {
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'tutorial-overlay';

    const highlight = document.createElement('div');
    highlight.className = 'tutorial-highlight';
    highlight.id = 'tutorial-highlight';

    const content = document.createElement('div');
    content.className = 'tutorial-content';
    content.id = 'tutorial-content';

    const cursor = document.createElement('div');
    cursor.className = 'virtual-cursor';
    cursor.id = 'virtual-cursor';

    document.body.appendChild(overlay);
    document.body.appendChild(highlight);
    document.body.appendChild(content);
    document.body.appendChild(cursor);

    const toggleButtons = (enabled) => {
        const next = document.getElementById('tutorial-next');
        const prev = document.getElementById('tutorial-prev');
        const skip = document.getElementById('tutorial-skip');
        const skipIntro = document.getElementById('tutorial-skip-intro');

        [next, prev, skip, skipIntro].forEach(btn => {
            if (btn) {
                btn.disabled = !enabled;
                btn.style.opacity = enabled ? '1' : '0.5';
                btn.style.pointerEvents = enabled ? 'all' : 'none';
            }
        });
    };

    const animateCursor = (cursorEl, targetSelector, click = false, callback = null) => {
        setTimeout(() => {
            const target = typeof targetSelector === 'string' ? document.querySelector(targetSelector) : targetSelector;
            if (!target) {
                if (callback) callback();
                return;
            }

            const rect = target.getBoundingClientRect();
            const offsetX = rect.width / 2;
            const offsetY = rect.height / 2;

            cursorEl.style.left = `${rect.left + offsetX}px`;
            cursorEl.style.top = `${rect.top + offsetY}px`;
            cursorEl.classList.add('active');

            setTimeout(() => {
                if (click) {
                    cursorEl.classList.add('clicking');

                    if (typeof target.click === 'function') {
                        const event = new MouseEvent('click', {
                            view: window,
                            bubbles: true,
                            cancelable: true
                        });
                        target.dispatchEvent(event);
                    }

                    const clickSfx = document.getElementById('sfx-click');
                    if (clickSfx) {
                        clickSfx.currentTime = 0;
                        clickSfx.volume = 0.5;
                        clickSfx.play().catch(e => { });
                    }

                    const pulse = document.createElement('div');
                    pulse.className = 'virtual-click-pulse';
                    pulse.style.left = cursorEl.style.left;
                    pulse.style.top = cursorEl.style.top;
                    document.body.appendChild(pulse);

                    setTimeout(() => {
                        cursorEl.classList.remove('clicking');
                        pulse.remove();
                    }, 400);
                }
                if (callback) callback();
            }, 900);
        }, 100);
    };

    const updateStep = () => {
        const step = tutorialSteps[currentStep];

        if (currentStep === 0) {
            overlay.classList.add('intro-mode');
        } else {
            overlay.classList.remove('intro-mode');
        }

        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        cursor.classList.remove('active');

        const progressPct = Math.round(((currentStep) / (tutorialSteps.length - 1)) * 100);

        content.innerHTML = `
            ${currentStep > 0 ? `<div class="tutorial-progress-track"><div class="tutorial-progress-fill" style="width:${progressPct}%"></div></div>` : ''}
            <div class="tutorial-step-indicator">${currentStep > 0 ? `STEP ${currentStep} OF ${tutorialSteps.length - 1}` : 'NEW USER DETECTED'}</div>
            <div class="tutorial-header">${step.title}</div>
            <div class="tutorial-body">${step.body}</div>
            <div class="tutorial-controls">
                ${currentStep > 0 ? '<button id="tutorial-prev" class="tutorial-btn btn-prev">← Back</button>' : ''}
                <button id="tutorial-next" class="tutorial-btn btn-primary">${currentStep === 0 ? 'Start Tour →' : (currentStep === tutorialSteps.length - 1 ? 'Finish ✓' : 'Next →')}</button>
            </div>
            ${currentStep === 0 ? '' : '<button id="tutorial-skip" class="tutorial-skip">Skip tour</button>'}
            ${currentStep === 0 ? '<button id="tutorial-skip-intro" class="tutorial-skip" style="text-align:center; margin-top:14px; font-size:10px; opacity:0.5;">No thanks, I already know my way around.</button>' : ''}
        `;

        document.getElementById('tutorial-next').onclick = () => {
            if (currentStep < tutorialSteps.length - 1) {
                currentStep++;
                updateStep();
            } else {
                completeTutorial();
            }
        };

        const skipIntro = document.getElementById('tutorial-skip-intro');
        if (skipIntro) skipIntro.onclick = completeTutorial;

        const prev = document.getElementById('tutorial-prev');
        if (prev) prev.onclick = () => {
            currentStep--;
            updateStep();
        };

        const skipBtn = document.getElementById('tutorial-skip');
        if (skipBtn) skipBtn.onclick = completeTutorial;

        updatePosition();

        content.style.opacity = '1';

        if (step.action && currentStep !== 0) {
            toggleButtons(false);
            setTimeout(() => {
                step.action(cursor, highlight, animateCursor, toggleButtons);
            }, 400);
        } else if (step.action) {
            step.action(cursor, highlight, animateCursor, toggleButtons);
        }
    };

    const updatePosition = () => {
        const step = tutorialSteps[currentStep];
        const targetEl = document.querySelector(step.target);

        if (currentStep === 0) {
            highlight.classList.remove('active');
            highlight.style.opacity = '0';
            content.style.top = '50%';
            content.style.left = '50%';
            content.style.right = 'auto';
            content.style.bottom = 'auto';
            content.style.transform = 'translate(-50%, -50%)';
            content.style.opacity = '1';
            return;
        }

        content.style.transform = 'none';
        content.style.top = 'auto';
        content.style.left = 'auto';
        content.style.right = '24px';
        content.style.bottom = '24px';
        content.style.opacity = '1';

        if (targetEl) {
            const rect = targetEl.getBoundingClientRect();

            highlight.style.top = `${rect.top - 4}px`;
            highlight.style.left = `${rect.left - 4}px`;
            highlight.style.width = `${rect.width + 8}px`;
            highlight.style.height = `${rect.height + 8}px`;
            highlight.classList.add('active');

            const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
            if (!isVisible) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            highlight.classList.remove('active');
        }
    };


    function completeTutorial() {
        window.removeEventListener('resize', updatePosition);
        overlay.classList.remove('active');
        highlight.style.opacity = '0';
        content.style.opacity = '0';
        cursor.classList.remove('active');

        const nav = document.getElementById('top-tabs');
        if (nav) nav.classList.remove('active');
        const hamburger = document.getElementById('hamburger');
        if (hamburger) hamburger.classList.remove('active');

        localStorage.setItem('tutorial_completed', 'true');

        setTimeout(() => {
            overlay.remove();
            highlight.remove();
            content.remove();
            cursor.remove();
        }, 500);
    }

    window.addEventListener('resize', updatePosition);

    setTimeout(() => {
        overlay.classList.add('active');
        updateStep();
    }, 200);
}

(function () {
    const isTutorialDone = localStorage.getItem('tutorial_completed');

    if (isTutorialDone === 'true') {
        return;
    }

    let tutorialStarted = false;

    const startTutorial = () => {
        if (tutorialStarted) return;
        tutorialStarted = true;

        const intro = document.getElementById('garage-intro');
        if (intro && getComputedStyle(intro).display !== 'none') {
            const checkIntroDone = setInterval(() => {
                if (intro.classList.contains('open')) {
                    clearInterval(checkIntroDone);
                    setTimeout(initTutorial, 300);
                }
            }, 200);
        } else {
            initTutorial();
        }
    };

    if (window.audioUnlocked) {
        startTutorial();
    } else {
        const fallback = setTimeout(startTutorial, 5000);
        const checkReady = setInterval(() => {
            if (window.audioUnlocked) {
                clearInterval(checkReady);
                clearTimeout(fallback);
                startTutorial();
            }
        }, 200);
    }
})();