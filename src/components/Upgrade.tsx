import { useEffect, useState } from 'react';

import './Upgrade.css';

type UpgradeProps = {
  cookiesInBank: number,
  name: string,
  price: number,
  image: string,
  buyUpgrade: (name: string) => void;
}

export const Upgrade = ({ cookiesInBank, name, price, image, buyUpgrade }: UpgradeProps) => {
  const [affordable, setAffordable] = useState<boolean | undefined>(undefined);

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
    <div className={`upgrade ${affordable ? "affordable" : "not-affordable"}`} id={name} onClick={() => handleUpgradeClick()}>
      <img src={`/public/upgrades/${image}`} />
    </div>
  )
}