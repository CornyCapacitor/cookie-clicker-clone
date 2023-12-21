import { useState } from 'react';
import { UpgradeTooltip } from './Tooltip';

import './Upgrade.css';

type UpgradeProps = {
  cookiesInBank: number,
  cps: number,
  name: string,
  building?: string,
  description: string,
  price: number,
  image: string,
  tier: string,
  buyUpgrade: (name: string) => void;
}

export const Upgrade = ({ cookiesInBank, cps, name, building, description, price, image, tier, buyUpgrade }: UpgradeProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  // Handler for buying upgrades
  const handleUpgradeClick = () => {
    buyUpgrade(name)
  }

  // Checking if upgrade's affordable
  const affordable = cookiesInBank >= price

  return (
    <>
      <div onMouseEnter={() => setIsTooltipVisible(true)} onMouseLeave={() => setIsTooltipVisible(false)} className={`upgrade ${affordable ? "affordable" : "not-affordable"}`} id={name} onClick={() => handleUpgradeClick()}>
        <img src={`/upgrades/${image}`} />
      </div>
      {isTooltipVisible && (
        <UpgradeTooltip cookiesInBank={cookiesInBank} cps={cps} name={name} building={building} description={description} price={price} image={image} tier={tier} top={90} right={318} />
      )}
    </>
  )
}