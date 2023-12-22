import { formatNumber } from "./FormatNumber";
import { Upgrade } from "./Upgrade";
import { UpgradeImage } from "./UpgradeImage";

import './Header.css';
import './Upgrade.css';

type BuildingUpgradeCondition = { building: string, amount: number };
type OtherUpgradeCondition = { other: string, amount: number };

type Upgrade = {
  name: string,
  description: string,
  price: number,
  image: string,
  modifying: { building?: string, other?: string },
  modifyingValue: number,
  unlockCondition: BuildingUpgradeCondition | OtherUpgradeCondition,
  owned: boolean,
  tier: string,
}

type StatsProps = {
  cookiesInBank: number,
  cookiesBaked: number,
  handMadeCookies: number,
  cps: number,
  buildingsTotal: number,
  rawCps: number,
  cookiesPerClick: number,
  totalClicks: number,
  totalGoldenCookieClicks: number,
  upgrades: Upgrade[],
  runDate: Date,
}

export const Stats = ({ cookiesInBank, cookiesBaked, handMadeCookies, runDate, cps, totalClicks, rawCps, cookiesPerClick, buildingsTotal, totalGoldenCookieClicks, upgrades }: StatsProps) => {

  const date = runDate.toLocaleString()
  const ownedUpgrades = upgrades.filter(upgrade => upgrade.owned)

  return (
    <div className="main">
      <header>Statistics</header>
      <section className="section">
        <header>General</header>
        <section className="section-section">
          <div>Cookies in bank: <span className="highlighted">{formatNumber(cookiesInBank, 0)}</span></div>
          <div>Cookies baked: <span className="highlighted">{formatNumber(cookiesBaked, 0)}</span></div>
          <div>Run started: <span className="highlighted">{date}</span></div>
          <div>Buildings owned: <span className="highlighted">{buildingsTotal}</span></div>
          <div>Cookies per second: <span className="highlighted">{formatNumber(cps, 2)}</span></div>
          <div>Raw cookies per second: <span className="highlighted">{formatNumber(rawCps, 2)}</span></div>
          <div>Cookies per click: <span className="highlighted">{formatNumber(cookiesPerClick, 2)}</span></div>
          <div>Cookie clicks: <span className="highlighted">{formatNumber(totalClicks, 0)}</span></div>
          <div>Hand-made cookies: <span className="highlighted">{formatNumber(handMadeCookies, 0)}</span></div>
          <div>Golden cookie clicks: <span className="highlighted">{totalGoldenCookieClicks}</span></div>
          <br />
          <div>Running version: <span className="highlighted">1.0</span></div>
        </section>
        <span className="highlighted"></span>
      </section>
      <section className="section">
        <header>Upgrades</header>
        <section className="section-section">
          <div>Upgrades unlocked: {`${ownedUpgrades.length} / ${upgrades.length}`} ({`${(ownedUpgrades.length / upgrades.length * 100).toFixed(2)}%`})</div>
          <div className="header-upgrades">
            {ownedUpgrades.map((upgrade) => (
              <UpgradeImage cookiesInBank={cookiesInBank} cps={cps} name={upgrade.name} description={upgrade.description} price={upgrade.price} image={upgrade.image} tier={upgrade.tier} />
            ))}
          </div>
        </section>
      </section>
      <span></span>
    </div>
  )
}