import { useEffect, useState } from 'react'
import { formatNumber } from './FormatNumber'

import './Tooltip.css'

type TooltipProps = {
  cookiesInBank: number,
  cps: number,
  name: string,
  price: number,
  image: string,
  owned: number
  buildingCps: number,
  modifier: number,
}

export const BuildingTooltip = ({ cookiesInBank, cps, name, price, owned, buildingCps, modifier }: TooltipProps) => {
  const [bankWorth, setBankWorth] = useState<string>("");
  const [timeWorth, setTimeWorth] = useState<string>("");
  const [affordable, setAffordable] = useState<boolean>(false);
  const [singleBuildingCps, setSingleBuildingCps] = useState<number>(buildingCps * modifier)
  const [ownedBuildingsCps, setOwnedBuildingsCps] = useState<number>(singleBuildingCps * owned)

  // Checking if building is affordable
  useEffect(() => {
    if (cookiesInBank >= price) {
      setAffordable(true);
    } else if (cookiesInBank < price) {
      setAffordable(false);
    }
  }, [cookiesInBank, price])

  // Setting single building cps
  useEffect(() => {
    setSingleBuildingCps(buildingCps * modifier)
  }, [buildingCps, modifier])

  // Setting owned building cps
  useEffect(() => {
    setOwnedBuildingsCps(singleBuildingCps * owned)
  }, [singleBuildingCps, owned])

  // Setting bank worth
  useEffect(() => {
    const calculatedWorth = (price / cookiesInBank) * 100;
    const formattedWorth = calculatedWorth.toFixed(2) + "%";

    setBankWorth(formattedWorth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price])

  // Setting time worth
  useEffect(() => {
    const calculatedWorth = price / cps
    const seconds = calculatedWorth > 0 ? calculatedWorth : 0;
    let timeDuration;
    if (seconds < 60) {
      timeDuration = `${Math.floor(seconds)} seconds`;
    } else if (seconds < 3600) {
      timeDuration = `${Math.floor(seconds / 60)} minutes`;
    } else if (seconds < 86400) {
      timeDuration = `${Math.floor(seconds / 3600)} hours`;
    } else {
      timeDuration = `${Math.floor(seconds / 86400)} days`;
    }


    setTimeWorth(timeDuration)
  }, [price])

  return (
    <div className="tooltip">
      <section className="upper-section">
        <div className="left">
          <img className="tooltip-image" src={name === "Wizard Tower" ? "/public/upgrades/wizard_tower/plain_wizard_tower.webp" : name === "Alchemy Lab" ? "/public/upgrades/alchemy_lab/plain_alchemy_lab.webp" : `/public/upgrades/${name.toLowerCase()}/plain_${name.toLowerCase()}.webp`} />
          <div className="tooltip-info">
            <span className="tooltip-building-name">{name}</span>
            <span className="tooltip-owned">Owned: {owned}</span>
          </div>
        </div>
        <div className="right">
          <div className="price-affordable">
            <img className="tooltip-cookie" src="/public/big-cookie.svg" />
            <span style={{ color: `${affordable ? "#00ff00" : "#ff0000"}` }}>{formatNumber(price)}</span>
          </div>
          <div className="price-worth">
            <span className="price-worth-element">{timeWorth} worth</span>
            <span className="price-worth-element">{bankWorth} of bank</span>
          </div>
        </div>
      </section>
      <section>
        <span>Each {name.toLowerCase()} produces {formatNumber(singleBuildingCps)} cookies per second</span>
        <br />
        <span>{owned} {name.toLowerCase()}s producing {formatNumber(ownedBuildingsCps)} cookies per second ({((ownedBuildingsCps / cps) * 100).toFixed(2)}% of total cps)</span>
        <br />
        <span></span>
      </section>
    </div >
  )
}

export const UpgradeTooltip = ({ name, price }: TooltipProps) => {
  return (
    <div className="tooltip">
      <span>{name}</span>
      <span>{price}</span>
    </div>
  )
}