export const FarmUpgrades = [
  {
    name: "Cheap hoes",
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
    tier: "plain",
    owned: false,
  },
]