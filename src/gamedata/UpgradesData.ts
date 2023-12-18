import { AlchemyLabUpgrades } from "./upgrades/alchemy_labUpgrades"
import { BankUpgrades } from "./upgrades/bankUpgrades"
import { CursorUpgrades } from "./upgrades/cursorUpgrades"
import { FactoryUpgrades } from "./upgrades/factoryUpgrades"
import { FarmUpgrades } from "./upgrades/farmUpgrades"
import { GrandmaUpgrades } from "./upgrades/grandmaUpgrades"
import { MineUpgrades } from "./upgrades/mineUpgrades"
import { PortalUpgrades } from "./upgrades/portalUpgrades"
import { ShipmentUpgrades } from "./upgrades/shipmentUpgrades"
import { TempleUpgrades } from "./upgrades/templeUpgrades"
import { WizardTowerUpgrades } from "./upgrades/wizard_towerUpgrades"

type Upgrade = {
  name: string,
  description: string,
  price: number,
  image: string,
  modifying: { building?: string, other?: string },
  modifyingValue: number,
  unlockCondition: { building: string, amount: number },
  owned: boolean,
  tier: string,
}

export const UpgradesData: Upgrade[] = [...CursorUpgrades, ...GrandmaUpgrades, ...FarmUpgrades, ...MineUpgrades, ...FactoryUpgrades, ...BankUpgrades, ...TempleUpgrades, ...WizardTowerUpgrades, ...ShipmentUpgrades, ...AlchemyLabUpgrades, ...PortalUpgrades]
