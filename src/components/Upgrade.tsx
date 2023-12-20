import { useEffect, useState } from 'react';
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
  const [affordable, setAffordable] = useState<boolean | undefined>(undefined);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [upgradeImageSrc, setUpgradeImageSrc] = useState<string>(image);

  // Handler for buying upgrades
  const handleUpgradeClick = () => {
    buyUpgrade(name)
  }

  // Handling the upgrade image source
  useEffect(() => {
    if (building) {
      const buildingName = building.toLowerCase().replace(/\s/g, '_');
      setUpgradeImageSrc(`${buildingName}/${tier}_${buildingName}.webp`)
    }
    else {
      setUpgradeImageSrc(image)
    }
  }, [name, building, tier, image])

  // Checking if upgrade is affordable
  useEffect(() => {
    if (cookiesInBank >= price) {
      setAffordable(true);
    } else if (cookiesInBank < price) {
      setAffordable(false);
    }
  }, [cookiesInBank, price])

  return (
    <>
      <div onMouseEnter={() => setIsTooltipVisible(true)} onMouseLeave={() => setIsTooltipVisible(false)} className={`upgrade ${affordable ? "affordable" : "not-affordable"}`} id={name} onClick={() => handleUpgradeClick()}>
        <img src={`/upgrades/${upgradeImageSrc}`} />
      </div>
      {isTooltipVisible && (
        <UpgradeTooltip cookiesInBank={cookiesInBank} cps={cps} name={name} building={building} description={description} price={price} image={image} tier={tier} />
      )}
    </>
  )
}