import { useEffect, useState } from 'react';
import { formatNumber } from './FormatNumber';

import './Building.css';

type BuildingProps = {
  name: string,
  price: number,
  image: string,
  owned: number
  buyBuilding: (name: string) => void;
}

export const Building = ({ name, price, image, owned, buyBuilding }: BuildingProps) => {
  const [priceString, setPriceString] = useState<string>("");

  const handleBuildingClick = () => {
    buyBuilding(name);
  }

  useEffect(() => {
    setPriceString(formatNumber(price))
  }, [price])

  return (
    <div className="building" id={name} onClick={() => handleBuildingClick()}>
      <div className="left-section">
        <img className="building-image" src={`/public/buildings/${image}`} />
        <div className="building-info">
          <span className="building-name">{name}</span>
          <div className="building-price-container">
            <img className="building-cookie" src="/public/big-cookie.svg" />
            <span className="building-price">{priceString}</span>
          </div>
        </div>
      </div>
      <span className="building-owned">{owned}</span>
    </div>
  )
}