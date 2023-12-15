export const UpgradesData = [
  // Cursors
  {
    name: "Reinforced index finger",
    description: "The mouse and cursors are twice as efficient",
    price: 100,
    image: "reinforced-index-finger.webp",
    modifying: {
      building: "Cursor",
      other: "Clicks",
    },
    modifyingValue: 2.0,
    modifiedBuilding: "Cursor",
    unlockCondition: {
      building: "Cursor",
      amount: 1,
    },
    owned: false,
  },

  // Grandmas
  {
    name: "Forwards from grandma",
    description: "Grandmas are twice as efficient",
    price: 1000,
    image: "forwards-from-grandma.webp",
    modifying: {
      building: "Grandma",
    },
    modifyingValue: 2.0,
    modifiedBuilding: "Grandma",
    unlockCondition: {
      building: "Grandma",
      amount: 1
    },
    owned: false,
  }
]