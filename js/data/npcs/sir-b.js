const NPC_SIRB = [
  {
    name: "Sir.B",
    showMoreButton: true,
    team: "CRIMINAL",
    location: "Syndicate Headquarters",
    description: "Syndicate leader directing operations against law enforcement and specializing in black market dealing.",
    dialogue: {
      "[Join/Leave The Syndicate]": [
        { dialogue: "We've been expecting you Username [joining]" },
        { dialogue: "So it shall be [leaving]" }
      ],
      "[See Missions]": [
        { dialogue: "See available missions" }
      ],
      "I'd like to sell my loot": [
        { dialogue: "You don't have anything to sell right now" },
        { dialogue: "For everything, I can get you $[Cash]. It'll take me 4 hours to smuggle and resell things. After that, you'll get paid" }
      ],
      "Nevermind": [
        { dialogue: "See you again [Exit Dialogue]" }
      ]
    }
  }
];
