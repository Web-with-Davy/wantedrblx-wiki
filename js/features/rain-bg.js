(function () {
    'use strict';

    const canvas = document.createElement('canvas');
    canvas.id = 'rain-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;display:block;';
    document.body.insertBefore(canvas, document.body.firstChild);
    let ctx = canvas.getContext('2d');
    let W = 0, H = 0;

    const tau = Math.PI * 2;

    const baseCanvas = document.createElement('canvas');
    const baseCtx = baseCanvas.getContext('2d');
    const mirrorCanvas = document.createElement('canvas');
    const mirrorCtx = mirrorCanvas.getContext('2d');
    const overlayCanvas = document.createElement('canvas');
    const overlayCtx = overlayCanvas.getContext('2d');

    function makeGlow(r, g, b) {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const g2 = c.getContext('2d');
        const grd = g2.createRadialGradient(32, 32, 0, 32, 32, 32);
        grd.addColorStop(0, `rgba(${r},${g},${b},1)`);
        grd.addColorStop(0.3, `rgba(${r},${g},${b},0.5)`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        g2.fillStyle = grd;
        g2.fillRect(0, 0, 64, 64);
        return c;
    }

    const glows = {
        warm: makeGlow(255, 150, 60),
        ember: makeGlow(255, 120, 40),
        gold: makeGlow(255, 205, 110),
        moon: makeGlow(190, 215, 255)
    };

    let farBuildings = [], nearBuildings = [];
    let cabin = null;
    const live = { flakes: [], embers: [] };

    function rng(n) { const x = Math.sin(42 + n) * 43758.5453; return x - Math.floor(x); }

    function currentTheme() {
        if (document.body.classList.contains('christmas-theme')) return 'christmas';
        if (document.body.classList.contains('frutiger-aero')) return 'aero';
        return 'classic';
    }

    function makeBuildings(count, segW, baseY, hMin, hMax, idx0) {
        const out = [];
        for (let i = 0; i < count; i++) {
            const s = idx0 + i;
            const bw = segW * (0.55 + rng(s * 3) * 0.80);
            const bh = H * (hMin + rng(s * 3 + 1) * (hMax - hMin));
            const bx = i * segW + (segW - bw) * 0.4 * rng(s * 3 + 2);
            const by = baseY - bh;
            const style = Math.floor(rng(s * 7) * 5);
            const wins = [];
            const cols = Math.max(1, Math.floor(bw / 12));
            const rows = Math.max(1, Math.floor(bh / 15));
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (rng(s * 100 + r * 11 + c) > 0.50) {
                        wins.push({
                            x: bx + 4 + c * 12,
                            y: by + 5 + r * 15,
                            flicker: rng(s * 33 + r + c) > 0.93,
                        });
                    }
                }
            }
            out.push({ bx, by, bw, bh, style, wins });
        }
        return out;
    }

    function buildCity() {
        farBuildings = makeBuildings(40, W / 40, H * 0.60, 0.08, 0.22, 0);
        nearBuildings = makeBuildings(26, W / 26, H * 0.65, 0.14, 0.36, 200);
    }

    function drawRooftop(b) {
        const aeroTheme = currentTheme() === 'aero';
        const cx = b.bx + b.bw * 0.5;
        const roofY = b.by;
        switch (b.style) {
            case 1: {
                const t1h = Math.max(4, b.bh * 0.06);
                const t2h = Math.max(3, b.bh * 0.05);
                ctx.fillStyle = aeroTheme ? '#237b9b' : '#0e0e0e';
                ctx.fillRect(b.bx + b.bw * 0.12, roofY - t1h, b.bw * 0.76, t1h);
                ctx.fillStyle = aeroTheme ? '#d8fbff' : '#0a0a0a';
                ctx.fillRect(b.bx + b.bw * 0.28, roofY - t1h - t2h, b.bw * 0.44, t2h);
                break;
            }
            case 2: {
                const mastH = Math.min(H * 0.06, b.bw * 0.8);
                ctx.strokeStyle = aeroTheme ? 'rgba(236,255,255,0.8)' : 'rgba(200,200,200,0.50)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(cx, roofY);
                ctx.lineTo(cx, roofY - mastH);
                ctx.stroke();
                ctx.lineWidth = 1;
                ctx.strokeStyle = aeroTheme ? 'rgba(35,132,170,0.6)' : 'rgba(180,180,180,0.30)';
                [0.35, 0.60, 0.85].forEach(f => {
                    const ay = roofY - mastH * f, hw = 5 + (1 - f) * 5;
                    ctx.beginPath();
                    ctx.moveTo(cx - hw, ay);
                    ctx.lineTo(cx + hw, ay);
                    ctx.stroke();
                });
                break;
            }
            case 3: {
                const twR = Math.max(5, b.bw * 0.11), twH = twR * 1.4;
                const ty = roofY - Math.max(4, twH * 0.55) - twH;
                ctx.fillStyle = aeroTheme ? '#287f9d' : '#111';
                ctx.fillRect(cx - twR, ty, twR * 2, twH);
                ctx.beginPath();
                ctx.ellipse(cx, ty, twR, twR * 0.3, 0, Math.PI, 0);
                ctx.fillStyle = aeroTheme ? '#b9f3fa' : '#1a1a1a';
                ctx.fill();
                ctx.strokeStyle = aeroTheme ? 'rgba(238,255,255,0.72)' : 'rgba(160,160,160,0.28)';
                ctx.lineWidth = 1;
                [-1, 0, 1].forEach(p => {
                    ctx.beginPath();
                    ctx.moveTo(cx + p * twR * 0.7, ty + twH);
                    ctx.lineTo(cx + p * twR * 1.1, roofY);
                    ctx.stroke();
                });
                break;
            }
            case 4: {
                const bw2 = Math.min(b.bw * 0.55, 60), bh2 = bw2 * 0.38;
                const bx2 = cx - bw2 * 0.5, by2 = roofY - Math.max(6, b.bw * 0.06) - bh2;
                ctx.strokeStyle = aeroTheme ? 'rgba(232,255,255,0.78)' : 'rgba(160,160,160,0.38)';
                ctx.lineWidth = 1.5;
                [0.25, 0.75].forEach(f => {
                    ctx.beginPath();
                    ctx.moveTo(bx2 + bw2 * f, roofY);
                    ctx.lineTo(bx2 + bw2 * f, by2 + bh2);
                    ctx.stroke();
                });
                ctx.fillStyle = aeroTheme ? '#2882a0' : '#0d0d0d';
                ctx.fillRect(bx2, by2, bw2, bh2);
                ctx.strokeStyle = aeroTheme ? 'rgba(238,255,255,0.72)' : 'rgba(200,200,200,0.18)';
                ctx.lineWidth = 1;
                ctx.strokeRect(bx2, by2, bw2, bh2);
                break;
            }
        }
    }

    function drawBuildingLayer(list, alpha, brightness, includeFlicker = true) {
        const now = Date.now();
        const aeroTheme = currentTheme() === 'aero';
        const bodyColor = aeroTheme
            ? `rgba(${Math.round(30 * brightness)},${Math.round(119 * brightness)},${Math.round(151 * brightness)},0.78)`
            : brightness < 1
                ? `rgb(${Math.round(10 * brightness)},${Math.round(10 * brightness)},${Math.round(10 * brightness)})`
                : '#111';
        const rimVal = aeroTheme ? 220 : Math.round(42 * brightness);
        ctx.globalAlpha = alpha;
        list.forEach(b => {
            ctx.fillStyle = bodyColor;
            ctx.fillRect(b.bx, b.by, b.bw, b.bh + (aeroTheme ? 0 : H * 0.5));
            ctx.fillStyle = aeroTheme
                ? `rgba(238,255,255,${0.42 * alpha})`
                : `rgba(${rimVal},${rimVal},${rimVal},0.5)`;
            ctx.fillRect(b.bx, b.by, b.bw, 1);
            drawRooftop(b);
            b.wins.forEach(w => {
                if (w.flicker && (!includeFlicker || Math.sin(now * 0.0001 + w.x) <= 0)) return;
                ctx.fillStyle = aeroTheme
                    ? `rgba(220,255,255,${(0.55 + rng(w.x * 0.1) * 0.35) * alpha})`
                    : `rgba(215,215,215,${(0.38 + rng(w.x * 0.1) * 0.30) * alpha})`;
                ctx.fillRect(w.x, w.y, 5, 8);
            });
        });
        ctx.globalAlpha = 1;
    }

    function drawAeroCity(includeFlicker = true) {
        const sky = ctx.createLinearGradient(0, 0, 0, H * 0.72);
        sky.addColorStop(0, '#0786df');
        sky.addColorStop(0.48, '#32b9ec');
        sky.addColorStop(0.82, '#b6f3ff');
        sky.addColorStop(1, '#f0ffff');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);

        const sunX = W * 0.8;
        const sunY = H * 0.14;
        const sunRadius = H * 0.11;
        const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
        sunGlow.addColorStop(0, 'rgba(255,255,235,0.98)');
        sunGlow.addColorStop(0.22, 'rgba(255,255,226,0.72)');
        sunGlow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = sunGlow;
        ctx.fillRect(sunX - sunRadius, sunY - sunRadius, sunRadius * 2, sunRadius * 2);

        const drawCloud = (centerX, centerY, scale) => {
            const cloud = ctx.createRadialGradient(centerX, centerY, scale * 0.08, centerX, centerY, scale);
            cloud.addColorStop(0, 'rgba(255,255,255,0.82)');
            cloud.addColorStop(0.72, 'rgba(255,255,255,0.56)');
            cloud.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = cloud;
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, scale, scale * 0.34, 0, 0, tau);
            ctx.ellipse(centerX - scale * 0.35, centerY - scale * 0.16, scale * 0.52, scale * 0.34, 0, 0, tau);
            ctx.ellipse(centerX + scale * 0.28, centerY - scale * 0.21, scale * 0.58, scale * 0.4, 0, 0, tau);
            ctx.fill();
        };

        drawCloud(W * 0.18, H * 0.3, W * 0.13);
        drawCloud(W * 0.55, H * 0.43, W * 0.19);
        drawCloud(W * 0.88, H * 0.4, W * 0.14);

        drawBuildingLayer(farBuildings, 0.72, 0.82, includeFlicker);
        drawBuildingLayer(nearBuildings, 0.98, 1.12, includeFlicker);

        const groundY = H * 0.65;
        const meadow = ctx.createLinearGradient(0, groundY, 0, H);
        meadow.addColorStop(0, '#75d947');
        meadow.addColorStop(0.12, '#4fbd37');
        meadow.addColorStop(1, '#178b35');
        ctx.fillStyle = meadow;
        ctx.fillRect(0, groundY, W, H - groundY);

        ctx.fillStyle = 'rgba(228,255,178,0.62)';
        ctx.fillRect(0, groundY, W, Math.max(2, H * 0.004));

        ctx.save();
        ctx.globalAlpha = 0.24;
        for (let i = 0; i < 160; i++) {
            const x = rng(i * 17) * W;
            const y = groundY + rng(i * 29 + 3) * (H - groundY);
            const length = 3 + rng(i * 31 + 8) * Math.min(16, H * 0.018);
            ctx.strokeStyle = i % 3 === 0 ? '#d8ff9c' : '#176d31';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + length * 0.25, y - length);
            ctx.stroke();
        }
        ctx.restore();

        const glassGleam = ctx.createLinearGradient(0, groundY - H * 0.025, 0, groundY + H * 0.035);
        glassGleam.addColorStop(0, 'rgba(255,255,255,0)');
        glassGleam.addColorStop(0.5, 'rgba(255,255,255,0.34)');
        glassGleam.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glassGleam;
        ctx.fillRect(0, groundY - H * 0.025, W, H * 0.06);
    }

    function drawClassicBase(includeFlicker = false) {
        const sky = ctx.createLinearGradient(0, 0, 0, H);
        sky.addColorStop(0, '#030406');
        sky.addColorStop(0.45, '#07090e');
        sky.addColorStop(0.80, '#0e1016');
        sky.addColorStop(1, '#14161d');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);
        const mx = W * 0.78, my = H * 0.14, mr = H * 0.038;
        ctx.fillStyle = '#d9d9d9';
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, tau);
        ctx.fill();
        drawBuildingLayer(farBuildings, 0.70, 0.72, includeFlicker);
        drawBuildingLayer(nearBuildings, 1.00, 1.00, includeFlicker);
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, H * 0.65, W, H * 0.05);
        ctx.fillStyle = '#181818';
        ctx.fillRect(0, H * 0.65, W, 2);
        ctx.fillStyle = '#0c0f15';
        ctx.fillRect(0, H * 0.70, W, H * 0.30);
    }

    function roundedRect(x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    function starPath(cx, cy, radius) {
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
            const r = i % 2 === 0 ? radius : radius * 0.45;
            const a = -Math.PI / 2 + i * Math.PI / 5;
            const px = cx + Math.cos(a) * r;
            const py = cy + Math.sin(a) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
    }

    function drawFlame(x, baseY, halfW, height, sway, color, alpha) {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x - halfW, baseY);
        ctx.quadraticCurveTo(x - halfW * 1.3, baseY - height * 0.5, x + sway, baseY - height);
        ctx.quadraticCurveTo(x + halfW * 1.3, baseY - height * 0.5, x + halfW, baseY);
        ctx.closePath();
        ctx.fill();
    }

    function drawGlow(sprite, x, y, radius, alpha) {
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.drawImage(sprite, x - radius, y - radius, radius * 2, radius * 2);
    }

    function newFlake(win, anywhere) {
        return {
            x: win.x + Math.random() * win.w,
            y: anywhere ? win.y + Math.random() * win.h : win.y - Math.random() * 10,
            r: 0.6 + Math.random() * 1.6,
            vy: 0.5 + Math.random() * 0.9,
            vx: (Math.random() - 0.5) * 0.3,
            ph: Math.random() * tau,
            a: 0.4 + Math.random() * 0.5
        };
    }

    function drawChristmasCabin() {
        let seed = 1225;
        const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        const pick = (items) => items[Math.floor(rnd() * items.length)];

        const floorY = H * 0.72;
        const beamH = H * 0.075;
        const win = { x: W * 0.07, y: H * 0.25, w: W * 0.25, h: H * 0.32 };
        const surround = { x: W * 0.385, w: W * 0.27, top: H * 0.25, mantelY: H * 0.4, mantelH: H * 0.03 };
        const mouth = {
            x: surround.x + surround.w * 0.14,
            w: surround.w * 0.72,
            top: surround.mantelY + surround.mantelH + H * 0.06,
            bottom: floorY - H * 0.012
        };
        mouth.h = mouth.bottom - mouth.top;
        const tree = { x: W * 0.87, top: H * 0.17, base: floorY + H * 0.01 };

        cabin = {
            win,
            surround,
            mouth,
            tree,
            lights: [],
            strings: [],
            candles: [],
            lanterns: [],
            twinkle: [],
            star: { x: tree.x, y: tree.top - H * 0.012, r: H * 0.07 }
        };
        live.flakes = [];
        live.embers = [];

        ctx.fillStyle = '#1a0c07';
        ctx.fillRect(0, 0, W, floorY);

        const logPalettes = [
            ['#7e5234', '#5c3923', '#3e2518', '#1b0e07'],
            ['#734a2e', '#543520', '#372117', '#170b06'],
            ['#6c4530', '#4f321f', '#352015', '#150a05']
        ];
        const logH = Math.max(18, H * 0.068);
        for (let y = beamH; y < floorY; y += logH) {
            const h = Math.min(logH, floorY - y);
            const p = pick(logPalettes);
            const log = ctx.createLinearGradient(0, y, 0, y + h);
            log.addColorStop(0, p[0]);
            log.addColorStop(0.3, p[1]);
            log.addColorStop(0.8, p[2]);
            log.addColorStop(1, p[3]);
            ctx.fillStyle = log;
            ctx.fillRect(0, y, W, h);
            for (let k = 0; k < 12; k++) {
                const gy = y + h * (0.12 + rnd() * 0.76);
                const bend = (rnd() - 0.5) * h * 0.6;
                ctx.strokeStyle = rnd() > 0.5 ? 'rgba(235,175,125,0.07)' : 'rgba(0,0,0,0.35)';
                ctx.lineWidth = 0.8 + rnd() * 1.8;
                ctx.beginPath();
                ctx.moveTo(0, gy);
                ctx.bezierCurveTo(W * 0.3, gy + bend, W * 0.65, gy - bend, W, gy + bend * 0.4);
                ctx.stroke();
            }
            if (rnd() < 0.6) {
                const kx = rnd() * W;
                const ky = y + h * 0.5;
                ctx.fillStyle = '#23130a';
                ctx.beginPath();
                ctx.ellipse(kx, ky, h * 0.3, h * 0.22, 0, 0, tau);
                ctx.fill();
                ctx.strokeStyle = 'rgba(150,100,60,0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.ellipse(kx, ky, h * 0.18, h * 0.12, 0, 0, tau);
                ctx.stroke();
            }
            ctx.fillStyle = 'rgba(255,205,150,0.12)';
            ctx.fillRect(0, y, W, 2);
            ctx.fillStyle = 'rgba(8,4,2,0.95)';
            ctx.fillRect(0, y + h - 4, W, 4);
            for (let cx2 = rnd() * 80; cx2 < W; cx2 += 90 + rnd() * 260) {
                ctx.fillStyle = 'rgba(196,166,122,0.2)';
                ctx.fillRect(cx2, y + h - 3, 40 + rnd() * 70, 2);
            }
        }

        const beam = ctx.createLinearGradient(0, 0, 0, beamH);
        beam.addColorStop(0, '#1a0d07');
        beam.addColorStop(0.6, '#43261a');
        beam.addColorStop(1, '#241409');
        ctx.fillStyle = beam;
        ctx.fillRect(0, 0, W, beamH);
        ctx.fillStyle = 'rgba(255,205,150,0.12)';
        ctx.fillRect(0, beamH - 3, W, 1);
        ctx.fillStyle = 'rgba(8,4,2,0.95)';
        ctx.fillRect(0, beamH, W, 3);

        const beamShade = ctx.createLinearGradient(0, beamH, 0, beamH + H * 0.14);
        beamShade.addColorStop(0, 'rgba(6,3,1,0.55)');
        beamShade.addColorStop(1, 'rgba(6,3,1,0)');
        ctx.fillStyle = beamShade;
        ctx.fillRect(0, beamH, W, H * 0.14);

        const stringY = beamH + H * 0.018;
        const sag = H * 0.03;
        ctx.strokeStyle = 'rgba(12,7,4,0.85)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, stringY);
        ctx.quadraticCurveTo(W * 0.5, stringY + sag * 2, W, stringY);
        ctx.stroke();
        const bulbColors = ['#ffd98a', '#f0a07a', '#b5d8a6', '#ffe9bd'];
        for (let i = 1; i < 26; i++) {
            const t = i / 26;
            const x = W * t;
            const y = stringY + sag * 4 * t * (1 - t) + H * 0.008;
            const c = pick(bulbColors);
            cabin.strings.push({ x, y, ph: rnd() * tau });
            ctx.fillStyle = c;
            ctx.shadowColor = c;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(x, y, Math.max(2, W * 0.004), 0, tau);
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        [W * 0.335, W * 0.72].forEach((lx) => {
            const lw = Math.max(18, W * 0.018);
            const lh = lw * 1.6;
            const cy = beamH + H * 0.1;
            ctx.strokeStyle = 'rgba(12,7,4,0.9)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(lx, beamH);
            ctx.lineTo(lx, cy - lh / 2 - lw * 0.14);
            ctx.stroke();
            ctx.fillStyle = '#1a0e08';
            ctx.fillRect(lx - lw * 0.55, cy - lh / 2 - lw * 0.14, lw * 1.1, lw * 0.14);
            ctx.fillStyle = '#2a1a10';
            roundedRect(lx - lw / 2, cy - lh / 2, lw, lh, lw * 0.3);
            ctx.fill();
            const glass = ctx.createLinearGradient(0, cy - lh * 0.36, 0, cy + lh * 0.36);
            glass.addColorStop(0, '#f7c77a');
            glass.addColorStop(1, '#b8602a');
            ctx.fillStyle = glass;
            roundedRect(lx - lw * 0.36, cy - lh * 0.36, lw * 0.72, lh * 0.72, lw * 0.2);
            ctx.fill();
            ctx.fillStyle = '#1a0e08';
            ctx.fillRect(lx - lw * 0.55, cy + lh / 2, lw * 1.1, lw * 0.1);
            cabin.lanterns.push({ x: lx, y: cy, r: lw * 2.6 });
        });

        const floorGrad = ctx.createLinearGradient(0, floorY, 0, H);
        floorGrad.addColorStop(0, '#5a3626');
        floorGrad.addColorStop(1, '#1a0e09');
        ctx.fillStyle = floorGrad;
        ctx.fillRect(0, floorY, W, H - floorY);
        const plankH = H * 0.045;
        for (let y = floorY; y < H; y += plankH) {
            ctx.fillStyle = 'rgba(0,0,0,0.35)';
            ctx.fillRect(0, y, W, 2);
            ctx.fillStyle = 'rgba(190,130,80,0.08)';
            ctx.fillRect(0, y + 2, W, 1);
            let x = (rnd() - 0.5) * W * 0.3;
            while (x < W) {
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(x, y, 2, plankH);
                x += W * (0.18 + rnd() * 0.22);
            }
        }

        const { x: wx, y: wy, w: ww, h: wh } = win;
        ctx.fillStyle = '#2a170e';
        roundedRect(wx - 16, wy - 16, ww + 32, wh + 32, 8);
        ctx.fill();
        const sky = ctx.createLinearGradient(0, wy, 0, wy + wh);
        sky.addColorStop(0, '#040916');
        sky.addColorStop(0.5, '#122544');
        sky.addColorStop(1, '#2e4a6e');
        ctx.fillStyle = sky;
        ctx.fillRect(wx, wy, ww, wh);
        ctx.fillStyle = 'rgba(235,240,255,0.7)';
        for (let k = 0; k < 60; k++) {
            const starX = wx + rnd() * ww;
            const starY = wy + rnd() * wh * 0.55;
            ctx.beginPath();
            ctx.arc(starX, starY, 0.4 + rnd() * 0.9, 0, tau);
            ctx.fill();
            if (k % 4 === 0) cabin.twinkle.push({ x: starX, y: starY, ph: rnd() * tau });
        }
        const moonX = wx + ww * 0.74;
        const moonY = wy + wh * 0.2;
        const moonR = Math.min(ww, wh) * 0.07;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        drawGlow(glows.moon, moonX, moonY, moonR * 4, 0.35);
        ctx.restore();
        ctx.fillStyle = '#f3f1e2';
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonR, 0, tau);
        ctx.fill();
        ctx.fillStyle = '#16263f';
        ctx.beginPath();
        ctx.moveTo(wx, wy + wh * 0.72);
        for (let k = 1; k <= 10; k++) {
            ctx.lineTo(wx + ww * k / 10, wy + wh * (0.66 + rnd() * 0.07));
        }
        ctx.lineTo(wx + ww, wy + wh);
        ctx.lineTo(wx, wy + wh);
        ctx.closePath();
        ctx.fill();
        for (let k = 0; k < 9; k++) {
            const px = wx + ww * (k + 0.5 + (rnd() - 0.5) * 0.4) / 9;
            const ph = wh * (0.22 + rnd() * 0.2);
            const pb = wy + wh * 0.9;
            ctx.fillStyle = '#0a1715';
            ctx.beginPath();
            ctx.moveTo(px, pb - ph);
            ctx.lineTo(px + ph * 0.24, pb - ph * 0.42);
            ctx.lineTo(px - ph * 0.24, pb - ph * 0.42);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(px, pb - ph * 0.7);
            ctx.lineTo(px + ph * 0.36, pb);
            ctx.lineTo(px - ph * 0.36, pb);
            ctx.closePath();
            ctx.fill();
        }
        const ground = ctx.createLinearGradient(0, wy + wh * 0.88, 0, wy + wh);
        ground.addColorStop(0, '#dfe9f3');
        ground.addColorStop(1, '#8fa6bd');
        ctx.fillStyle = ground;
        ctx.fillRect(wx, wy + wh * 0.88, ww, wh * 0.12);
        ctx.fillStyle = '#4a2d1c';
        ctx.fillRect(wx + ww / 2 - 4, wy, 8, wh);
        ctx.fillRect(wx, wy + wh / 2 - 4, ww, 8);
        ctx.strokeStyle = 'rgba(224,177,91,0.35)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(wx, wy, ww, wh);

        const wrCx = wx + ww / 2;
        const wrCy = wy - H * 0.05;
        const wrR = H * 0.04;
        for (let k = 0; k < 110; k++) {
            const a = (k / 110) * tau;
            const rr = wrR + (rnd() - 0.5) * wrR * 0.3;
            ctx.fillStyle = rnd() > 0.5 ? '#2f5a43' : '#203f2e';
            ctx.beginPath();
            ctx.ellipse(wrCx + Math.cos(a) * rr, wrCy + Math.sin(a) * rr, wrR * 0.16, wrR * 0.08, a + rnd() * 0.8, 0, tau);
            ctx.fill();
        }
        ctx.fillStyle = '#b8473c';
        for (let k = 0; k < 9; k++) {
            const a = ((k + 0.5) / 9) * tau;
            ctx.beginPath();
            ctx.arc(wrCx + Math.cos(a) * wrR, wrCy + Math.sin(a) * wrR, Math.max(2.5, H * 0.0065), 0, tau);
            ctx.fill();
        }
        ctx.fillStyle = '#a8463d';
        ctx.beginPath();
        ctx.ellipse(wrCx - wrR * 0.22, wrCy + wrR * 1.05, wrR * 0.28, wrR * 0.16, -0.5, 0, tau);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(wrCx + wrR * 0.22, wrCy + wrR * 1.05, wrR * 0.28, wrR * 0.16, 0.5, 0, tau);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(wrCx, wrCy + wrR * 1.05, wrR * 0.1, 0, tau);
        ctx.fill();

        ctx.fillStyle = '#5a3825';
        ctx.fillRect(wx - 22, wy + wh + 8, ww + 44, 14);
        ctx.fillStyle = '#e8f0f8';
        for (let k = 0; k < 6; k++) {
            ctx.beginPath();
            ctx.ellipse(wx + ww * (0.08 + k * 0.17), wy + wh + 8, ww * 0.05, 4, 0, 0, tau);
            ctx.fill();
        }

        const spill = ctx.createLinearGradient(0, wy + wh, 0, floorY + H * 0.2);
        spill.addColorStop(0, 'rgba(170,195,235,0.16)');
        spill.addColorStop(1, 'rgba(170,195,235,0)');
        ctx.fillStyle = spill;
        ctx.beginPath();
        ctx.moveTo(wx, wy + wh + 22);
        ctx.lineTo(wx + ww, wy + wh + 22);
        ctx.lineTo(wx + ww * 1.5, floorY + H * 0.2);
        ctx.lineTo(wx - ww * 0.3, floorY + H * 0.2);
        ctx.closePath();
        ctx.fill();

        const rugX = W * 0.52;
        const rugY = floorY + H * 0.14;
        const rugRx = W * 0.2;
        const rugRy = H * 0.07;
        ctx.fillStyle = '#5a2620';
        ctx.beginPath();
        ctx.ellipse(rugX, rugY, rugRx, rugRy, 0, 0, tau);
        ctx.fill();
        [[0.9, '#b8914f'], [0.74, '#2f4a3a'], [0.58, '#8a3a31'], [0.42, '#b8914f']].forEach(([k, c]) => {
            ctx.strokeStyle = c;
            ctx.lineWidth = Math.max(3, H * 0.008);
            ctx.beginPath();
            ctx.ellipse(rugX, rugY, rugRx * k, rugRy * k, 0, 0, tau);
            ctx.stroke();
        });

        const { x: sx, w: sw, top: st, mantelY, mantelH } = surround;
        ctx.fillStyle = '#2a221d';
        ctx.fillRect(sx, st, sw, floorY - st);
        const stoneRows = Math.ceil((floorY - st) / (H * 0.045));
        const rowH = (floorY - st) / stoneRows;
        for (let r = 0; r < stoneRows; r++) {
            const ry = st + r * rowH;
            let x = sx;
            while (x < sx + sw - 2) {
                const bw = Math.min(sx + sw - x, sw * (0.13 + rnd() * 0.12));
                if (bw < 12) break;
                ctx.fillStyle = pick(['#5b5149', '#6e6358', '#4d443d', '#7a6c5f', '#645a50']);
                roundedRect(x + 2, ry + 2, bw - 4, rowH - 4, 3);
                ctx.fill();
                x += bw;
            }
        }

        const mg = ctx.createLinearGradient(0, mantelY, 0, mantelY + mantelH);
        mg.addColorStop(0, '#7a4a2c');
        mg.addColorStop(1, '#3a2315');
        ctx.fillStyle = mg;
        ctx.fillRect(sx - sw * 0.04, mantelY, sw * 1.08, mantelH);
        ctx.fillStyle = 'rgba(255,215,160,0.2)';
        ctx.fillRect(sx - sw * 0.04, mantelY, sw * 1.08, 2);

        const stocking = (x, top, s, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x - s * 0.5, top);
            ctx.lineTo(x + s * 0.5, top);
            ctx.lineTo(x + s * 0.5, top + s * 0.9);
            ctx.quadraticCurveTo(x + s * 0.55, top + s * 1.2, x + s * 1.0, top + s * 1.25);
            ctx.quadraticCurveTo(x + s * 1.35, top + s * 1.3, x + s * 1.15, top + s * 1.5);
            ctx.quadraticCurveTo(x + s * 0.4, top + s * 1.6, x - s * 0.5, top + s * 1.3);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#efe3c8';
            ctx.fillRect(x - s * 0.55, top, s * 1.1, s * 0.22);
        };
        const stockingS = H * 0.032;
        stocking(sx + sw * 0.27, mantelY + mantelH, stockingS, '#9e2f2a');
        stocking(sx + sw * 0.73, mantelY + mantelH, stockingS, '#8a2c28');

        [0.14, 0.5, 0.86].forEach((cf) => {
            const cx = sx + sw * cf;
            const ch = H * 0.05;
            const cw = Math.max(6, W * 0.008);
            ctx.fillStyle = '#efe3c8';
            ctx.fillRect(cx - cw / 2, mantelY - ch, cw, ch);
            ctx.fillStyle = 'rgba(120,90,60,0.5)';
            ctx.fillRect(cx - cw / 2, mantelY - 3, cw, 3);
            ctx.fillStyle = '#2a1a10';
            ctx.fillRect(cx - 0.5, mantelY - ch - H * 0.008, 1, H * 0.008);
            cabin.candles.push({ x: cx, y: mantelY - ch - H * 0.008, s: H * 0.024 });
        });

        const gx0 = sx - sw * 0.02;
        const gx1 = sx + sw * 1.02;
        const gy = mantelY - H * 0.004;
        const gcx = (gx0 + gx1) / 2;
        const gcy = gy + H * 0.02;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#24492f';
        ctx.lineWidth = Math.max(6, H * 0.013);
        ctx.beginPath();
        ctx.moveTo(gx0, gy);
        ctx.quadraticCurveTo(gcx, gcy, gx1, gy);
        ctx.stroke();
        ctx.strokeStyle = '#2f5a43';
        ctx.lineWidth = Math.max(2, H * 0.005);
        ctx.beginPath();
        ctx.moveTo(gx0, gy - 1);
        ctx.quadraticCurveTo(gcx, gcy - 2, gx1, gy - 1);
        ctx.stroke();
        for (let k = 0; k < 11; k++) {
            const t = (k + 0.5) / 11;
            const bx = (1 - t) * (1 - t) * gx0 + 2 * (1 - t) * t * gcx + t * t * gx1;
            const by = (1 - t) * (1 - t) * gy + 2 * (1 - t) * t * gcy + t * t * gy;
            ctx.fillStyle = k % 3 === 1 ? '#e0b15b' : '#a8463d';
            ctx.beginPath();
            ctx.arc(bx, by + H * 0.006, Math.max(2.5, H * 0.0055), 0, tau);
            ctx.fill();
        }
        ctx.lineCap = 'butt';

        const { x: mx, w: mw, top: mt, bottom: mb, h: mh } = mouth;
        const mr = mw / 2;
        const archPath = (inset) => {
            const r = mr + inset;
            const cx = mx + mr;
            const cy = mt + mr;
            ctx.beginPath();
            ctx.moveTo(cx - r, mb + 4);
            ctx.lineTo(cx - r, cy);
            ctx.arc(cx, cy, r, Math.PI, 0);
            ctx.lineTo(cx + r, mb + 4);
            ctx.closePath();
        };
        ctx.fillStyle = '#6e6358';
        archPath(12);
        ctx.fill();
        const back = ctx.createLinearGradient(0, mt, 0, mb);
        back.addColorStop(0, '#0d0605');
        back.addColorStop(0.7, '#2a120a');
        back.addColorStop(1, '#4a1e0d');
        ctx.fillStyle = back;
        archPath(0);
        ctx.fill();
        ctx.save();
        archPath(0);
        ctx.clip();
        const bedY = mb - mh * 0.1;
        const logLen = mw * 0.72;
        const logT = mh * 0.12;
        ctx.fillStyle = '#3b2214';
        ctx.save();
        ctx.translate(mx + mw * 0.5, bedY);
        ctx.rotate(-0.1);
        roundedRect(-logLen / 2, -logT / 2, logLen, logT, logT / 2);
        ctx.fill();
        ctx.restore();
        ctx.fillStyle = '#24130b';
        ctx.save();
        ctx.translate(mx + mw * 0.5, bedY - logT * 0.25);
        ctx.rotate(0.12);
        roundedRect(-logLen * 0.55, -logT * 0.45, logLen * 1.1, logT * 0.9, logT * 0.4);
        ctx.fill();
        ctx.restore();
        const emberBed = ctx.createRadialGradient(mx + mw * 0.5, mb, 2, mx + mw * 0.5, mb, mw * 0.55);
        emberBed.addColorStop(0, 'rgba(255,110,40,0.6)');
        emberBed.addColorStop(1, 'rgba(255,80,20,0)');
        ctx.fillStyle = emberBed;
        ctx.fillRect(mx, mt, mw, mh);
        ctx.restore();

        ctx.fillStyle = '#5b5149';
        ctx.fillRect(mx - mw * 0.08, floorY - H * 0.012, mw * 1.16, H * 0.03);
        ctx.fillStyle = 'rgba(255,220,180,0.12)';
        ctx.fillRect(mx - mw * 0.08, floorY - H * 0.012, mw * 1.16, 2);

        const ambient = ctx.createRadialGradient(mx + mw * 0.5, floorY, 0, mx + mw * 0.5, floorY, W * 0.5);
        ambient.addColorStop(0, 'rgba(255,140,60,0.12)');
        ambient.addColorStop(1, 'rgba(255,140,60,0)');
        ctx.fillStyle = ambient;
        ctx.fillRect(0, 0, W, floorY + H * 0.28);

        const { x: tx, top: tt, base: tb } = tree;
        const treeH = tb - tt;
        ctx.fillStyle = '#2a170e';
        ctx.fillRect(tx - W * 0.011, tb - H * 0.07, W * 0.022, H * 0.07);
        ctx.fillStyle = '#6e2722';
        ctx.beginPath();
        ctx.ellipse(tx, tb, W * 0.085, H * 0.024, 0, 0, tau);
        ctx.fill();
        ctx.strokeStyle = '#d5a548';
        ctx.lineWidth = 2;
        ctx.stroke();
        for (let tier = 0; tier < 5; tier++) {
            const top = tt + treeH * tier * 0.14;
            const bottom = tt + treeH * (0.42 + tier * 0.14);
            const halfW = W * (0.035 + tier * 0.013);
            const g = ctx.createLinearGradient(0, top, 0, bottom);
            g.addColorStop(0, '#2f6a4c');
            g.addColorStop(1, '#173a2a');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.moveTo(tx, top);
            ctx.lineTo(tx + halfW, bottom);
            ctx.lineTo(tx - halfW, bottom);
            ctx.closePath();
            ctx.fill();
            ctx.lineWidth = 2;
            for (let b = 0; b < 9; b++) {
                const y = top + (bottom - top) * (b / 9 + 0.05);
                const w = halfW * (y - top) / (bottom - top) * 0.95;
                ctx.strokeStyle = b % 2 ? 'rgba(110,180,140,0.3)' : 'rgba(8,28,18,0.45)';
                ctx.beginPath();
                ctx.moveTo(tx, y);
                ctx.lineTo(tx + w, y + (bottom - top) * 0.12);
                ctx.moveTo(tx, y);
                ctx.lineTo(tx - w, y + (bottom - top) * 0.12);
                ctx.stroke();
            }
        }
        ctx.fillStyle = '#f2cc74';
        starPath(tx, cabin.star.y, W * 0.016);
        ctx.fill();

        const ornColors = ['#b8473c', '#dcb262', '#efe3c8', '#7f9fbf', '#c26a48'];
        for (let i = 0; i < 26; i++) {
            const oy = tt + treeH * (0.12 + rnd() * 0.6);
            const frac = (oy - tt) / treeH;
            const ox = tx + (rnd() * 2 - 1) * W * 0.07 * frac;
            ctx.fillStyle = pick(ornColors);
            ctx.beginPath();
            ctx.arc(ox, oy, Math.max(3, W * 0.0045), 0, tau);
            ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,0.35)';
            ctx.beginPath();
            ctx.arc(ox - 1.5, oy - 1.5, 1.2, 0, tau);
            ctx.fill();
        }
        for (let i = 0; i < 34; i++) {
            const ly = tt + treeH * (0.08 + rnd() * 0.62);
            const frac = (ly - tt) / treeH;
            const lx = tx + (rnd() * 2 - 1) * W * 0.07 * frac;
            const c = pick(['#ffd98a', '#f0a07a', '#b5d8a6', '#ffe9bd', '#ffb3a0']);
            cabin.lights.push({ x: lx, y: ly, ph: rnd() * tau });
            ctx.fillStyle = c;
            ctx.shadowColor = c;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(lx, ly, Math.max(2, W * 0.0028), 0, tau);
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        const box = (x, w, h, color, ribbon) => {
            const top = floorY + H * 0.045 - h;
            ctx.fillStyle = color;
            ctx.fillRect(x, top, w, h);
            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            ctx.fillRect(x, top, w * 0.14, h);
            ctx.fillStyle = 'rgba(0,0,0,0.25)';
            ctx.fillRect(x + w * 0.86, top, w * 0.14, h);
            ctx.fillStyle = ribbon;
            ctx.fillRect(x + w * 0.44, top, w * 0.12, h);
            ctx.fillRect(x, top + h * 0.42, w, h * 0.12);
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.beginPath();
            ctx.moveTo(x, top);
            ctx.lineTo(x + w * 0.1, top - h * 0.12);
            ctx.lineTo(x + w * 1.1, top - h * 0.12);
            ctx.lineTo(x + w, top);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = ribbon;
            ctx.beginPath();
            ctx.ellipse(x + w * 0.36, top - h * 0.12, w * 0.13, h * 0.08, -0.4, 0, tau);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(x + w * 0.64, top - h * 0.12, w * 0.13, h * 0.08, 0.4, 0, tau);
            ctx.fill();
        };
        box(tx - W * 0.105, W * 0.05, H * 0.05, '#8c3430', '#dcb262');
        box(tx - W * 0.045, W * 0.04, H * 0.075, '#2d5a46', '#efe3c8');
        box(tx + W * 0.01, W * 0.045, H * 0.038, '#c9a25c', '#8c3430');

        const vig = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.78);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, 'rgba(4,2,1,0.8)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
    }

    function drawChristmasLive(now, elapsed) {
        if (!cabin) return;
        const t = now * 0.001;
        const { win, mouth, candles, lanterns, lights, strings, twinkle, star } = cabin;
        const bed = mouth.bottom - mouth.h * 0.1;
        const surge = 0.9 + 0.07 * Math.sin(t * 5.3) + 0.05 * Math.sin(t * 13.7 + 1.1);
        const hearthX = mouth.x + mouth.w * 0.5;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        drawGlow(glows.warm, hearthX, mouth.bottom, W * 0.34, 0.16 * surge);
        drawGlow(glows.warm, hearthX, mouth.bottom - mouth.h * 0.3, mouth.w * 0.85, 0.35 * surge);

        const flameCount = 7;
        for (let i = 0; i < flameCount; i++) {
            const u = i / (flameCount - 1);
            const phase = i * 1.9;
            const fx = mouth.x + mouth.w * (0.2 + 0.6 * u);
            const centre = 1 - Math.abs(u - 0.5) * 0.7;
            const fh = mouth.h * 0.4 * centre * (0.85 + 0.15 * Math.sin(t * 7 + phase) + 0.05 * Math.sin(t * 19 + phase));
            const sway = Math.sin(t * 3.1 + phase) * mouth.w * 0.02 + Math.sin(t * 8.3 + phase * 3) * mouth.w * 0.008;
            const hw = mouth.w * 0.07 * (0.9 + 0.1 * Math.sin(t * 4 + phase));
            drawFlame(fx, bed, hw * 1.7, fh * 1.05, sway, '#c4431c', 0.2 * surge);
            drawFlame(fx, bed, hw * 1.15, fh * 0.75, sway * 0.8, '#f0782a', 0.25 * surge);
            drawFlame(fx, bed, hw * 0.6, fh * 0.45, sway * 0.6, '#ffd27a', 0.3 * surge);
        }

        if (live.embers.length < 36 && Math.random() < 0.35 * elapsed) {
            live.embers.push({
                x: mouth.x + mouth.w * (0.2 + Math.random() * 0.6),
                y: bed - mouth.h * 0.05,
                vx: (Math.random() - 0.5) * 0.4,
                vy: 0.6 + Math.random() * 0.9,
                life: 1,
                decay: 0.006 + Math.random() * 0.008,
                r: 2 + Math.random() * 3
            });
        }
        for (let i = live.embers.length - 1; i >= 0; i--) {
            const e = live.embers[i];
            e.x += (e.vx + Math.sin(t * 3 + e.y * 0.05) * 0.25) * elapsed;
            e.y -= e.vy * elapsed;
            e.life -= e.decay * elapsed;
            if (e.life <= 0 || e.y < mouth.top) {
                live.embers.splice(i, 1);
                continue;
            }
            drawGlow(glows.ember, e.x, e.y, e.r * 2, e.life);
        }

        candles.forEach((c, i) => {
            const flick = 0.85 + 0.15 * Math.sin(t * 9 + i * 2.1) + 0.05 * Math.sin(t * 23 + i);
            drawGlow(glows.gold, c.x, c.y, c.s * 3, 0.45 * flick);
            drawFlame(c.x, c.y, c.s * 0.22, c.s * (0.9 + 0.1 * flick), Math.sin(t * 6 + i) * c.s * 0.08, '#ffb84a', 0.8);
            drawFlame(c.x, c.y, c.s * 0.1, c.s * 0.55, 0, '#fff4cc', 0.9);
        });

        lanterns.forEach((l, i) => {
            drawGlow(glows.gold, l.x, l.y, l.r * (0.97 + 0.03 * Math.sin(t * 4 + i)), 0.4);
        });

        const lightR = Math.max(5, H * 0.016);
        lights.forEach((l) => {
            drawGlow(glows.gold, l.x, l.y, lightR, 0.25 + 0.3 * (0.5 + 0.5 * Math.sin(t * 2.2 + l.ph)));
        });
        strings.forEach((l) => {
            drawGlow(glows.gold, l.x, l.y, lightR * 0.85, 0.2 + 0.2 * (0.5 + 0.5 * Math.sin(t * 1.8 + l.ph)));
        });
        drawGlow(glows.gold, star.x, star.y, star.r, 0.45 + 0.15 * Math.sin(t * 1.5));

        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.rect(win.x, win.y, win.w, win.h);
        ctx.clip();

        ctx.fillStyle = '#fff4e0';
        for (let i = 0; i < twinkle.length; i++) {
            const s = twinkle[i];
            ctx.globalAlpha = 0.25 + 0.6 * (0.5 + 0.5 * Math.sin(t * 2.3 + s.ph));
            ctx.beginPath();
            ctx.arc(s.x, s.y, 1.3, 0, tau);
            ctx.fill();
        }

        while (live.flakes.length < 60) {
            live.flakes.push(newFlake(win, true));
        }
        ctx.fillStyle = '#eef4ff';
        for (let i = 0; i < live.flakes.length; i++) {
            const f = live.flakes[i];
            f.y += f.vy * elapsed;
            f.x += (f.vx + Math.sin(t * 0.8 + f.ph) * 0.15) * elapsed;
            if (f.y > win.y + win.h) Object.assign(f, newFlake(win, false));
            ctx.globalAlpha = f.a;
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, tau);
            ctx.fill();
        }
        ctx.restore();
    }

    function drawFlickeringWindows(now) {
        const aeroTheme = currentTheme() === 'aero';
        [farBuildings, nearBuildings].forEach((list, layerIndex) => {
            list.forEach(building => building.wins.forEach(win => {
                if (!win.flicker || Math.sin(now * 0.0001 + win.x) <= 0) return;
                ctx.fillStyle = aeroTheme
                    ? `rgba(220,255,255,${layerIndex ? 0.8 : 0.6})`
                    : `rgba(215,215,215,${layerIndex ? 0.68 : 0.5})`;
                ctx.fillRect(win.x, win.y, 5, 8);
            }));
        });
    }

    function paintLayers() {
        const theme = currentTheme();
        baseCanvas.width = mirrorCanvas.width = overlayCanvas.width = W;
        baseCanvas.height = mirrorCanvas.height = overlayCanvas.height = H;
        ctx = baseCtx;
        baseCtx.clearRect(0, 0, W, H);
        if (theme === 'aero') drawAeroCity(false);
        else if (theme === 'christmas') drawChristmasCabin();
        else drawClassicBase(false);

        ctx = mirrorCtx;
        mirrorCtx.clearRect(0, 0, W, H);
        mirrorCtx.save();
        mirrorCtx.translate(0, H * 1.4);
        mirrorCtx.scale(1, -1);
        mirrorCtx.drawImage(baseCanvas, 0, 0);
        mirrorCtx.restore();

        ctx = overlayCtx;
        overlayCtx.clearRect(0, 0, W, H);
        if (theme === 'classic') {
            const lakeY = H * 0.70;
            const shading = overlayCtx.createLinearGradient(0, lakeY, 0, H);
            shading.addColorStop(0, 'rgba(5, 8, 12, 0.40)');
            shading.addColorStop(0.5, 'rgba(3, 5, 8, 0.70)');
            shading.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
            overlayCtx.fillStyle = shading;
            overlayCtx.fillRect(0, lakeY, W, H - lakeY);
            overlayCtx.fillStyle = 'rgba(255,255,255,0.08)';
            overlayCtx.fillRect(0, lakeY, W, 1);
        }
        ctx = canvas.getContext('2d');
    }

    const ripples = [];
    function drawRipples(elapsed = 1) {
        const ly = H * 0.70;
        const lh = H - ly;
        for (let i = ripples.length - 1; i >= 0; i--) {
            const r = ripples[i];
            r.r += (0.5 + (r.yFrac * 1.5)) * elapsed;
            r.a -= (0.015 + (1 - r.yFrac) * 0.02) * elapsed;
            if (r.a <= 0) { ripples.splice(i, 1); continue; }

            const ry = ly + r.yFrac * lh;
            ctx.beginPath();
            ctx.ellipse(r.x, ry, r.r * 2.5, r.r * 0.4, 0, 0, tau);
            ctx.strokeStyle = `rgba(255,255,255,${r.a})`;
            ctx.lineWidth = 0.5 + r.yFrac * 0.5;
            ctx.stroke();
        }
    }

    const LAYERS = [
        { count: 70, sMin: 6, sMax: 11, lMin: 10, lMax: 22, wMin: 0.3, wMax: 0.6, aMin: 0.06, aMax: 0.16, ang: 0.10 },
        { count: 45, sMin: 14, sMax: 22, lMin: 18, lMax: 38, wMin: 0.5, wMax: 0.9, aMin: 0.14, aMax: 0.32, ang: 0.12 },
        { count: 22, sMin: 28, sMax: 40, lMin: 35, lMax: 65, wMin: 0.9, wMax: 1.5, aMin: 0.28, aMax: 0.50, ang: 0.14 },
    ];
    let dropsByLayer = [];
    function rb(a, b) { return a + Math.random() * (b - a); }
    function spawnDrop(L) {
        return {
            x: Math.random() * (W + 200) - 100, y: rb(-200, -10),
            spd: rb(L.sMin, L.sMax), len: rb(L.lMin, L.lMax),
            w: rb(L.wMin, L.wMax), a: rb(L.aMin, L.aMax), ang: L.ang
        };
    }
    function initDrops() {
        dropsByLayer = LAYERS.map((L) => {
            const arr = [];
            for (let i = 0; i < L.count; i++) {
                const d = spawnDrop(L);
                d.y = Math.random() * H;
                arr.push(d);
            }
            return arr;
        });
    }

    let lastFrameTime = 0;
    let paintedTheme = null;

    function draw() {
        const now = performance.now();
        const elapsed = Math.min(3, Math.max(0.25, lastFrameTime ? (now - lastFrameTime) / 16.67 : 1));
        lastFrameTime = now;
        const theme = currentTheme();
        if (paintedTheme !== theme) {
            paintLayers();
            paintedTheme = theme;
        }
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(baseCanvas, 0, 0);
        if (theme === 'christmas') {
            drawChristmasLive(now, elapsed);
            return;
        }
        drawFlickeringWindows(now);

        const LAKE_Y = H * 0.70;
        if (theme === 'classic') {
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, LAKE_Y, W, H - LAKE_Y);
            ctx.clip();
            const wt = now * 0.00045;
            for (let s = 0; s < 40; s++) {
                const fracStart = Math.pow(s / 40, 1.5);
                const fracEnd = Math.pow((s + 1) / 40, 1.5);
                const dstY = LAKE_Y + fracStart * (H - LAKE_Y);
                const dstH = (fracEnd - fracStart) * (H - LAKE_Y);
                const wave = Math.sin(wt + s * 0.3) * (1 + fracStart * 15);
                ctx.drawImage(mirrorCanvas, wave, LAKE_Y + fracStart * (H - LAKE_Y) * 1.2, W, Math.max(1, dstH * 1.2), 0, dstY, W, Math.max(1, dstH + 1));
            }
            ctx.restore();
            ctx.drawImage(overlayCanvas, 0, 0);
        }

        LAYERS.forEach((L, li) => {
            const drops = dropsByLayer[li];
            const dx = Math.sin(L.ang);
            const dy = Math.cos(L.ang);
            drops.forEach(d => {
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x + dx * d.len, d.y + dy * d.len);
                ctx.strokeStyle = `rgba(210,210,210,${d.a})`;
                ctx.lineWidth = d.w;
                ctx.lineCap = 'round';
                ctx.stroke();
                d.x += d.spd * dx * elapsed;
                d.y += d.spd * elapsed;
                if (d.y > LAKE_Y) {
                    if (Math.random() < 0.3) {
                        const yFrac = Math.pow(Math.random(), 1.5);
                        ripples.push({ x: d.x, yFrac: yFrac, r: 1, a: 0.45 });
                    }
                    Object.assign(d, spawnDrop(L));
                }
            });
        });

        drawRipples(elapsed);
    }

    let paused = false;
    let animationFrame = null;

    function loop() {
        animationFrame = null;
        if (paused) return;
        draw();
        animationFrame = requestAnimationFrame(loop);
    }

    function startAnimation() {
        if (!paused && animationFrame === null) {
            animationFrame = requestAnimationFrame(loop);
        }
    }

    function renderStill() {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(baseCanvas, 0, 0);
        if (currentTheme() === 'christmas') drawChristmasLive(performance.now(), 1);
        else ctx.drawImage(overlayCanvas, 0, 0);
    }

    function syncPause() {
        const shouldPause = document.body.classList.contains('low-end-mode');
        if (paused === shouldPause) {
            if (W && H) {
                paintLayers();
                paintedTheme = currentTheme();
                if (paused) renderStill();
            }
            return;
        }
        paused = shouldPause;
        if (paused) {
            if (animationFrame !== null) cancelAnimationFrame(animationFrame);
            animationFrame = null;
            if (W && H) {
                paintLayers();
                paintedTheme = currentTheme();
                renderStill();
            }
        } else {
            paintLayers();
            paintedTheme = currentTheme();
            initDrops();
            startAnimation();
        }
    }

    new MutationObserver(() => {
        syncPause();
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationFrame !== null) cancelAnimationFrame(animationFrame);
            animationFrame = null;
        } else if (!paused) {
            lastFrameTime = 0;
            startAnimation();
        }
    });

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        buildCity();
        paintLayers();
        paintedTheme = currentTheme();
        if (paused) renderStill();
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resize();
            if (!paused) initDrops();
        }, 150);
    });

    function startRain() {
        resize();
        if (!paused) {
            initDrops();
            startAnimation();
        }
    }

    if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(startRain, { timeout: 500 });
    } else {
        setTimeout(startRain, 200);
    }
})();