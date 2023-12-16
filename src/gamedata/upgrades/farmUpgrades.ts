export const FarmUpgrades = [
  {
    name: "Reinforced index finger",
    description: "Farms are twice as efficient.",
    price: 11000,
    image: "farm/plain_farm.webp",
    modifying: {
      building: "Farm",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Farm",
      amount: 1,
    },
    owned: false,
  },
]