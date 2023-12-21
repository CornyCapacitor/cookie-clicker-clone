import { useEffect, useRef, useState } from 'react';
import { formatNumber } from './FormatNumber';
import { BuildingTooltip } from './Tooltip';

import './Building.css';

type BuildingProps = {
  cookiesInBank: number,
  cps: number,
  name: string,
  description: string,
  price: number,
  image: string,
  owned: number
  buildingCps: number,
  modifier: number,
  buyBuilding: (name: string) => void;
}

export const Building = ({ cookiesInBank, cps, name, description, price, image, owned, buildingCps, modifier, buyBuilding }: BuildingProps) => {
  const [priceString, setPriceString] = useState<string>("");
  const [affordable, setAffordable] = useState<boolean | undefined>(undefined);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);

  const divRef = useRef<HTMLDivElement | null>(null)

  const mouseEnterHandler = () => {
    setIsTooltipVisible(true)

    if (divRef.current) {
      const divPosition = divRef.current.getBoundingClientRect();
      const newY = divPosition.top;
      setTop(newY)
    }
  }

  // Handler for buyBuilding function
  const handleBuildingClick = () => {
    buyBuilding(name);
  }

  // Handler for price string
  useEffect(() => {
    setPriceString(formatNumber(price, 0))
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
    <>
      <div ref={divRef} onMouseEnter={() => mouseEnterHandler()} onMouseLeave={() => setIsTooltipVisible(false)} className={`building ${affordable ? "affordable" : "not-affordable"}`} id={name} onClick={() => handleBuildingClick()}>
        <div className="left-section">
          <img className="building-image" src={`/buildings/${image}`} />
          <div className="building-info">
            <span className="building-name">{name === "Antimatter Condenser" ? "Antim. Condenser" : name}</span>
            <div className="building-price-container">
              <img className="building-cookie" src="/big-cookie.svg" />
              <span className="building-price" style={{ color: `${affordable ? "#00ff00" : "#ff0000"}` }}>{priceString}</span>
            </div>
          </div>
        </div>
        <span className="building-owned">{owned}</span>
      </div>
      {isTooltipVisible && (affordable || (isTooltipVisible && owned >= 1)) && (
        <BuildingTooltip cookiesInBank={cookiesInBank} cps={cps} name={name} description={description} price={price} image={image} owned={owned} buildingCps={buildingCps} modifier={modifier} top={top} right={318}></BuildingTooltip>
      )}
    </>
  )
}