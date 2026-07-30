const WEAPON_LIGHT_CARBINE = [

  {
    name: "Light Carbine",
    description: "A beginner friendly rifle",
    reBuyPrice: 300,
    sellPrice: 90,
    contractPrice: 2500,
    stats: {
      ammo: "15/150",
      ammoPrice: "$75 for 15",
      damage: "Head-9/Torso-8/Limb-7",
      firerate: 545,
      reload: 1.6,
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

];
