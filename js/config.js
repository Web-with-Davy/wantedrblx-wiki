const RARITIES = {
  MISSION: { name: "Mission", class: "rarity-mission", color: "#99f" },
  COMMON: { name: "Common", class: "rarity-common", color: "#999" },
  UNCOMMON: { name: "Uncommon", class: "rarity-uncommon", color: "#0f0" },
  EPIC: { name: "Epic", class: "rarity-epic", color: "#c0f" },
  MYTHIC: { name: "Mythic", class: "rarity-mythic", color: "#f00" },
  LEGENDARY: { name: "Legendary", class: "rarity-legendary", color: "#ff0" },
  UNOBTAINABLE: { name: "Unobtainable", class: "rarity-unobtainable", color: "#000000ff" },
  CHRISTMAS: { name: "Christmas-Limited", class: "rarity-christmas-limited", color: "#0f0" },
  EASTER: { name: "Easter-Limited", class: "rarity-easter", color: "#ff50c2" }
};

const DIFFICULTIES = {
  EASY: { name: "Easy", class: "rarity-easy", order: 1 },
  MEDIUM: { name: "Medium", class: "rarity-medium", order: 2 },
  HARD: { name: "Hard", class: "rarity-hard", order: 3 },
  CHRISTMAS: { name: "Christmas-Limited", class: "rarity-christmas-limited", order: 0 },
  EASTER: { name: "Easter-Limited", class: "rarity-easter", order: 0 }
};

const TEAMS = {
  NEUTRAL: { name: "Neutral", class: "rarity-neutral", color: "#0f0" },
  POLICE: { name: "Police", class: "rarity-police", color: "#00f" },
  CRIMINAL: { name: "Criminal", class: "rarity-criminal", color: "#f00" }
};

const generateSlug = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

const formatPrice = (price) => {
  if (typeof price === 'string') return price;
  if (typeof price !== 'number') return undefined;
  return `<img src="images/cash.png" alt="Cash" style="height: 16px; width: auto; vertical-align: middle; margin-right: 2px;">${price.toLocaleString()}`;
};

const formatReward = (reward) => {
  if (typeof reward !== 'string') return reward;
  return reward.replace(/\$/g, '<img src="images/cash.png" alt="$" style="height: 16px; width: auto; vertical-align: middle; margin-right: 2px;">');
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RARITIES, DIFFICULTIES, TEAMS, generateSlug, formatPrice, formatReward };
}