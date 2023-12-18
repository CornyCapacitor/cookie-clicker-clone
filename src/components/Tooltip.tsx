import { useEffect, useState } from 'react'
import { formatNumber } from './FormatNumber'

import './Tooltip.css'

type TooltipProps = {
  cookiesInBank: number,
  cps: number,
  name: string,
  description?: string,
  price: number,
  image: string,
}

type BuildingProps = TooltipProps & {
  owned: number
  buildingCps: number,
  modifier: number,
}

type UpgradeProps = TooltipProps

export const BuildingTooltip = ({ cookiesInBank, cps, name, price, owned, buildingCps, modifier }: BuildingProps) => {
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
    } else if (seconds < 2628000) {
      timeDuration = `${Math.floor(seconds / 86400)} days`;
    } else if (seconds < 31536000) {
      timeDuration = `${Math.floor(seconds / 2628000)} months`;
    } else {
      timeDuration = `${Math.floor(seconds / 31536000)} years`;
    }

    setTimeWorth(timeDuration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <span style={{ color: `${affordable ? "#00ff00" : "#ff0000"}` }}>{formatNumber(price, 0)}</span>
          </div>
          <div className="price-worth">
            <span className="price-worth-element">{timeWorth} worth</span>
            <span className="price-worth-element">{bankWorth} of bank</span>
          </div>
        </div>
      </section>
      <section>
        <span>Each {name.toLowerCase()} produces {formatNumber(singleBuildingCps, 2)} cookies per second</span>
        <br />
        <span>{owned} {name.toLowerCase()}s producing {formatNumber(ownedBuildingsCps, 2)} cookies per second ({((ownedBuildingsCps / cps) * 100).toFixed(2)}% of total cps)</span>
        <br />
        <span></span>
      </section>
    </div >
  )
}

export const UpgradeTooltip = ({ cookiesInBank, cps, name, description, price, image }: UpgradeProps) => {
  const [bankWorth, setBankWorth] = useState<string>("");
  const [timeWorth, setTimeWorth] = useState<string>("");
  const [affordable, setAffordable] = useState<boolean>(false);

  // Checking if building is affordable
  useEffect(() => {
    if (cookiesInBank >= price) {
      setAffordable(true);
    } else if (cookiesInBank < price) {
      setAffordable(false);
    }
  }, [cookiesInBank, price])

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
    } else if (seconds < 2628000) {
      timeDuration = `${Math.floor(seconds / 86400)} days`;
    } else if (seconds < 31536000) {
      timeDuration = `${Math.floor(seconds / 2628000)} months`;
    } else {
      timeDuration = `${Math.floor(seconds / 31536000)} years`;
    }

    setTimeWorth(timeDuration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price])

  return (
    <div style={{ top: "90px" }} className="tooltip">
      <section className="upper-section">
        <div className="left">
          <img className="tooltip-image" src={`/public/upgrades/${image}`} />
          <div className="tooltip-info">
            <span className="tooltip-name">{name}</span>
            <span className="tooltip-owned" style={{ marginBottom: "7px" }}>Tier: Glucosmium</span>
          </div>
        </div>
        <div className="right">
          <div className="price-affordable">
            <img className="tooltip-cookie" src="/public/big-cookie.svg" />
            <span style={{ color: `${affordable ? "#00ff00" : "#ff0000"}` }}>{formatNumber(price, 0)}</span>
          </div>
          <div className="price-worth">
            <span className="price-worth-element">{timeWorth} worth</span>
            <span className="price-worth-element">{bankWorth} of bank</span>
          </div>
        </div>
      </section>
      <section>
        <span>{description}</span>
      </section>
    </div>
  )
}