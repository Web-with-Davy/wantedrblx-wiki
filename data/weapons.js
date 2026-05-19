const GUNS_DATA = [
  {
    name: "M9",
    showMoreButton: true,
    reBuyPrice: 200,
    sellPrice: 60,
    contractPrice: 0,
    stats: {
      ammo: "15/300",
      ammoPrice: "$150 for 15",
      damage: "Head-14/Torso-10/Limbs-8",
      firerate: 400,
      reload: 2.5,
      accuracy: "±0.40m @ 25m"
    },
    attachments: {
      Optics: [
        { name: "Reflex Sight", price: 12500 },
        { name: "Pistol Holo", price: 20000 }
      ],
      Muzzle: [
        { name: "Pistol Suppressor", price: 16000 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "FN FAL",
    showMoreButton: true,
    obtaining: "Syndicate Level 4",
    reBuyPrice: 9000,
    sellPrice: 2700,
    contractPrice: "Un-Buyable",
    stats: {
      ammo: "20/280",
      ammoPrice: "$0 for 0",
      damage: "Head-14/Torso-10/Limbs-9",
      firerate: 705,
      reload: 2.5,
      accuracy: "±1.10m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "Model 870",
    showMoreButton: true,
    reBuyPrice: 2000,
    sellPrice: 600,
    contractPrice: 20000,
    stats: {
      ammo: "4/80",
      ammoPrice: "$60 for 4",
      damage: "Head-7/Torso-6/Limbs-4",
      firerate: 66,
      reload: 0.8,
      accuracy: "±3.50m @ 25m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ],
      Ammunition: [
        { name: "Rubber Slugs", price: 25000 },
        { name: "12 Gauge Slugs", price: 35000 },
        { name: "Super Magnum", price: 750000 }
      ]
    }
  },
  {
    name: "Uzi",
    showMoreButton: true,
    reBuyPrice: 2500,
    sellPrice: 750,
    contractPrice: 25000,
    stats: {
      ammo: "25/250",
      ammoPrice: "$250 for 25",
      damage: "Head-7/Torso-6/Limbs-5",
      firerate: 1500,
      reload: 2.2,
      accuracy: "±0.90m @ 50m"
    },
    attachments: {
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Stock: [
        { name: "Uzi Stock", price: 35000 }
      ]
    }
  },
  {
    name: "UMP 45",
    showMoreButton: true,
    reBuyPrice: 3000,
    sellPrice: 900,
    contractPrice: 40000,
    stats: {
      ammo: "30/240",
      ammoPrice: "$300 for 30",
      damage: "Head-9/Torso-7/Limbs-6",
      firerate: 750,
      reload: 2,
      accuracy: "±1.70m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "Skorpion",
    showMoreButton: true,
    reBuyPrice: 4000,
    sellPrice: 1200,
    contractPrice: 100000,
    stats: {
      ammo: "20/220",
      ammoPrice: "$200 for 20",
      damage: "Head-9/Torso-8/Limbs-6",
      firerate: 1200,
      reload: 2,
      accuracy: "±0.70m @ 25m"
    },
    attachments: {
      Muzzle: [
        { name: "Pistol Suppressor", price: 16000 }
      ]
    }
  },
  {
    name: "AUG A1",
    showMoreButton: true,
    reBuyPrice: 5000,
    sellPrice: 1500,
    contractPrice: 350000,
    stats: {
      ammo: "30/270",
      ammoPrice: "$450 for 30",
      damage: "Head-8/Torso-7/Limbs-6",
      firerate: 681,
      reload: 3,
      accuracy: "±0.90m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "AUG Scope", price: 100000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "Benelli M1014",
    showMoreButton: true,
    reBuyPrice: 6000,
    sellPrice: 1800,
    contractPrice: 550000,
    stats: {
      ammo: "30/270",
      ammoPrice: "$120 for 6",
      damage: "Head-5/Torso-4/Limbs-3",
      firerate: 230,
      reload: 0.8,
      accuracy: "±3.50m @ 25m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ],
      Ammunition: [
        { name: "12 Gauge Slugs", price: 35000 }
      ]
    }
  },
  {
    name: "AK-47",
    showMoreButton: true,
    reBuyPrice: 6500,
    sellPrice: 1950,
    contractPrice: 800000,
    stats: {
      ammo: "30/300",
      ammoPrice: "$4500 for 30",
      damage: "Head-10/Torso-8/Limbs-8",
      firerate: 750,
      reload: 2,
      accuracy: "±1.50m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "Glock 18c",
    showMoreButton: true,
    reBuyPrice: 3500,
    sellPrice: 1050,
    contractPrice: 1100000,
    stats: {
      ammo: "19/285",
      ammoPrice: "$380 for 19",
      damage: "11-9-8",
      firerate: 750,
      reload: 3,
      accuracy: "±0.50m @ 25m"
    },
    attachments: {
      Optics: [
        { name: "Pistol Holo", price: 12500 },
        { name: "Reflex Sight", price: 20000 }
      ],
      Muzzle: [
        { name: "Pistol Suppressor", price: 16000 }
      ],
      Stock: [
        { name: "Pistol Stock", price: 70000 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "M4A1",
    showMoreButton: true,
    reBuyPrice: 8000,
    sellPrice: 2400,
    contractPrice: 1600000,
    stats: {
      ammo: "30/420",
      ammoPrice: "$600 for 30",
      damage: "Head-11/Torso-9/Limbs-8",
      firerate: 1000,
      reload: 2,
      accuracy: "±0.90m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "ARX-160",
    showMoreButton: true,
    reBuyPrice: 8000,
    sellPrice: 2400,
    contractPrice: 1800000,
    stats: {
      ammo: "30/300",
      ammoPrice: "$450 for 30",
      damage: "Head-9/Torso-8/Limbs-7",
      firerate: 1200,
      reload: 3,
      accuracy: "±1.10m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "N/A", price: 0 }
      ],
      Muzzle: [
        { name: "N/A", price: 0 }
      ],
      Underbarrel: [
        { name: "N/A", price: 0 }
      ],
      Tactical: [
        { name: "N/A", price: 0 }
      ],
      Ammunition: [
        { name: "N/A", price: 0 }
      ]
    }
  },
  {
    name: "SPAS-12",
    showMoreButton: true,
    reBuyPrice: 8000,
    sellPrice: 2400,
    contractPrice: 2000000,
    stats: {
      ammo: "6/90",
      ammoPrice: "$360 for 6",
      damage: "Head-7/Torso-5/Limbs-4",
      firerate: 200,
      reload: 0.8,
      accuracy: "±3.50m @ 25m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ],
      Ammunition: [
        { name: "Rubber Slugs", price: 25000 },
        { name: "12 Gauge Slugs", price: 35000 },
        { name: "Dragon's Breath", price: 750000 }
      ]
    }
  },
  {
    name: "AWM",
    showMoreButton: true,
    reBuyPrice: 8000,
    sellPrice: 2400,
    contractPrice: 3500000,
    stats: {
      ammo: "5/40",
      ammoPrice: "$750 for 5",
      damage: "Head-150/Torso-65/Limbs-50",
      firerate: 30,
      reload: 3.5,
      accuracy: "±0.40m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 },
        { name: "Rifle Scope", price: 1250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "Kriss Vector",
    showMoreButton: true,
    reBuyPrice: 8000,
    sellPrice: 2400,
    contractPrice: 3600000,
    stats: {
      ammo: "30/330",
      ammoPrice: "$450 for 30",
      damage: "Head-8/Torso-6/Limbs-5",
      firerate: 1200,
      reload: 2,
      accuracy: "±1.30m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "M60",
    showMoreButton: true,
    reBuyPrice: 10000,
    sellPrice: 3000,
    contractPrice: 4200000,
    stats: {
      ammo: "100/800",
      ammoPrice: "$1000 for 100",
      damage: "Head-15/Torso-11/Limbs-9",
      firerate: 750,
      reload: 5,
      accuracy: "±5.30m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 },
        { name: "Rifle Scope", price: 1250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "M60 Bipod", price: 5000 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "SVD",
    showMoreButton: true,
    reBuyPrice: 10000,
    sellPrice: 3000,
    contractPrice: 5000000,
    stats: {
      ammo: "10/110",
      ammoPrice: "$600 for 10",
      damage: "Head-90/Torso-45/Limbs-45",
      firerate: 150,
      reload: 4,
      accuracy: "±0.40m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "PSO Scope", price: 0 },
        { name: "AGOC", price: 250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "Deagle",
    showMoreButton: true,
    obtaining: "Syndicate Level 3",
    reBuyPrice: 3500,
    sellPrice: 1050,
    contractPrice: "Un-Buyable",
    stats: {
      ammo: "8/160",
      ammoPrice: "$0 for 0",
      damage: "Head-40/Torso-25/Limbs-20",
      firerate: 200,
      reload: 3,
      accuracy: "±0.70m @ 25m"
    },
    attachments: {
      Optics: [
        { name: "Pistol Holo", price: 12500 },
        { name: "Reflex Sight", price: 20000 }
      ],
      Muzzle: [
        { name: "Pistol Suppressor", price: 16000 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "Barrett M82",
    showMoreButton: true,
    obtaining: "Airdrop",
    contractPrice: "Un-Buyable",
    sellPrice: 30000,
    stats: {
      ammo: "5/30",
      ammoPrice: "$1000 for 5",
      damage: "Head-200/Torso-80/Limbs-80",
      firerate: 30,
      reload: 3.5,
      accuracy: "±0.40m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 },
        { name: "Rifle Scope", price: 1250000 },
        { name: "Nightforce Scope", price: 2500000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "Golden Barrett M82",
    showMoreButton: true,
    obtaining: "Airdrop",
    contractPrice: "Un-Buyable",
    sellPrice: "300000",
    stats: {
      ammo: "5/30",
      ammoPrice: "2000? for 5",
      damage: "Head-200/Torso-80/Limbs-80",
      firerate: 30,
      reload: 3.5,
      accuracy: "±0.40m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 },
        { name: "Rifle Scope", price: 1250000 },
        { name: "Nightforce Scope", price: 2500000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "Golden AK-47",
    showMoreButton: true,
    obtaining: "Airdrop",
    contractPrice: "Un-Buyable",
    sellPrice: 60000,
    stats: {
      ammo: "30/300",
      ammoPrice: "$600 for 10",
      damage: "Head-15/Torso-12/Limbs-12",
      firerate: 750,
      reload: 2,
      accuracy: "±1.50m @ 50m"
    },
    attachments: {
      Optics: [
        { name: "Holographic Sight", price: 12500 },
        { name: "Reflex Sight", price: 20000 },
        { name: "AGOC", price: 250000 }
      ],
      Muzzle: [
        { name: "Mono Suppressor", price: 32000 }
      ],
      Underbarrel: [
        { name: "Horizontal Foregrip", price: 5000 },
        { name: "Vertical Foregrip", price: 7500 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  },
  {
    name: "Golden Deagle",
    showMoreButton: true,
    obtaining: "Airdrop",
    sellPrice: 21000,
    contractPrice: "Un-Buyable",
    stats: {
      ammo: "8/160",
      ammoPrice: "$160 for 8",
      damage: "Head-80/Torso-50/Limbs-40",
      firerate: 200,
      reload: 3,
      accuracy: "±0.70m @ 25m"
    },
    attachments: {
      Optics: [
        { name: "Pistol Holo", price: 12500 },
        { name: "Reflex Sight", price: 20000 }
      ],
      Muzzle: [
        { name: "Pistol Suppressor", price: 16000 }
      ],
      Tactical: [
        { name: "Tactical Laser", price: 50000 }
      ]
    }
  }
];

const EXPLOSIVES_DATA = [
  {
    name: "C4",
    showMoreButton: true,
    reBuyPrice: 1000,
    sellPrice: 300,
    contractPrice: 50000,
    stats: {
      ammo: "1/10",
      ammoPrice: "$1000 for 1",
      damage: "35",
      firerate: 0,
      reload: 0,
      accuracy: "0"
    }
  },
  {
    name: "M67",
    showMoreButton: true,
    reBuyPrice: 1000,
    sellPrice: 300,
    contractPrice: 80000,
    stats: {
      ammo: "1/3",
      ammoPrice: "$1000 for 1",
      damage: "Head-100/Torso-100/Limbs-100",
      firerate: 0,
      reload: 0,
      accuracy: "0"
    }
  },
  {
    name: "RPG-7",
    showMoreButton: true,
    reBuyPrice: 10000,
    sellPrice: 3000,
    contractPrice: 1250000,
    stats: {
      ammo: "1/6",
      ammoPrice: "$2000 for 1",
      damage: "80",
      firerate: 8,
      reload: 7,
      accuracy: "±12.20m @ 200m"
    }
  }
];

const TOOLS_DATA = [
  {
    name: "Buzzsaw",
    showMoreButton: false,
    location: "Ofy's Value Pawn",
    contractPrice: 2000,
    stats: {
      ammo: "1/8",
      ammoPrice: "$250 for 1",
      damage: "10 per 0.2s",
    }
  },
  {
    name: "Vault Cracker",
    showMoreButton: false,
    location: "Oasis City Port",
    contractPrice: 5000,
    stats: {
      ammo: "1/2",
      ammoPrice: "$5000 for 1",
    }
  }
];