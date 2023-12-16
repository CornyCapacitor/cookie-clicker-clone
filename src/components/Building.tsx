import { useEffect, useState } from 'react';
import { formatNumber } from './FormatNumber';

import './Building.css';

type BuildingProps = {
  cookiesInBank: number,
  name: string,
  price: number,
  image: string,
  owned: number
  buyBuilding: (name: string) => void;
}

export const Building = ({ cookiesInBank, name, price, image, owned, buyBuilding }: BuildingProps) => {
  const [priceString, setPriceString] = useState<string>("");
  const [affordable, setAffordable] = useState<boolean | undefined>(undefined);

  // Handler for buyBuilding function
  const handleBuildingClick = () => {
    buyBuilding(name);
  }

  // Handler for price string
  useEffect(() => {
    setPriceString(formatNumber(price))
  }, [price])

  // Checking if building is affordable
  useEffect(() => {
    if (cookiesInBank >= price) {
      setAffordable(true);
    } else if (cookiesInBank < price) {
      setAffordable(false);
    }
  }, [cookiesInBank, price])

  return (
    <div className={`building ${affordable ? "affordable" : "not-affordable"}`} id={name} onClick={() => handleBuildingClick()}>
      <div className="left-section">
        <img className="building-image" src={`/public/buildings/${image}`} />
        <div className="building-info">
          <span className="building-name">{name}</span>
          <div className="building-price-container">
            <img className="building-cookie" src="/public/big-cookie.svg" />
            <span className="building-price" style={{ color: `${affordable ? "#00ff00" : "#ff0000"}` }}>{priceString}</span>
          </div>
        </div>
      </div>
      <span className="building-owned">{owned}</span>
    </div>
  )
}