const ITEM_PAGE_REGISTRY = {
  weapons: {
    label: 'WEAPONS', emoji: '🔫',
    getData: () => [...(window.GUNS_DATA || []), ...(window.EXPLOSIVES_DATA || []), ...(window.EQUIPMENT_DATA || [])],
    folder: 'weapons',
    renderDetails: renderWeaponDetails,
  },
  items: {
    label: 'ITEMS', emoji: '🧰',
    getData: () => window.ITEMS_DATA || [],
    folder: 'items',
    renderDetails: renderWeaponDetails,
  },
  vehicles: {
    label: 'VEHICLES', emoji: '🚗',
    getData: () => window.VEHICLES_DATA || [],
    folder: 'vehicles',
    renderDetails: renderVehicleDetails,
  },
  npcs: {
    label: 'NPCs', emoji: '👥',
    getData: () => window.NPCS_DATA || [],
    folder: 'npcs',
    renderDetails: renderNPCDetails,
  },
  missions: {
    label: 'MISSIONS', emoji: '📜',
    getData: () => window.MISSIONS_DATA || [],
    folder: 'missions',
    renderDetails: renderMissionDetails,
  },
  valuables: {
    label: 'VALUABLES', emoji: '💎',
    getData: () => [...(window.VALUABLES_DATA || []), ...(window.CHRISTMAS_VALUABLES_DATA || []), ...(window.FOURTH_OF_JULY_VALUABLES_DATA || []), ...(window.EASTER_VALUABLES_DATA || []), ...(window.HALLOWEEN_VALUABLES_DATA || [])],
    folder: 'valuables',
    renderDetails: renderValuableDetails,
  },
  locations: {
    label: 'LOCATIONS', emoji: '📍',
    getData: () => window.LOCATIONS_DATA || [],
    folder: 'locations',
    renderDetails: renderLocationDetails,
  },
  store: {
    label: 'STORE', emoji: '🛒',
    getData: () => window.STORE_DATA || [],
    folder: 'store',
    renderDetails: renderStoreDetails,
  },
  'gun-crates': {
    label: 'GUN CRATES', emoji: '📦',
    getData: () => window.GUN_CRATES_DATA || [],
    folder: 'crates',
    renderDetails: renderGunCrateDetails,
  },
  events: {
    label: 'EVENTS', emoji: '📅',
    getData: () => window.EVENTS_DATA || [],
    folder: 'events',
    renderDetails: renderEventDetails,
  },
  atms: {
    label: 'ATMs & VAULTS', emoji: '🏧',
    getData: () => window.ATMS_DATA || [],
    folder: 'atms',
    renderDetails: renderATMDetails,
  },
};

function _ipSlug(str) {
  if (typeof generateSlug === 'function') return generateSlug(str);
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function _findItem(category, id) {
  const reg = ITEM_PAGE_REGISTRY[category];
  if (!reg) return null;
  const data = reg.getData();
  return data.find(item => {
    const slug = item.id || _ipSlug(item.name || item.title || item.code || '');
    return slug === id;
  }) || null;
}

function _stat(label, value) {
  if (value === undefined || value === null || value === '' || value === '?') return '';
  return `
    <div class="val-stat">
      <span class="val-stat-label">${label}</span>
      <span class="val-stat-value">${value}</span>
    </div>`;
}

function _weaponDps(item) {
  if (!(window.GUNS_DATA || []).includes(item)) return null;

  const stats = item.stats || {};
  const roundsPerMinute = Number(stats.firerate);
  if (!Number.isFinite(roundsPerMinute) || roundsPerMinute <= 0) return [];
  const secondsPerShot = 60 / roundsPerMinute;
  const pelletsPerShot = Number(stats.pellets) > 0 ? Number(stats.pellets) : 1;
  const magazineSize = Number(String(stats.ammo || '').match(/^\s*(\d+)/)?.[1]);
  const reloadSeconds = Number(stats.reload);

  const damage = String(stats.damage || '');
  const labeledDamage = [...damage.matchAll(/(Head|Torso|Limbs?)-(\d+(?:\.\d+)?)/gi)];
  const damageValues = labeledDamage.length
    ? labeledDamage.map(([, part, value]) => [part, Number(value)])
    : damage.match(/^\s*(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*$/)
      ?.slice(1).map((value, index) => [['Head', 'Torso', 'Limbs'][index], Number(value)]);

  if (!damageValues || !damageValues.length) return null;

  const parts = damageValues.map(([part, damage]) => {
    const damagePerShot = damage * pelletsPerShot;
    const shotsToKill = damagePerShot > 0 ? Math.ceil(200 / damagePerShot) : Infinity;
    const reloads = Number.isFinite(shotsToKill) && Number.isFinite(magazineSize) && magazineSize > 0
      ? Math.floor((shotsToKill - 1) / magazineSize)
      : 0;
    const reloadDelay = Number.isFinite(reloadSeconds) && reloadSeconds > 0
      ? Math.max(0, reloadSeconds - secondsPerShot)
      : 0;
    return {
      part,
      dps: damagePerShot / secondsPerShot,
      shotsToKill,
      pelletsToKill: shotsToKill * pelletsPerShot,
      ttk: Number.isFinite(shotsToKill)
        ? Math.max(0, shotsToKill - 1) * secondsPerShot + reloads * reloadDelay
        : Infinity,
      reloads,
      reloadTime: reloads * (Number.isFinite(reloadSeconds) && reloadSeconds > 0 ? reloadSeconds : 0),
    };
  });

  return {
    parts,
    averageDps: parts.reduce((total, part) => total + part.dps, 0) / parts.length,
    averageTtk: parts.reduce((total, part) => total + part.ttk, 0) / parts.length,
  };
}

function _section(title, bodyHtml) {
  if (!bodyHtml || !bodyHtml.trim()) return '';
  const match = title.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji})\s*(.*)$/u);
  let finalTitle = title;
  if (match) {
    finalTitle = `<span class="ip-emoji">${match[1]}</span> ${match[2]}`;
  }
  return `
    <div class="ip-section sidebar-box">
      <div class="ip-section-header">${finalTitle}</div>
      <div class="ip-section-body">${bodyHtml}</div>
    </div>`;
}

function _descBlock(text) {
  if (!text) return '';
  return `<div class="ip-desc-block sidebar-box">${text}</div>`;
}

function renderWeaponDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);
  const dpsStats = _weaponDps(item);
  const roundsPerMinute = Number(item.stats && item.stats.firerate);
  const fireRateDisplay = Number.isFinite(roundsPerMinute) && roundsPerMinute > 0
    ? `${roundsPerMinute} RPM / 1 bullet every ${(60 / roundsPerMinute).toFixed(2)}s`
    : item.stats && item.stats.firerate;
  const dpsHtml = dpsStats && dpsStats.parts.length ? `
    <div class="val-stat weapon-dps-stat">
      <span class="val-stat-label">Damage Per Second / Time To Kill (200 HP)</span>
      <div class="weapon-dps-grid">
        ${dpsStats.parts.map(({ part, dps, shotsToKill, pelletsToKill, ttk, reloads, reloadTime }) => `
          <div class="weapon-dps-part">
            <span>${part}</span>
            <strong>${dps.toFixed(1)} DPS</strong>
            <small>${Number.isFinite(ttk)
              ? `${shotsToKill} shot${shotsToKill === 1 ? '' : 's'}${pelletsToKill !== shotsToKill ? ` / ${pelletsToKill} pellets` : ''} to kill · ${ttk.toFixed(2)}s TTK${reloads ? ` · ${reloads} reload${reloads === 1 ? '' : 's'} (${reloadTime.toFixed(2)}s)` : ''}`
              : 'No damage'}</small>
          </div>`).join('')}
      </div>
      <div class="weapon-dps-average">
        <span>Average DPS <strong>${dpsStats.averageDps.toFixed(1)}</strong></span>
        <span>Average TTK <strong>${Number.isFinite(dpsStats.averageTtk) ? `${dpsStats.averageTtk.toFixed(2)}s` : 'N/A'}</strong></span>
      </div>
    </div>` : '';

  const printerStats = item.printerStats;
  const printerYieldHtml = printerStats ? (() => {
    const cashChanceTotal = printerStats.cashOutcomes.reduce((total, outcome) => total + outcome.chance, 0);
    const printChanceTotal = printerStats.printOutcomes.reduce((total, outcome) => total + outcome.chance, 0);
    const averageCash = printerStats.cashOutcomes.reduce((total, outcome) => total + outcome.amount * outcome.chance, 0) / cashChanceTotal;
    const averagePrints = printerStats.printOutcomes.reduce((total, outcome) => total + outcome.count * outcome.chance, 0) / printChanceTotal;
    const expectedLifetimeCash = averageCash * averagePrints;
    const expectedRuntime = averagePrints * printerStats.intervalSeconds;
    const oddsRows = (outcomes, valueKey, valueFormatter) => outcomes.map(outcome => {
      const chance = Number.isInteger(outcome.chance) ? outcome.chance.toFixed(1) : outcome.chance;
      return `<tr><td>${valueFormatter(outcome[valueKey])}</td><td>${chance}%</td></tr>`;
    }).join('');

    return `
      <div class="weapon-dps-stat printer-yield-stat">
        <span class="val-stat-label">Money Printer Yield</span>
        <div class="printer-yield-summary">
          <div><span>Print interval</span><strong>${printerStats.intervalSeconds}s</strong></div>
          <div><span>Average prints before breaking</span><strong>${averagePrints.toFixed(1)}</strong></div>
          <div><span>Average cash per printer</span><strong>${f(Math.round(expectedLifetimeCash))}</strong></div>
          <div><span>Average operating time</span><strong>${(expectedRuntime / 60).toFixed(1)} min</strong></div>
        </div>
        <div class="printer-odds-grid">
          <div>
            <h4>Cash per print</h4>
            <table class="printer-odds-table"><tbody>${oddsRows(printerStats.cashOutcomes, 'amount', amount => f(amount))}</tbody></table>
            <small>Listed odds total ${cashChanceTotal.toFixed(2)}%; normalized for expected value.</small>
          </div>
          <div>
            <h4>Prints before breaking</h4>
            <table class="printer-odds-table"><tbody>${oddsRows(printerStats.printOutcomes, 'count', count => count)}</tbody></table>
            <small>Listed odds total ${printChanceTotal.toFixed(2)}%; normalized for expected value.</small>
          </div>
        </div>
      </div>`;
  })() : '';

  const possibleDropsHtml = Array.isArray(item.possibleDrops) ? `
    <div class="weapon-dps-stat printer-yield-stat">
      <span class="val-stat-label">Possible Item Drops</span>
      <table class="printer-odds-table">
        <thead><tr><th>Item</th><th>Drop chance</th></tr></thead>
        <tbody>${item.possibleDrops.map(drop => `<tr><td>${drop}</td><td>Unknown</td></tr>`).join('')}</tbody>
      </table>
    </div>` : '';

  const statsHtml = [
    _stat('Category', item.category),
    _stat('Obtaining', item.obtaining),
    _stat('Location', item.location || (item.stats && item.stats.location)),
    _stat('Buy Price', f(item.contractPrice)),
    _stat('Re-Buy Price', f(item.reBuyPrice)),
    _stat('Sell Price', f(item.sellPrice)),
    _stat('Ammo', item.stats && item.stats.ammo),
    _stat('Pellets Per Shot', item.stats && item.stats.pellets),
    _stat('Ammo Cost', item.stats && item.stats.ammoPrice),
    _stat('Damage', item.stats && item.stats.damage),
    _stat('Fire Rate', fireRateDisplay),
    _stat('Reload Speed', item.stats && item.stats.reload ? `${item.stats.reload}s` : null),
    _stat('Accuracy', item.stats && item.stats.accuracy),
    dpsHtml,
    printerYieldHtml,
    possibleDropsHtml,
  ].join('');

  let attachmentsHtml = '';
  const hasAtt = item.attachments && Object.keys(item.attachments).length > 0;
  if (hasAtt) {
    const attGroups = Object.entries(item.attachments).map(([cat, items]) => {
      if (!items || !items.length) return '';
      const rows = items.map(att => 
        _stat(
          att.name, 
          att.price === 0 ? '<span style="color: rgba(255,255,255,0.5); font-style: italic;">Free</span>' : f(att.price)
        )
      ).join('');
      return `<div class="ip-att-group">
        <div class="ip-att-cat">${cat}</div>
        ${rows}
      </div>`;
    }).join('');
    attachmentsHtml = attGroups;
  }

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Stats', statsHtml)}
    ${hasAtt ? _section('🔧 Attachments', attachmentsHtml) : ''}
  `;
}

const VEHICLE_UPGRADE_BONUSES = {
  Muscle: {
    engine: {
      street: { label: 'Street', topSpeed: 1, acceleration: 0.3 },
      sport: { label: 'Sport', topSpeed: 1.9, acceleration: 0.6 },
      race: { label: 'Race', topSpeed: 3.9, acceleration: 0.9 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 0.5 },
      sport: { label: 'Sport', acceleration: 1.2 },
      race: { label: 'Race', acceleration: 2.5 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.6 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.2 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 3.1 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.7 },
      sport: { label: 'Sport', braking: 6.6 },
      race: { label: 'Race', braking: 13.3 },
    },
    armor: {
      light: { label: 'Light', body: 300, armor: 1 },
      medium: { label: 'Medium', body: 400, armor: 2 },
      heavy: { label: 'Heavy', body: 500, armor: 3 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  Sport: {
    engine: {
      street: { label: 'Street', topSpeed: 2.7, acceleration: 0.7 },
      sport: { label: 'Sport', topSpeed: 5.3, acceleration: 1.5 },
      race: { label: 'Race', topSpeed: 10.6, acceleration: 2.2 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 1.1 },
      sport: { label: 'Sport', acceleration: 2.9 },
      race: { label: 'Race', acceleration: 5.8 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.7 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.5 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 3.6 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.9 },
      sport: { label: 'Sport', braking: 7.2 },
      race: { label: 'Race', braking: 14.3 },
    },
    armor: {
      light: { label: 'Light', body: 300, armor: 1 },
      medium: { label: 'Medium', body: 400, armor: 2 },
      heavy: { label: 'Heavy', body: 500, armor: 3 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  Super: {
    engine: {
      street: { label: 'Street', topSpeed: 5.6, acceleration: 1.9 },
      sport: { label: 'Sport', topSpeed: 11.1, acceleration: 3.9 },
      race: { label: 'Race', topSpeed: 22.3, acceleration: 5.8 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 2.9 },
      sport: { label: 'Sport', acceleration: 7.7 },
      race: { label: 'Race', acceleration: 15.4 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 1.3 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 2.6 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 6.4 },
    },
    brakes: {
      street: { label: 'Street', braking: 3.8 },
      sport: { label: 'Sport', braking: 9.5 },
      race: { label: 'Race', braking: 18.9 },
    },
    armor: {
      light: { label: 'Light', body: 375, armor: 1 },
      medium: { label: 'Medium', body: 500, armor: 2 },
      heavy: { label: 'Heavy', body: 625, armor: 3 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  Sedan: {
    engine: {
      street: { label: 'Street', topSpeed: 0.9, acceleration: 0.3 },
      sport: { label: 'Sport', topSpeed: 1.8, acceleration: 0.6 },
      race: { label: 'Race', topSpeed: 3.7, acceleration: 0.9 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 0.4 },
      sport: { label: 'Sport', acceleration: 1.2 },
      race: { label: 'Race', acceleration: 2.4 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.6 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.2 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 3 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.5 },
      sport: { label: 'Sport', braking: 6.3 },
      race: { label: 'Race', braking: 12.6 },
    },
    armor: {
      light: { label: 'Light', body: 300, armor: 1 },
      medium: { label: 'Medium', body: 400, armor: 2 },
      heavy: { label: 'Heavy', body: 500, armor: 3 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  'L-Sedan': {
    engine: {
      street: { label: 'Street', topSpeed: 1.7, acceleration: 0.5 },
      sport: { label: 'Sport', topSpeed: 3.5, acceleration: 1.1 },
      race: { label: 'Race', topSpeed: 6.9, acceleration: 1.6 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 0.8 },
      sport: { label: 'Sport', acceleration: 2.1 },
      race: { label: 'Race', acceleration: 4.2 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.7 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.4 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 3.5 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.8 },
      sport: { label: 'Sport', braking: 7 },
      race: { label: 'Race', braking: 14 },
    },
    armor: {
      light: { label: 'Light', body: 300, armor: 1 },
      medium: { label: 'Medium', body: 400, armor: 2 },
      heavy: { label: 'Heavy', body: 500, armor: 3 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  SUV: {
    engine: {
      street: { label: 'Street', topSpeed: 0.8, acceleration: 0.3 },
      sport: { label: 'Sport', topSpeed: 1.6, acceleration: 0.6 },
      race: { label: 'Race', topSpeed: 3.3, acceleration: 0.9 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 0.5 },
      sport: { label: 'Sport', acceleration: 1.2 },
      race: { label: 'Race', acceleration: 2.4 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.6 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.2 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 3.1 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.3 },
      sport: { label: 'Sport', braking: 5.8 },
      race: { label: 'Race', braking: 11.6 },
    },
    armor: {
      light: { label: 'Light', body: 600, armor: 3 },
      medium: { label: 'Medium', body: 800, armor: 4 },
      heavy: { label: 'Heavy', body: 1000, armor: 5 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  'L-SUV': {
    engine: {
      street: { label: 'Street', topSpeed: 1.5, acceleration: 0.4 },
      sport: { label: 'Sport', topSpeed: 3.1, acceleration: 0.8 },
      race: { label: 'Race', topSpeed: 6.1, acceleration: 1.3 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 0.6 },
      sport: { label: 'Sport', acceleration: 1.7 },
      race: { label: 'Race', acceleration: 3.3 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.6 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.1 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 2.8 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.3 },
      sport: { label: 'Sport', braking: 5.8 },
      race: { label: 'Race', braking: 11.6 },
    },
    armor: {
      light: { label: 'Light', body: 750, armor: 4 },
      medium: { label: 'Medium', body: 1000, armor: 5 },
      heavy: { label: 'Heavy', body: 1250, armor: 6 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  Truck: {
    engine: {
      street: { label: 'Street', topSpeed: 0.8, acceleration: 0.3 },
      sport: { label: 'Sport', topSpeed: 1.5, acceleration: 0.6 },
      race: { label: 'Race', topSpeed: 3, acceleration: 0.9 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 0.4 },
      sport: { label: 'Sport', acceleration: 1.2 },
      race: { label: 'Race', acceleration: 2.4 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.6 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.2 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 2.9 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.2 },
      sport: { label: 'Sport', braking: 5.5 },
      race: { label: 'Race', braking: 11.1 },
    },
    armor: {
      light: { label: 'Light', body: 450, armor: 1 },
      medium: { label: 'Medium', body: 600, armor: 2 },
      heavy: { label: 'Heavy', body: 750, armor: 3 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  'L-SUT': {
    engine: {
      street: { label: 'Street', topSpeed: 2.2, acceleration: 0.6 },
      sport: { label: 'Sport', topSpeed: 4.4, acceleration: 1.2 },
      race: { label: 'Race', topSpeed: 8.8, acceleration: 1.8 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 0.9 },
      sport: { label: 'Sport', acceleration: 2.4 },
      race: { label: 'Race', acceleration: 4.9 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.6 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.2 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 3.1 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.5 },
      sport: { label: 'Sport', braking: 6.3 },
      race: { label: 'Race', braking: 12.6 },
    },
    armor: {
      light: { label: 'Light', body: 1125, armor: 4 },
      medium: { label: 'Medium', body: 1500, armor: 5 },
      heavy: { label: 'Heavy', body: 1875, armor: 6 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  Cruiser: {
    engine: {
      street: { label: 'Street', topSpeed: 0.9, acceleration: 0.4 },
      sport: { label: 'Sport', topSpeed: 1.8, acceleration: 0.8 },
      race: { label: 'Race', topSpeed: 3.6, acceleration: 1.1 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 0.6 },
      sport: { label: 'Sport', acceleration: 1.5 },
      race: { label: 'Race', acceleration: 3 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.8 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.5 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 3.8 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.7 },
      sport: { label: 'Sport', braking: 6.8 },
      race: { label: 'Race', braking: 13.7 },
    },
    armor: {
      light: { label: 'Light', body: 300, armor: 1 },
      medium: { label: 'Medium', body: 400, armor: 2 },
      heavy: { label: 'Heavy', body: 500, armor: 3 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  'Off-Road': {
    engine: {
      street: { label: 'Street', topSpeed: 0.6, acceleration: 0.4 },
      sport: { label: 'Sport', topSpeed: 1.3, acceleration: 0.7 },
      race: { label: 'Race', topSpeed: 2.6, acceleration: 1.1 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 0.5 },
      sport: { label: 'Sport', acceleration: 1.4 },
      race: { label: 'Race', acceleration: 2.9 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.7 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.4 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 3.6 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.3 },
      sport: { label: 'Sport', braking: 5.8 },
      race: { label: 'Race', braking: 11.6 },
    },
    armor: {
      light: { label: 'Light', body: 300, armor: 1 },
      medium: { label: 'Medium', body: 400, armor: 2 },
      heavy: { label: 'Heavy', body: 500, armor: 3 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  Tactical: {
    engine: {
      street: { label: 'Street', topSpeed: 2.3, acceleration: 0.6 },
      sport: { label: 'Sport', topSpeed: 4.7, acceleration: 1.3 },
      race: { label: 'Race', topSpeed: 9.4, acceleration: 1.9 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 1 },
      sport: { label: 'Sport', acceleration: 2.7 },
      race: { label: 'Race', acceleration: 5.3 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.7 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.3 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 3.3 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.6 },
      sport: { label: 'Sport', braking: 6.6 },
      race: { label: 'Race', braking: 13.2 },
    },
    armor: {
      light: { label: 'Light', body: 2250, armor: 1 },
      medium: { label: 'Medium', body: 3000, armor: 2 },
      heavy: { label: 'Heavy', body: 3750, armor: 3 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 750 },
      reinforced: { label: 'Reinforced', wheels: 1500 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 1050 },
      reinforced: { label: 'Reinforced', windows: 2100 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
  Roadster: {
    engine: {
      street: { label: 'Street', topSpeed: 1, acceleration: 0.3 },
      sport: { label: 'Sport', topSpeed: 1.9, acceleration: 0.6 },
      race: { label: 'Race', topSpeed: 3.9, acceleration: 0.9 },
    },
    transmission: {
      street: { label: 'Street', acceleration: 0.4 },
      sport: { label: 'Sport', acceleration: 1.2 },
      race: { label: 'Race', acceleration: 2.4 },
    },
    aspiration: {
      turbo: { label: 'Turbo Charger', acceleration: 0.6 },
      twinTurbo: { label: 'Twin Turbo', acceleration: 1.2 },
      quadTurbo: { label: 'Quad Turbo', acceleration: 3 },
    },
    brakes: {
      street: { label: 'Street', braking: 2.6 },
      sport: { label: 'Sport', braking: 6.5 },
      race: { label: 'Race', braking: 13.1 },
    },
    armor: {
      light: { label: 'Light', body: 300, armor: 1 },
      medium: { label: 'Medium', body: 400, armor: 2 },
      heavy: { label: 'Heavy', body: 500, armor: 3 },
    },
    tires: {
      upgraded: { label: 'Upgraded', wheels: 150 },
      reinforced: { label: 'Reinforced', wheels: 300 },
      bulletProof: { label: 'Bullet Proof', wheels: Infinity },
    },
    windows: {
      upgraded: { label: 'Upgraded', windows: 150 },
      reinforced: { label: 'Reinforced', windows: 300 },
      bulletProof: { label: 'Bullet Proof', windows: Infinity },
    },
  },
};

const SUPER_CAR_UPGRADES = VEHICLE_UPGRADE_BONUSES;

function getVehicleUpgradeConfig(item) {
  if (!item || item.type !== 'ground' || item.category !== 'Car') return null;
  const vehicleType = item.stats && item.stats.vehicleType;
  if (!vehicleType) return null;
  return VEHICLE_UPGRADE_BONUSES[vehicleType] || null;
}

function renderSuperCarUpgrades(item) {
  const stats = item.stats || {};
  const vehicleType = stats.vehicleType || item.name || 'Vehicle';
  const upgradeSet = getVehicleUpgradeConfig(item);
  if (!upgradeSet) return '';

  const healthValues = Object.fromEntries(
    [...String(stats.Health || '').matchAll(/(Body|Wheels|Windows)-(\d+|∞)/g)]
      .map(([, stat, value]) => [stat.toLowerCase(), value === '∞' ? Infinity : Number(value)])
  );
  const slug = _ipSlug(item.id || item.name);
  const baseValues = {
    topSpeed: Number(stats.topSpeed),
    acceleration: Number(stats.acceleration),
    braking: Number(stats.braking),
    body: healthValues.body,
    wheels: healthValues.wheels,
    windows: healthValues.windows,
    armor: Number(stats.armor),
  };
  const baseAttributes = Object.entries(baseValues)
    .map(([stat, value]) => {
      const attributeStat = stat.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      return `data-base-${attributeStat}="${Number.isFinite(value) ? value : ''}"`;
    })
    .join(' ');
  const categories = [
    ['engine', 'Engine', ['street', 'sport', 'race']],
    ['transmission', 'Transmission', ['street', 'sport', 'race']],
    ['aspiration', 'Aspiration', ['turbo', 'twinTurbo', 'quadTurbo']],
    ['brakes', 'Brakes', ['street', 'sport', 'race']],
    ['armor', 'Armor', ['light', 'medium', 'heavy']],
    ['tires', 'Tires', ['upgraded', 'reinforced', 'bulletProof']],
    ['windows', 'Windows', ['upgraded', 'reinforced', 'bulletProof']],
  ];
  const controls = categories.map(([category, label, keys]) => `
    <label class="ip-upgrade-control">
      <span>${label}</span>
      <select aria-label="${label} upgrade" data-upgrade-category="${category}" onchange="updateSuperCarUpgrades(this)">
        <option value="stock">Stock</option>
        ${keys.map(key => `<option value="${key}">${upgradeSet[category][key].label}</option>`).join('')}
      </select>
    </label>`).join('');

  const performanceRows = ['topSpeed', 'acceleration', 'braking'].map(stat => `
    <div class="ip-upgrade-result">
      <span>${{ topSpeed: 'Top Speed', acceleration: 'Acceleration', braking: 'Braking' }[stat]}</span>
      <strong><output data-rounded-result="${stat}">${Number.isFinite(baseValues[stat]) ? `${Math.ceil(baseValues[stat])}%` : '—'}</output></strong>
      <small>Exact: <output data-exact-result="${stat}">${Number.isFinite(baseValues[stat]) ? `${baseValues[stat]}%` : '—'}</output></small>
    </div>`).join('');
  const healthRows = ['body', 'armor', 'wheels', 'windows'].map(stat => `
    <div class="ip-upgrade-result">
      <span>${{ body: 'Body', armor: 'Armor', wheels: 'Wheels', windows: 'Windows' }[stat]}</span>
      <strong><output data-health-result="${stat}">${Number.isFinite(baseValues[stat]) ? baseValues[stat] : '—'}</output></strong>
    </div>`).join('');

  return _section('🛠 Vehicle Upgrades', `
    <div class="ip-super-upgrades" data-super-upgrade-panel data-vehicle-type="${vehicleType}" ${baseAttributes}>
      <div class="ip-upgrade-controls">${controls}</div>
      <div class="ip-upgrade-results" aria-live="polite">
        <div class="ip-upgrade-result-heading">Performance</div>
        ${performanceRows}
        <div class="ip-upgrade-result-heading">Health</div>
        ${healthRows}
      </div>
      <p class="ip-upgrade-note">Bonuses add to the listed base stats. The in-game estimate rounds percentage stats up to the next whole number.</p>
    </div>`);
}

function updateSuperCarUpgrades(select) {
  const panel = select.closest('[data-super-upgrade-panel]');
  if (!panel) return;

  const vehicleType = panel.dataset.vehicleType;
  const vehicleUpgradeSet = VEHICLE_UPGRADE_BONUSES[vehicleType] || null;
  if (!vehicleUpgradeSet) return;

  const selected = Object.fromEntries([...panel.querySelectorAll('[data-upgrade-category]')]
    .map(control => [control.dataset.upgradeCategory, control.value]));
  const performanceBonus = { topSpeed: 0, acceleration: 0, braking: 0 };
  for (const category of ['engine', 'transmission', 'aspiration', 'brakes']) {
    const upgrade = vehicleUpgradeSet[category][selected[category]];
    if (!upgrade) continue;
    for (const stat of Object.keys(performanceBonus)) performanceBonus[stat] += upgrade[stat] || 0;
  }

  for (const stat of Object.keys(performanceBonus)) {
    const base = Number(panel.dataset[`base${stat[0].toUpperCase()}${stat.slice(1)}`]);
    const exactOutput = panel.querySelector(`[data-exact-result="${stat}"]`);
    const roundedOutput = panel.querySelector(`[data-rounded-result="${stat}"]`);
    if (!Number.isFinite(base)) continue;
    const exact = base + performanceBonus[stat];
    exactOutput.textContent = `${Number(exact.toFixed(1))}%`;
    roundedOutput.textContent = `${Math.ceil(exact)}%`;
  }

  const armorUpgrade = vehicleUpgradeSet.armor[selected.armor];
  const tireUpgrade = vehicleUpgradeSet.tires[selected.tires];
  const windowUpgrade = vehicleUpgradeSet.windows[selected.windows];
  const healthValues = {
    body: armorUpgrade?.body ?? Number(panel.dataset.baseBody),
    armor: armorUpgrade?.armor ?? Number(panel.dataset.baseArmor),
    wheels: tireUpgrade?.wheels ?? Number(panel.dataset.baseWheels),
    windows: windowUpgrade?.windows ?? Number(panel.dataset.baseWindows),
  };
  for (const [stat, value] of Object.entries(healthValues)) {
    const output = panel.querySelector(`[data-health-result="${stat}"]`);
    if (output && (Number.isFinite(value) || value === Infinity)) output.textContent = value === Infinity ? '∞' : value;
  }
}
window.updateSuperCarUpgrades = updateSuperCarUpgrades;

function renderVehicleDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);
  const isFlying = item.type === 'flying';
  const vehicleType = item.stats && item.stats.vehicleType;
  const upgradeConfig = getVehicleUpgradeConfig(item);
  const isUpgradeEligible = Boolean(upgradeConfig);

  const statsHtml = [
    _stat('Class', vehicleType),
    _stat('Type', item.type ? (item.type.charAt(0).toUpperCase() + item.type.slice(1)) : null),
    _stat('Category', item.category),
    _stat('Obtaining', item.obtaining),
    _stat('Seats', item.stats && item.stats.seats != null ? String(item.stats.seats) : null),
    _stat('Buy Price', f(item.contractPrice)),
    _stat('Repair Price', f(item.repairPrice)),
    _stat('Garage Repair', f(item.repairPriceGarage)),
    isUpgradeEligible ? '' : _stat('Top Speed', item.stats && item.stats.topSpeed != null ? `${item.stats.topSpeed}%` : null),
    isFlying
      ? _stat('Spool Time', item.stats && item.stats.spoolTime != null ? `${item.stats.spoolTime}s` : null)
      : isUpgradeEligible ? '' : _stat('Acceleration', item.stats && item.stats.acceleration != null ? `${item.stats.acceleration}%` : null),
    isFlying
      ? _stat('Handling', item.stats && item.stats.handling != null ? `${item.stats.handling}%` : null)
      : isUpgradeEligible ? '' : _stat('Braking', item.stats && item.stats.braking != null ? `${item.stats.braking}%` : null),
    isUpgradeEligible ? '' : _stat('Health', item.stats && item.stats.Health),
    isUpgradeEligible ? '' : _stat('Armor', item.stats && item.stats.armor != null ? String(item.stats.armor) : null),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Stats', statsHtml)}
    ${isUpgradeEligible ? renderSuperCarUpgrades(item) : ''}
  `;
}

function renderNPCDetails(item) {
  const statsHtml = [
    _stat('Team', item.team),
    _stat('Location', item.location),
  ].join('');

  let dialogueHtml = '';
  if (item.dialogue && Object.keys(item.dialogue).length > 0) {
    const groups = Object.entries(item.dialogue).map(([cat, lines]) => {
      if (!lines || !lines.length) return '';
      const lineRows = lines.map(d =>
        `<div class="ip-dialogue-line">
          ${d.title ? `<span class="ip-dialogue-title">${d.title}</span>` : ''}
          <span class="ip-dialogue-text">${d.dialogue}</span>
        </div>`
      ).join('');
      return `<div class="ip-dialogue-group">
        <div class="ip-att-cat">${cat}</div>
        ${lineRows}
      </div>`;
    }).join('');
    dialogueHtml = `<div class="ip-dialogues">${groups}</div>`;
  }

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
    ${item.dialogue ? _section('💬 Dialogues', dialogueHtml) : ''}
  `;
}

function renderMissionDetails(item) {
  const f = typeof formatReward === 'function' ? formatReward : (r => JSON.stringify(r));
  const rewardStr = (item.rewards || []).map(f).join(', ');

  const statsHtml = [
    _stat('Mission Type', item.missionType),
    _stat('Difficulty', item.difficulty),
    _stat('Location', item.location),
    rewardStr ? _stat('Rewards', rewardStr) : '',
  ].join('');

  const howToHtml = item.howToComplete
    ? `<div class="ip-how-to">${item.howToComplete}</div>` : '';

  let tipsHtml = '';
  if (item.tipsAndInfo) {
    const tips = Array.isArray(item.tipsAndInfo) ? item.tipsAndInfo : [item.tipsAndInfo];
    tipsHtml = tips.map(t => `<div class="ip-tip">💡 ${t}</div>`).join('');
  }

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Mission Info', statsHtml)}
    ${item.howToComplete ? _section('📋 How to Complete', howToHtml) : ''}
    ${tipsHtml ? _section('💡 Tips & Info', tipsHtml) : ''}
  `;
}

function renderValuableDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);
  const perKg = (item.weight > 0 && typeof item.price === 'number')
    ? `${Math.round(item.price / item.weight).toLocaleString()} $/kg` : null;

  const statsHtml = [
    _stat('Category', item.category),
    _stat('Rarity', item.rarity),
    _stat('Sell Price', f(item.price) || '—'),
    _stat('Weight', item.weight != null ? `${item.weight} kg` : null),
    _stat('Value per kg', perKg),
    _stat('Location', item.commonLocation),
    item.priceNonContract ? _stat('Note', 'Non-Contract item') : '',
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
  `;
}

function renderLocationDetails(item) {
  const statsHtml = [
    _stat('Type', item.type),
    _stat('District', item.district),
    _stat('Notable', item.notable),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
  `;
}

function renderStoreDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);
  const statsHtml = [
    _stat('Category', item.category),
    _stat('Price', f(item.price)),
    _stat('Location', item.location),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
  `;
}

function renderGunCrateDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);
  const statsHtml = [
    _stat('Location', item.location),
    _stat('Contents', item.gun),
    _stat('Cooldown', item.cooldown),
    _stat('Price', f(item.price) || f(item.contractPrice)),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
  `;
}

function renderEventDetails(item) {
  const statsHtml = [
    _stat('Date', item.date),
    _stat('Type', item.type),
    _stat('Rewards', item.rewards),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
    ${item.howToComplete ? _section('📋 How to Complete', `<div class="ip-how-to">${item.howToComplete}</div>`) : ''}
  `;
}

function renderATMDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);
  const statsHtml = [
    _stat('Type', item.type),
    _stat('Location', item.location),
    _stat('Cash Limit', f(item.cashLimit) || item.cashLimit),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
  `;
}

function loadItemPage(category, id, returnTab) {
  const back = returnTab || category;
  const url = window.location.protocol === 'file:'
    ? `${window.location.pathname}#item/${encodeURIComponent(category)}/${encodeURIComponent(id)}`
    : `/item/${category}/${id}/`;
  window.history.pushState({ itemPage: true, category, id, back }, '', url);
  _renderItemPage(category, id, back);
}
window.loadItemPage = loadItemPage;

function _renderItemPage(category, id, back) {
  const container = document.getElementById('page-container');
  if (!container) return;

  const isLowEnd = document.body.classList.contains('low-end-mode');

  if (!isLowEnd) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';
  }

  setTimeout(() => {
    const reg = ITEM_PAGE_REGISTRY[category];
    const item = _findItem(category, id);

    if (!reg || !item) {
      container.innerHTML = `
        <div class="ip-not-found">
          <h2>ITEM NOT FOUND</h2>
          <p>Could not find <strong>${id}</strong> in <strong>${category}</strong>.</p>
          <button class="ip-back-btn" onclick="loadPage('${back}')">← Back to ${(reg && reg.label) || back.toUpperCase()}</button>
        </div>`;
      if (!isLowEnd) { container.style.opacity = '1'; container.style.transform = 'translateY(0)'; }
      return;
    }

    const name = item.name || item.title || item.code || id;
    const slug = item.id || _ipSlug(name);
    const imgSlug = item.image || slug;
    const ext = reg.ext || 'webp';
    const imgSrc = assetUrl(reg.folder ? `images/${reg.folder}/${imgSlug}.${ext}` : `images/${imgSlug}.${ext}`);

    const rarityKey = item.rarity || item.difficulty || item.team || null;
    const rarityData = rarityKey
      ? ((typeof RARITIES !== 'undefined' && RARITIES[rarityKey]) ||
        (typeof DIFFICULTIES !== 'undefined' && DIFFICULTIES[rarityKey]) ||
        (typeof TEAMS !== 'undefined' && TEAMS[rarityKey]) || null)
      : null;
    const rarityName = rarityData ? rarityData.name : (rarityKey || '');
    const rarityClass = rarityData ? rarityData.class : '';

    const detailHtml = reg.renderDetails ? reg.renderDetails(item) : '';

    container.innerHTML = `
      <div class="ip-wrap">

        <!-- Breadcrumb -->
        <div class="ip-breadcrumb">
          <button class="ip-back-btn" onclick="loadPage('${back}')">
            ← ${reg.emoji} ${reg.label}
          </button>
          <span class="ip-breadcrumb-sep">/</span>
          <span class="ip-breadcrumb-current">${name}</span>
        </div>

        <!-- Hero -->
        <div class="ip-hero sidebar-box">
          <div class="ip-hero-img-wrap">
            <img
              src="${imgSrc}"
              alt="${name}"
              class="ip-hero-img"
              onerror="this.onerror=null;this.src='${assetUrl('images/logo.webp')}';this.classList.add('ip-img-fallback');"
            >
            ${rarityName ? `<span class="val-rarity-tag ${rarityClass}">${rarityName}</span>` : ''}
          </div>
          <div class="ip-hero-info">
            <h2 class="ip-title">${name}</h2>
          </div>
        </div>

        <!-- Detail body -->
        <div class="ip-body">
          ${detailHtml || '<p class="ip-empty">No additional details available.</p>'}
        </div>

      </div>
    `;

    if (!isLowEnd) {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }
  }, isLowEnd ? 0 : 120);
}

function _handleItemPageHash(route) {
  const match = route.match(/^item\/([^/]+)\/(.+)$/);
  if (!match) return false;
  const [, category, id] = match;
  _renderItemPage(category, id, category);
  return true;
}
window._handleItemPageHash = _handleItemPageHash;

function _handleItemPagePath(pathname = window.location.pathname) {
  const match = pathname.match(/^\/item\/([^/]+)\/([^/]+)\/?$/);
  if (!match) return false;
  const [, category, id] = match;
  const state = window.history.state;
  _renderItemPage(category, id, state && state.itemPage ? state.back : category);
  return true;
}
window._handleItemPagePath = _handleItemPagePath;

function makeSeeMoreBtn(category, item) {
  const name = item.name || item.title || item.code || '';
  const slug = item.id || _ipSlug(name);
  return `<button class="val-see-more-btn" onclick="loadItemPage('${category}','${slug}')">SEE MORE →</button>`;
}
window.makeSeeMoreBtn = makeSeeMoreBtn;
