export const WizardTowerUpgrades = [
  {
    name: "Pointier hats",
    description: "Wizard towers are twice as efficient.",
    price: 3300000000,
    image: "wizard_tower/plain_wizard_tower.webp",
    modifying: {
      building: "Wizard Tower",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Wizard Tower",
      amount: 1,
    },
    tier: "plain",
    owned: false,
  },
]