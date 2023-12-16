export const MineUpgrades = [
  {
    name: "Sugar gas",
    description: "Mines are twice as efficient.",
    price: 120000,
    image: "mine/plain_mine.webp",
    modifying: {
      building: "Mine",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Mine",
      amount: 1,
    },
    owned: false,
  },
]