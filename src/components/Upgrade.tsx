import { useEffect, useState } from 'react';
import { UpgradeTooltip } from './Tooltip';

import './Upgrade.css';

type UpgradeProps = {
  cookiesInBank: number,
  cps: number,
  name: string,
  description: string,
  price: number,
  image: string,
  tier: string,
  buyUpgrade: (name: string) => void;
}

export const Upgrade = ({ cookiesInBank, cps, name, description, price, image, tier, buyUpgrade }: UpgradeProps) => {
  const [affordable, setAffordable] = useState<boolean | undefined>(undefined);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const handleUpgradeClick = () => {
    buyUpgrade(name)
  }

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
        <img src={`/public/upgrades/${image}`} />
      </div>
      {isTooltipVisible && (
        <UpgradeTooltip cookiesInBank={cookiesInBank} cps={cps} name={name} description={description} price={price} image={image} tier={tier} />
      )}
    </>
  )
}