export const PortalUpgrades = [
  {
    name: "Ancient tablet",
    description: "Portals are twice as efficient.",
    price: 10000000000000000,
    image: "portal/plain_portal.webp",
    modifying: {
      building: "Portal",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Portal",
      amount: 1,
    },
    tier: "plain",
    owned: false,
  },
]