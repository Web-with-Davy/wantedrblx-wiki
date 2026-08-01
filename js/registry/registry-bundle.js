// js/registry/registry-bundle.js
// Replaces all individual registry/*.js files when using data-bundle.js.
// All data variables are already defined in data-bundle.js — this file
// just assembles them into the window globals the app expects.
// No HTTP requests are made; all vars come from the pre-bundled data file.

(function assembleRegistry() {
    'use strict';

    function safe(fn) {
        try { fn(); } catch(e) { console.error('Registry bundle error:', e); }
    }

    // ----- ATMs & Vaults -----
    safe(() => {
        window.ATMS_AND_VAULTS_DATA = [
            ...(typeof ATMS_DATA !== 'undefined' ? ATMS_DATA : []),
            ...(typeof VAULTS_DATA !== 'undefined' ? VAULTS_DATA : []),
        ];
    });

    // ----- Contributors -----
    // Data vars: CONTRIBUTORS_CONTRIBUTORS, CONTRIBUTORS_MANAGERS, CONTRIBUTORS_STAFF
    safe(() => {
        window.CONTRIBUTORS_DATA = {
            contributors: typeof CONTRIBUTORS_CONTRIBUTORS !== 'undefined' ? CONTRIBUTORS_CONTRIBUTORS : [],
            managers:     typeof CONTRIBUTORS_MANAGERS    !== 'undefined' ? CONTRIBUTORS_MANAGERS    : [],
            staff:        typeof CONTRIBUTORS_STAFF       !== 'undefined' ? CONTRIBUTORS_STAFF       : [],
        };
    });

    // ----- Events -----
    // Data vars: EVENT_CHRISTMAS_2025, EVENT_EASTER_2026, EVENT_JULY_4TH_2026
    safe(() => {
        window.EVENTS_DATA = [
            ...(typeof EVENT_CHRISTMAS_2025 !== 'undefined' ? EVENT_CHRISTMAS_2025 : []),
            ...(typeof EVENT_EASTER_2026    !== 'undefined' ? EVENT_EASTER_2026    : []),
            ...(typeof EVENT_JULY_4TH_2026  !== 'undefined' ? EVENT_JULY_4TH_2026  : []),
        ];
    });

    // ----- Gun Crates -----
    // Data vars: GUN_CRATE_AK_47, GUN_CRATE_AUG_A1, etc.
    safe(() => {
        window.GUN_CRATES_DATA = [
            ...(typeof GUN_CRATE_AK_47        !== 'undefined' ? GUN_CRATE_AK_47        : []),
            ...(typeof GUN_CRATE_AUG_A1       !== 'undefined' ? GUN_CRATE_AUG_A1       : []),
            ...(typeof GUN_CRATE_AWM          !== 'undefined' ? GUN_CRATE_AWM          : []),
            ...(typeof GUN_CRATE_BENELLI_M1014 !== 'undefined' ? GUN_CRATE_BENELLI_M1014 : []),
            ...(typeof GUN_CRATE_GLOCK_18C    !== 'undefined' ? GUN_CRATE_GLOCK_18C    : []),
            ...(typeof GUN_CRATE_M4A1         !== 'undefined' ? GUN_CRATE_M4A1         : []),
            ...(typeof GUN_CRATE_RPG_7        !== 'undefined' ? GUN_CRATE_RPG_7        : []),
            ...(typeof GUN_CRATE_UMP_45       !== 'undefined' ? GUN_CRATE_UMP_45       : []),
            ...(typeof GUN_CRATE_UZI          !== 'undefined' ? GUN_CRATE_UZI          : []),
        ];
    });

    // ----- Missions -----
    // Data vars: MISSIONS_<GIVER>_<SLUG>  (e.g. MISSIONS_BERT_BANK_HEIST)
    safe(() => {
        const missionVars = Object.keys(window).filter(k => k.startsWith('MISSIONS_'));
        window.MISSIONS_DATA = missionVars.flatMap(k => {
            const v = window[k];
            return Array.isArray(v) ? v : [];
        });
    });

    // ----- NPCs -----
    // Data vars: NPC_BERT, NPC_CODY, NPC_DAN, NPC_DAVY, NPC_ERIK, NPC_JUSTIN, NPC_OFY, NPC_ROD, NPC_SIRB, NPC_SOFTY
    safe(() => {
        window.NPCS_DATA = [
            ...(typeof NPC_BERT   !== 'undefined' ? NPC_BERT   : []),
            ...(typeof NPC_CODY   !== 'undefined' ? NPC_CODY   : []),
            ...(typeof NPC_DAN    !== 'undefined' ? NPC_DAN    : []),
            ...(typeof NPC_DAVY   !== 'undefined' ? NPC_DAVY   : []),
            ...(typeof NPC_ERIK   !== 'undefined' ? NPC_ERIK   : []),
            ...(typeof NPC_JUSTIN !== 'undefined' ? NPC_JUSTIN : []),
            ...(typeof NPC_OFY    !== 'undefined' ? NPC_OFY    : []),
            ...(typeof NPC_ROD    !== 'undefined' ? NPC_ROD    : []),
            ...(typeof NPC_SIRB   !== 'undefined' ? NPC_SIRB   : []),
            ...(typeof NPC_SOFTY  !== 'undefined' ? NPC_SOFTY  : []),
        ];
    });

    // ----- Promo Codes -----
    // Data vars: PROMO_CODES_ACTIVE, PROMO_CODES_EXPIRED
    safe(() => {
        window.PROMO_CODES_DATA = [
            ...(typeof PROMO_CODES_ACTIVE  !== 'undefined' ? PROMO_CODES_ACTIVE  : []),
            ...(typeof PROMO_CODES_EXPIRED !== 'undefined' ? PROMO_CODES_EXPIRED : []),
        ];
    });

    // ----- Store -----
    // Data vars: STORE_BAG_BOOSTS, STORE_CASH, STORE_MONEY_PRINTERS, STORE_OTHER, STORE_PACKS
    safe(() => {
        window.STORE_DATA = [
            ...(typeof STORE_BAG_BOOSTS     !== 'undefined' ? STORE_BAG_BOOSTS     : []),
            ...(typeof STORE_CASH           !== 'undefined' ? STORE_CASH           : []),
            ...(typeof STORE_MONEY_PRINTERS !== 'undefined' ? STORE_MONEY_PRINTERS : []),
            ...(typeof STORE_OTHER          !== 'undefined' ? STORE_OTHER          : []),
            ...(typeof STORE_PACKS          !== 'undefined' ? STORE_PACKS          : []),
        ];
    });

    // ----- Valuables -----
    // Data vars: VALUABLES_ELECTRONICS, VALUABLES_GEMS, VALUABLES_JEWELRY, etc.
    // Seasonal variants are excluded from main list but exposed separately.
    safe(() => {
        const SEASONAL = new Set(['4TH_OF_JULY', 'CHRISTMAS', 'EASTER']);
        const valuableVars = Object.keys(window).filter(k => k.startsWith('VALUABLES_'));
        window.VALUABLES_DATA = valuableVars
            .filter(k => !SEASONAL.has(k.replace('VALUABLES_', '')))
            .flatMap(k => {
                const v = window[k];
                return Array.isArray(v) ? v : [];
            });

        window.EASTER_VALUABLES_DATA      = typeof VALUABLES_EASTER      !== 'undefined' ? VALUABLES_EASTER      : [];
        window.CHRISTMAS_VALUABLES_DATA   = typeof VALUABLES_CHRISTMAS   !== 'undefined' ? VALUABLES_CHRISTMAS   : [];
        window.FOURTH_OF_JULY_VALUABLES_DATA = typeof VALUABLES_4TH_OF_JULY !== 'undefined' ? VALUABLES_4TH_OF_JULY : [];
    });

    // ----- Vehicles -----
    // Data vars: VEHICLE_<NAME> (e.g. VEHICLE_RAZOR, VEHICLE_AK_47)
    safe(() => {
        const vehicleVars = Object.keys(window).filter(k => k.startsWith('VEHICLE_'));
        window.VEHICLES_DATA = vehicleVars.flatMap(k => {
            const v = window[k];
            return Array.isArray(v) ? v : [];
        });
    });

    // ----- Weapons -----
    // Data vars: WEAPON_<NAME> (e.g. WEAPON_AK_47, WEAPON_M9)
    // Categories are inferred from the first item's category property.
    safe(() => {
        const GUN_CATEGORIES = new Set(['Pistols', 'SMGs', 'Shotguns', 'Rifles', 'Snipers', 'Airdrop']);
        const weaponVars = Object.keys(window).filter(k => k.startsWith('WEAPON_'));
        const byCategory = {};

        weaponVars.forEach(k => {
            const data = window[k];
            if (!Array.isArray(data) || data.length === 0) return;
            const cat = (data[0] && data[0].category) ? data[0].category : 'Rifles';
            if (!byCategory[cat]) byCategory[cat] = [];
            byCategory[cat].push(...data);
        });

        window.GUNS_DATA = Object.entries(byCategory)
            .filter(([cat]) => GUN_CATEGORIES.has(cat))
            .flatMap(([, items]) => items);
        window.EQUIPMENT_DATA = byCategory['Equipment'] || [];
        window.EXPLOSIVES_DATA = byCategory['Explosives'] || [];
        window.TOOLS_DATA = byCategory['Tools'] || [];
    });

    // ----- Youtubers -----
    // Data vars: YOUTUBER_CREATOR_1, YOUTUBER_CREATOR_2, YOUTUBER_CREATOR_3, ...
    safe(() => {
        const ytVars = Object.keys(window).filter(k => k.startsWith('YOUTUBER_'));
        window.YOUTUBERS_DATA = ytVars.map(k => window[k]).filter(Boolean);
    });

})();
