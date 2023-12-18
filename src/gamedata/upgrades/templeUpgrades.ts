export const TempleUpgrades = [
  {
    name: "Golden idols",
    description: "Temples are twice as efficient.",
    price: 200000000,
    image: "temple/plain_temple.webp",
    modifying: {
      building: "Temple",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Temple",
      amount: 1,
    },
    tier: "plain",
    owned: false,
  },
]