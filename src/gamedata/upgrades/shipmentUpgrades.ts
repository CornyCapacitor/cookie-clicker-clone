export const ShipmentUpgrades = [
  {
    name: "Vanilla nebulae",
    description: "Shipment are twice as efficient.",
    price: 51000000000,
    image: "shipment/plain_shipment.webp",
    modifying: {
      building: "Shipment",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Shipment",
      amount: 1,
    },
    owned: false,
  },
]