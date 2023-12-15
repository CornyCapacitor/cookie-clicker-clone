export const UpgradesData = [
  // Cursors
  {
    name: "Reinforced index finger",
    description: "The mouse and cursors are twice as efficient.",
    price: 100,
    image: "reinforced-index-finger.webp",
    modifying: {
      building: "Cursor",
      other: "Clicks",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Cursor",
      amount: 1,
    },
    owned: false,
  },
  {
    name: "Carpal tunnel prevention cream",
    description: "The mouse and cursors are twice as efficient.",
    price: 500,
    image: "carapal-tunnel-prevention-cream.webp",
    modifying: {
      building: "Cursor",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Cursor",
      amount: 1,
    },
    owned: false,
  },

  // Grandmas
  {
    name: "Forwards from grandma",
    description: "Grandmas are twice as efficient.",
    price: 1000,
    image: "forwards-from-grandma.webp",
    modifying: {
      building: "Grandma",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Grandma",
      amount: 1,
    },
    owned: false,
  },
  {
    name: "Steel-plated rolling pins",
    description: "Grandmas are twice as efficient.",
    price: 5000,
    image: "steel-plated-rolling-pins.webp",
    modifying: {
      building: "Grandma",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Grandma",
      amount: 5,
    },
    owned: false,
  },
]