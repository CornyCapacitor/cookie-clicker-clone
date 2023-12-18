export const FactoryUpgrades = [
  {
    name: "Sturdier conveyor belts",
    description: "Factories are twice as efficient.",
    price: 120000,
    image: "factory/plain_factory.webp",
    modifying: {
      building: "Factory",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Factory",
      amount: 1,
    },
    tier: "plain",
    owned: false,
  },
]