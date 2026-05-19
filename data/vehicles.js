const VEHICLES_DATA = [
  {
    name: "Cruiser",
    showMoreButton: true,
    type: "ground",
    repairPrice: 0,
    repairPriceGarage: 0,
    contractPrice: 0,
    stats: {
      topSpeed: 38,
      acceleration: 31,
      braking: 53,
      Health: "Body-200/Wheels-100/Windows-100",
      armor: 0
    }
  },
  {
    name: "Nomad",
    showMoreButton: true,
    type: "ground",
    repairPrice: 600,
    repairPriceGarage: 180,
    contractPrice: 0,
    stats: {
      topSpeed: 32,
      acceleration: 28,
      braking: 49,
      Health: "Body-200/Wheels-100/Windows-100",
      armor: 1
    }
  },
  {
    name: "Ranger",
    showMoreButton: true,
    type: "ground",
    repairPrice: 600,
    repairPriceGarage: 180,
    contractPrice: 24000,
    stats: {
      topSpeed: 29,
      acceleration: 29,
      braking: 44,
      Health: "Body-300/Wheels-100/Windows-100",
      armor: 0
    }
  },
  {
    name: "Contender",
    showMoreButton: true,
    type: "ground",
    repairPrice: 600,
    repairPriceGarage: 180,
    contractPrice: 65000,
    stats: {
      topSpeed: 41,
      acceleration: 33,
      braking: 56,
      Health: "Body-200/Wheels-100/Windows-100",
      armor: 0
    }
  },
  {
    name: "Beam",
    showMoreButton: true,
    type: "ground",
    repairPrice: 600,
    repairPriceGarage: 180,
    contractPrice: 80000,
    stats: {
      topSpeed: 44,
      acceleration: 35,
      braking: 58,
      Health: "Body-200/Wheels-100/Windows-100",
      armor: 0
    }
  },
  {
    name: "Crowline",
    showMoreButton: true,
    type: "ground",
    repairPrice: 600,
    repairPriceGarage: 180,
    contractPrice: 120000,
    stats: {
      topSpeed: 35,
      acceleration: 32,
      braking: 53,
      Health: "Body-200/Wheels-100/Windows-100",
      armor: 1
    }
  },
  {
    name: "Stallion 450",
    showMoreButton: true,
    type: "ground",
    repairPrice: 600,
    repairPriceGarage: 180,
    contractPrice: 185000,
    stats: {
      topSpeed: 47,
      acceleration: 36,
      braking: 57,
      Health: "Body-200/Wheels-100/Windows-100",
      armor: 0
    }
  },
  {
    name: "G-Cruiser",
    showMoreButton: true,
    type: "ground",
    repairPrice: 1500,
    repairPriceGarage: 450,
    contractPrice: 240000,
    stats: {
      topSpeed: 42,
      acceleration: 29,
      braking: 49,
      Health: "Body-400/Wheels-100/Windows-100",
      armor: 2
    }
  },
  {
    name: "Gemstone",
    showMoreButton: true,
    type: "ground",
    repairPrice: 1500,
    repairPriceGarage: 450,
    contractPrice: 400000,
    stats: {
      topSpeed: 48,
      acceleration: 37,
      braking: 59,
      Health: "Body-200/Wheels-100/Windows-100",
      armor: 0
    }
  },
  {
    name: "Vanguard",
    showMoreButton: true,
    type: "ground",
    repairPrice: 3000,
    repairPriceGarage: 900,
    contractPrice: 750000,
    stats: {
      topSpeed: 55,
      acceleration: 37,
      braking: 60,
      Health: "Body-200/Wheels-100/Windows-100",
      armor: 0
    }
  },
  {
    name: "Zoro",
    showMoreButton: true,
    type: "ground",
    repairPrice: 3000,
    repairPriceGarage: 900,
    contractPrice: 900000,
    stats: {
      topSpeed: 50,
      acceleration: 40,
      braking: 53,
      Health: "Body-400/Wheels-100/Windows-100",
      armor: 2
    }
  },
  {
    name: "Mini Bird",
    showMoreButton: true,
    type: "flying",
    repairPrice: 0,
    repairPriceGarage: 0,
    contractPrice: 1400000,
    stats: {
      topSpeed: 58,
      handling: 50,
      spoolTime: 3,
      Health: "250",
      armor: 0
    }
  },
  {
    name: "Pulse 477",
    showMoreButton: true,
    type: "ground",
    repairPrice: 3000,
    repairPriceGarage: 900,
    contractPrice: 2400000,
    stats: {
      topSpeed: 62,
      acceleration: 47,
      braking: 67,
      Health: "Body-200/Wheels-100/Windows-100",
      armor: 0
    }
  },
  {
    name: "Scout",
    showMoreButton: true,
    type: "flying",
    repairPrice: 0,
    repairPriceGarage: 0,
    contractPrice: 3200000,
    stats: {
      topSpeed: 100,
      handling: 100,
      spoolTime: 5,
      Health: "400",
      armor: 1
    }
  },
  {
    name: "Razor",
    showMoreButton: true,
    type: "ground",
    repairPrice: 7500,
    repairPriceGarage: 2250,
    contractPrice: 3500000,
    stats: {
      topSpeed: 65,
      acceleration: 57,
      braking: 71,
      Health: "Body-200/Wheels-100/Windows-100",
      armor: 0
    }
  },
  {
    name: "Zorvello",
    showMoreButton: true,
    type: "ground",
    repairPrice: 7500,
    repairPriceGarage: 2250,
    contractPrice: 5000000,
    stats: {
      topSpeed: 70,
      acceleration: 64,
      braking: 75,
      Health: "Body-250/Wheels-100/Windows-100",
      armor: 0
    }
  },
  {
    name: "Spectre",
    showMoreButton: true,
    type: "ground",
    repairPrice: 7500,
    repairPriceGarage: 2250,
    contractPrice: 6200000,
    stats: {
      topSpeed: 77,
      acceleration: 67,
      braking: 80,
      Health: "Body-250/Wheels-100/Windows-100",
      armor: 0
    }
  },
  {
    name: "Blade",
    showMoreButton: true,
    type: "ground",
    obtaining: "Syndicate Level 5",
    repairPrice: 3000,
    repairPriceGarage: 900,
    contractPrice: "Un-Buyable",
    stats: {
      topSpeed: 57,
      acceleration: 44,
      braking: 64,
      Health: "Body-1,000/Wheels-300/Windows-400",
      armor: 5
    }
  }
];