import { AlchemyLabUpgrades } from "./upgrades/alchemy_labUpgrades"
import { AntimatterCondenserUpgrades } from "./upgrades/antimatter_condenserUpgrades"
import { BankUpgrades } from "./upgrades/bankUpgrades"
import { ChancemakerUpgrades } from "./upgrades/chancemakerUpgrades"
import { CortexBakerUpgrades } from "./upgrades/cortex_bakerUpgrades"
import { CursorUpgrades } from "./upgrades/cursorUpgrades"
import { FactoryUpgrades } from "./upgrades/factoryUpgrades"
import { FarmUpgrades } from "./upgrades/farmUpgrades"
import { FractalEngineUpgrades } from "./upgrades/fractal_engineUpgrades"
import { GrandmaUpgrades } from "./upgrades/grandmaUpgrades"
import { IdleverseUpgrades } from "./upgrades/idleverseUpgrades"
import { JavascriptConsoleUpgrades } from "./upgrades/javascript_consoleUpgrades"
import { MineUpgrades } from "./upgrades/mineUpgrades"
import { PortalUpgrades } from "./upgrades/portalUpgrades"
import { PrismUpgrades } from "./upgrades/prismUpgrades"
import { ShipmentUpgrades } from "./upgrades/shipmentUpgrades"
import { TempleUpgrades } from "./upgrades/templeUpgrades"
import { TimeMachineUpgrades } from "./upgrades/time_machineUpgrades"
import { WizardTowerUpgrades } from "./upgrades/wizard_towerUpgrades"
import { YouUpgrades } from "./upgrades/youUpgrades"

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

export const UpgradesData: Upgrade[] = [...CursorUpgrades, ...GrandmaUpgrades, ...FarmUpgrades, ...MineUpgrades, ...FactoryUpgrades, ...BankUpgrades, ...TempleUpgrades, ...WizardTowerUpgrades, ...ShipmentUpgrades, ...AlchemyLabUpgrades, ...PortalUpgrades, ...TimeMachineUpgrades, ...AntimatterCondenserUpgrades, ...PrismUpgrades, ...ChancemakerUpgrades, ...FractalEngineUpgrades, ...JavascriptConsoleUpgrades, ...IdleverseUpgrades, ...CortexBakerUpgrades, ...YouUpgrades]
