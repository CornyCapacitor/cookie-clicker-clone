export const WizardTowerUpgrades = [
  {
    name: "Pointier hats",
    description: "Wizard towers are twice as efficient.",
    price: 3300000000,
    image: "wizard_tower/plain_wizard_tower.webp",
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