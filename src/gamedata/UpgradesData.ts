import { CursorUpgrades } from "./upgrades/cursorUpgrades"
import { FarmUpgrades } from "./upgrades/farmUpgrades"
import { GrandmaUpgrades } from "./upgrades/grandmaUpgrades"

type Upgrade = {
  name: string,
  description: string,
  price: number,
  image: string,
  modifying: { building?: string, other?: string },
  modifyingValue: number,
  unlockCondition: { building: string, amount: number },
  owned: boolean,
}

export const UpgradesData: Upgrade[] = [...CursorUpgrades, ...GrandmaUpgrades, ...FarmUpgrades]
