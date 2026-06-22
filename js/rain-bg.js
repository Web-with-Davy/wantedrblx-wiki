(function () {
    'use strict';

    const canvas = document.createElement('canvas');
    canvas.id = 'rain-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;display:block;';
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;

    const blurReflCanvas = document.createElement('canvas');
    const blurReflCtx = blurReflCanvas.getContext('2d');

    function bakeReflection() {
        const tmp = document.createElement('canvas');
        tmp.width = W; tmp.height = H;
        const tCtx = tmp.getContext('2d');

        tCtx.fillStyle = '#000';
        tCtx.fillRect(0, 0, W, H);

        farBuildings.forEach(b => {
            tCtx.fillStyle = '#1a1a1a';
            tCtx.fillRect(b.bx, b.by, b.bw, b.bh + H);
            b.wins.forEach(w => {
                tCtx.fillStyle = `rgba(220,220,220,${0.30 + rng(w.x * 0.1) * 0.20})`;
                tCtx.fillRect(w.x, w.y, 5, 8);
            });
        });
        nearBuildings.forEach(b => {
            tCtx.fillStyle = '#252525';
            tCtx.fillRect(b.bx, b.by, b.bw, b.bh + H);
            b.wins.forEach(w => {
                tCtx.fillStyle = `rgba(235,235,235,${0.55 + rng(w.x * 0.1) * 0.30})`;
                tCtx.fillRect(w.x, w.y, 5, 8);
            });
        });

        tCtx.fillStyle = '#080808';
        tCtx.fillRect(0, H * 0.65, W, H * 0.05);
        tCtx.fillStyle = '#151515';
        tCtx.fillRect(0, H * 0.65, W, 2);

        blurReflCanvas.width = W;
        blurReflCanvas.height = H;
        blurReflCtx.clearRect(0, 0, W, H);
        blurReflCtx.filter = 'blur(4px)';
        blurReflCtx.save();
        blurReflCtx.translate(0, H * 0.70 * 2);
        blurReflCtx.scale(1, -1);
        blurReflCtx.drawImage(tmp, 0, 0);
        blurReflCtx.restore();
        blurReflCtx.filter = 'none';
    }

    let farBuildings = [], nearBuildings = [];
    function rng(n) { const x = Math.sin(42 + n) * 43758.5453; return x - Math.floor(x); }

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
        const cx = b.bx + b.bw * 0.5;
        const roofY = b.by;
        switch (b.style) {
            case 1: {
                const t1h = Math.max(4, b.bh * 0.06);
                const t2h = Math.max(3, b.bh * 0.05);
                ctx.fillStyle = '#0e0e0e';
                ctx.fillRect(b.bx + b.bw * 0.12, roofY - t1h, b.bw * 0.76, t1h);
                ctx.fillStyle = '#0a0a0a';
                ctx.fillRect(b.bx + b.bw * 0.28, roofY - t1h - t2h, b.bw * 0.44, t2h);
                break;
            }
            case 2: {
                const mastH = Math.min(H * 0.06, b.bw * 0.8);
                ctx.strokeStyle = 'rgba(200,200,200,0.50)';
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(cx, roofY); ctx.lineTo(cx, roofY - mastH); ctx.stroke();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(180,180,180,0.30)';
                [0.35, 0.60, 0.85].forEach(f => {
                    const ay = roofY - mastH * f, hw = 5 + (1 - f) * 5;
                    ctx.beginPath(); ctx.moveTo(cx - hw, ay); ctx.lineTo(cx + hw, ay); ctx.stroke();
                });
                break;
            }
            case 3: {
                const twR = Math.max(5, b.bw * 0.11), twH = twR * 1.4;
                const ty = roofY - Math.max(4, twH * 0.55) - twH;
                ctx.fillStyle = '#111';
                ctx.fillRect(cx - twR, ty, twR * 2, twH);
                ctx.beginPath(); ctx.ellipse(cx, ty, twR, twR * 0.3, 0, Math.PI, 0);
                ctx.fillStyle = '#1a1a1a'; ctx.fill();
                ctx.strokeStyle = 'rgba(160,160,160,0.28)'; ctx.lineWidth = 1;
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
                ctx.strokeStyle = 'rgba(160,160,160,0.38)'; ctx.lineWidth = 1.5;
                [0.25, 0.75].forEach(f => {
                    ctx.beginPath();
                    ctx.moveTo(bx2 + bw2 * f, roofY);
                    ctx.lineTo(bx2 + bw2 * f, by2 + bh2);
                    ctx.stroke();
                });
                ctx.fillStyle = '#0d0d0d'; ctx.fillRect(bx2, by2, bw2, bh2);
                ctx.strokeStyle = 'rgba(200,200,200,0.18)'; ctx.lineWidth = 1;
                ctx.strokeRect(bx2, by2, bw2, bh2);
                break;
            }
        }
    }

    function drawBuildingLayer(list, alpha, brightness) {
        const now = Date.now();
        const bodyColor = brightness < 1
            ? `rgb(${Math.round(10 * brightness)},${Math.round(10 * brightness)},${Math.round(10 * brightness)})`
            : '#111';
        const rimVal = Math.round(42 * brightness);
        ctx.globalAlpha = alpha;
        list.forEach(b => {
            ctx.fillStyle = bodyColor;
            ctx.fillRect(b.bx, b.by, b.bw, b.bh + H * 0.5);
            ctx.fillStyle = `rgba(${rimVal},${rimVal},${rimVal},0.5)`;
            ctx.fillRect(b.bx, b.by, b.bw, 1);
            drawRooftop(b);
            b.wins.forEach(w => {
                if (w.flicker && Math.sin(now * 0.0001 + w.x) <= 0) return;
                ctx.fillStyle = `rgba(215,215,215,${(0.38 + rng(w.x * 0.1) * 0.30) * alpha})`;
                ctx.fillRect(w.x, w.y, 5, 8);
            });
        });
        ctx.globalAlpha = 1;
    }

    function drawCity() {
        const mx = W * 0.78, my = H * 0.14, mr = H * 0.038;
        const mg = ctx.createRadialGradient(mx - mr * 0.3, my - mr * 0.3, 0, mx, my, mr * 1.1);
        mg.addColorStop(0, 'rgba(255,255,255,0.95)');
        mg.addColorStop(0.55, 'rgba(230,230,230,0.80)');
        mg.addColorStop(1, 'rgba(180,180,180,0)');
        ctx.fillStyle = mg;
        ctx.shadowColor = 'rgba(255,255,255,0.28)'; ctx.shadowBlur = 22;
        ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        ctx.save(); ctx.globalAlpha = 0.09; ctx.fillStyle = '#888';
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.ellipse(mx + (i - 2) * mr * 0.85, my + mr * 0.65,
                mr * (0.45 + i * 0.10), mr * 0.20, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        const hg = ctx.createRadialGradient(W * 0.45, H * 0.60, 0, W * 0.45, H * 0.60, W * 0.7);
        hg.addColorStop(0, 'rgba(38,38,38,0.26)');
        hg.addColorStop(0.5, 'rgba(12,12,12,0.07)');
        hg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = hg; ctx.fillRect(0, 0, W, H);

        drawBuildingLayer(farBuildings, 0.70, 0.72);
        drawBuildingLayer(nearBuildings, 1.00, 1.00);

        const LAKE_Y = H * 0.70;
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, H * 0.65, W, LAKE_Y - H * 0.65);
        ctx.fillStyle = '#181818';
        ctx.fillRect(0, H * 0.65, W, 2);

        const LAKE_H = H - LAKE_Y;

        ctx.save();
        ctx.beginPath(); ctx.rect(0, LAKE_Y, W, LAKE_H); ctx.clip();
        ctx.globalAlpha = 0.85;

        const wt = Date.now() * 0.00045;
        const STRIPS = 40;

        for (let s = 0; s < STRIPS; s++) {
            const fracStart = Math.pow(s / STRIPS, 1.5);
            const fracEnd = Math.pow((s + 1) / STRIPS, 1.5);

            const dstY = LAKE_Y + fracStart * LAKE_H;
            const dstH = (fracEnd - fracStart) * LAKE_H;

            const stretch = 1.2;
            const srcY = LAKE_Y + fracStart * LAKE_H * stretch;
            const srcH = (fracEnd - fracStart) * LAKE_H * stretch;

            const waveScale = 1 + fracStart * 15;
            const wave = Math.sin(wt + s * 0.3) * waveScale;

            ctx.drawImage(
                blurReflCanvas,
                wave, srcY, W, Math.max(1, srcH),
                0, dstY - 0.5, W, Math.max(1, dstH + 1)
            );
        }
        ctx.restore();

        const wg = ctx.createLinearGradient(0, LAKE_Y, 0, H);
        wg.addColorStop(0, 'rgba(5, 8, 12, 0.40)');
        wg.addColorStop(0.5, 'rgba(3, 5, 8, 0.70)');
        wg.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
        ctx.fillStyle = wg; ctx.fillRect(0, LAKE_Y, W, LAKE_H);

        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(0, LAKE_Y, W, 1);

        ctx.save(); ctx.globalAlpha = 0.05;
        for (let i = 0; i < 15; i++) {
            const frac = Math.pow(i / 15, 1.8);
            const sy = LAKE_Y + 2 + frac * LAKE_H;
            const sw = 40 + rng(i * 9) * 150 + frac * 200;
            const sx = rng(i * 7) * W;
            const sg = ctx.createLinearGradient(sx, 0, sx + sw, 0);
            sg.addColorStop(0, 'rgba(255,255,255,0)');
            sg.addColorStop(0.5, 'rgba(255,255,255,1)');
            sg.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = sg; ctx.fillRect(sx, sy, sw, 1);
        }
        ctx.restore();

        const fog = ctx.createLinearGradient(0, H * 0.45, 0, LAKE_Y);
        fog.addColorStop(0, 'rgba(0,0,0,0)');
        fog.addColorStop(1, 'rgba(0,0,0,0.65)');
        ctx.fillStyle = fog; ctx.fillRect(0, 0, W, H);
    }

    const ripples = [];
    function addRipple(x) {
        if (ripples.length >= 28) ripples.shift();
        ripples.push({ x, r: 1, a: 0.48 });
    }
    function drawRipples() {
        const ly = H * 0.70;
        const lh = H - ly;
        for (let i = ripples.length - 1; i >= 0; i--) {
            const r = ripples[i];
            r.r += 0.5 + (r.yFrac * 1.5);
            r.a -= 0.015 + (1 - r.yFrac) * 0.02;
            if (r.a <= 0) { ripples.splice(i, 1); continue; }

            const ry = ly + r.yFrac * lh;
            ctx.beginPath();
            ctx.ellipse(r.x, ry, r.r * 2.5, r.r * 0.4, 0, 0, Math.PI * 2);
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
        dropsByLayer = LAYERS.map((L, li) => {
            const arr = [];
            for (let i = 0; i < L.count; i++) {
                const d = spawnDrop(L); d.y = Math.random() * H; arr.push(d);
            }
            return arr;
        });
    }

    function draw() {
        const sky = ctx.createLinearGradient(0, 0, 0, H);
        sky.addColorStop(0, '#030406');
        sky.addColorStop(0.45, '#07090e');
        sky.addColorStop(0.80, '#0e1016');
        sky.addColorStop(1, '#14161d');
        ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

        drawCity();

        const LAKE_Y = H * 0.70;
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
                d.x += d.spd * dx;
                d.y += d.spd;
                if (d.y > LAKE_Y) {
                    if (Math.random() < 0.3) {
                        const yFrac = Math.pow(Math.random(), 1.5);
                        ripples.push({ x: d.x, yFrac: yFrac, r: 1, a: 0.45 });
                    }
                    Object.assign(d, spawnDrop(L));
                }
            });
        });

        drawRipples();
    }

    let paused = false;
    function syncPause() { paused = document.body.classList.contains('low-end-mode'); }
    new MutationObserver(syncPause).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    syncPause();

    function loop() { if (!paused) draw(); requestAnimationFrame(loop); }

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        buildCity();
        bakeReflection();
    }

    window.addEventListener('resize', () => { resize(); initDrops(); });
    resize();
    initDrops();
    loop();
})();
