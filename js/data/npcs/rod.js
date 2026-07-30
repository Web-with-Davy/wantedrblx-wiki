const NPC_ROD = [
  {
    name: "Rod",
    team: "CRIMINAL",
    location: "Oasis City Port",
    description: "The current manager of Oasis City Port, specializing in across the sea trading. You can sell guns to him for 35% of the guns re-buy price, get info on loot crates, and buy the vault crackers from him.",
    dialogue: {
      "[Browser Shop]": [
        { dialogue: "Buy Vault Cracker [$10,000]" }
      ],
      "Any valuable crates today? [$200]": [
        { dialogue: "Theres a weird crate that hardly weighs anything [2 Bitcoin]" },
        { dialogue: "Theres a strange order on the manifest. Looks to be Government [2 Secret Files and Flash Drive]" },
        { dialogue: "There's a shipment of diamonds on the manifest today [2 Diamonds]" },
        { dialogue: "Some illicit cargo came in today [1 Money Printer]" },
        { dialogue: "Big shipment of gems just came in [4 Gems Total (Diamonds, Amethyst, Emeralds, Rubies, Sapphires)]" },
        { dialogue: "An order from the bank came in - big cash shipment [+10K Cash]" },
        { dialogue: "Saw an order from Oasis Jewelry [5 Jewelry Total (Rollie, Amethyst/Diamond/Emerald/Ruby/Sapphire Rings, Pearl Necklace, Gold Chain)]" },
        { dialogue: "Theres an order here for some expensive tech parts [PearPods, HDDs, PearWatches, PSU, GPU]" },
        { dialogue: "There's some real heavy weapons [AWM, RPG, M60, M4A1]" },
        { dialogue: "I saw a shipment of some military-grade weapons [AWM, ARX, SPAS, RPG, AK47]" },
        { dialogue: "Looks like a shipment of gold pear tech [2 Goldbooks, 2 Goldphones, 2 Gold Pods, 2 Gold Watches]" }
      ],
      "I want to sell a gun": [
        { dialogue: "You need to equip a gun first" },
        { dialogue: "I can get you $[Cash] for your [Gun Name]" }
      ],
      "Who are you?": [
        { dialogue: "I am the foreman here. This is my operation. Everything that comes in and out of this city comes through me first" }
      ],
      "Nevermind": [
        { dialogue: "Back to work [Exit Dialogue]" }
      ]
    }
  }
];
