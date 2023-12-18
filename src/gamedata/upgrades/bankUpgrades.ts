export const BankUpgrades = [
  {
    name: "Taller tellers",
    description: "Banks are twice as efficient.",
    price: 14000000,
    image: "bank/plain_bank.webp",
    modifying: {
      building: "Bank",
    },
    modifyingValue: 2.0,
    unlockCondition: {
      building: "Bank",
      amount: 1,
    },
    tier: "plain",
    owned: false,
  },
]