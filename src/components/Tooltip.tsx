import { useEffect, useState } from 'react'
import { formatNumber } from './FormatNumber'

import './Tooltip.css'

type TooltipProps = {
  cookiesInBank: number,
  cps: number,
  name: string,
  description: string,
  price: number,
  image: string,
}

type BuildingProps = TooltipProps & {
  owned: number
  buildingCps: number,
  modifier: number,
  y: number,
}

type UpgradeProps = TooltipProps & {
  tier: string,
  building?: string,
}

export const BuildingTooltip = ({ cookiesInBank, cps, name, description, price, owned, buildingCps, modifier, y }: BuildingProps) => {
  const [bankWorth, setBankWorth] = useState<string>("");
  const [timeWorth, setTimeWorth] = useState<string>("");
  const [affordable, setAffordable] = useState<boolean>(false);
  const [singleBuildingCps, setSingleBuildingCps] = useState<number>(buildingCps * modifier)
  const [ownedBuildingsCps, setOwnedBuildingsCps] = useState<number>(singleBuildingCps * owned)

  // Handling the upgrade image source
  const getBuildingImage = (name: string) => {
    const imageName = name.toLowerCase().replace(/\s/g, '_');
    return `/upgrades/${imageName}/plain_${imageName}.webp`;
  };

  const tooltipImageSrc = getBuildingImage(name)

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
    <div className="tooltip" style={{ top: y }}>
      <section className="upper-section">
        <div className="left">
          <img className="tooltip-image" src={tooltipImageSrc} />
          <div className="tooltip-info">
            <span className="tooltip-building-name">{name}</span>
            <span className="tooltip-owned">Owned: {owned}</span>
          </div>
        </div>
        <div className="right">
          <div className="price-affordable">
            <img className="tooltip-cookie" src="/big-cookie.svg" />
            <span style={{ color: `${affordable ? "#00ff00" : "#ff0000"}` }}>{formatNumber(price, 0)}</span>
          </div>
          <div className="price-worth">
            <span className="price-worth-element">{timeWorth} worth</span>
            <span className="price-worth-element">{bankWorth} of bank</span>
          </div>
        </div>
      </section>
      <section className="middle-section">
        <span>"{description}"</span>
      </section>
      <section className="lower-section">
        <span>Each {name.toLowerCase()} produces {formatNumber(singleBuildingCps, 2)} cookies per second</span>
        <span>{owned} {name.toLowerCase()}s producing {formatNumber(ownedBuildingsCps, 2)} cookies per second ({((ownedBuildingsCps / cps) * 100).toFixed(2)}% of total cps)</span>
      </section>
    </div >
  )
}

export const UpgradeTooltip = ({ cookiesInBank, cps, name, building, description, price, image, tier }: UpgradeProps) => {
  const [bankWorth, setBankWorth] = useState<string>("");
  const [timeWorth, setTimeWorth] = useState<string>("");
  const [affordable, setAffordable] = useState<boolean>(false);
  const [tierTheme, setTierTheme] = useState<string>("");
  const [upgradeImageSrc, setUpgradeImageSrc] = useState<string>(image);

  // Handling the upgrade image source
  useEffect(() => {
    if (building) {
      const buildingName = building.toLowerCase().replace(/\s/g, '_');
      setUpgradeImageSrc(`${buildingName}/${tier}_${buildingName}.webp`)
    }
  }, [name, building, tier])

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

  // Setting tier theme
  useEffect(() => {
    let theme: string;

    switch (tier) {
      case "beryllium":
        theme = "#cc3fc7";
        break;
      case "blueberyllium":
        theme = "#099ad9";
        break;
      case "chalcedhoney":
        theme = "#d98609";
        break;
      case "buttergold":
        theme = "#d9ac09";
        break;
      case "sugarmuck":
        theme = "#4a9e88";
        break;
      case "jetmint":
        theme = "#06c449";
        break;
      case "cherrysilver":
        theme = "#b50707";
        break;
      case "hazelrald":
        theme = "#127d01";
        break;
      case "mooncandy":
        theme = "#0269d6";
        break;
      case "astrofudge":
        theme = "#851313";
        break;
      case "alabascream":
        theme = "#fff9c2";
        break;
      case "iridyum":
        theme = "#2b2b2b";
        break;
      case "glucosmium":
        theme = "#00a2ff";
        break;
      case "glimmeringue":
        theme = "#fff86e";
        break;
      default:
        theme = "";
        break;
    }

    setTierTheme(theme)
  }, [tier])

  return (
    <div style={{ top: "90px" }} className="tooltip">
      <section className="upper-section">
        <div className="left">
          <img className="tooltip-image" src={`/upgrades/${upgradeImageSrc}`} />
          <div className="tooltip-info">
            <span className="tooltip-name">{name}</span>
            <span className="tooltip-owned" style={{ marginBottom: "7px", backgroundColor: `${tierTheme}` }}>Tier: {tier}</span>
          </div>
        </div>
        <div className="right">
          <div className="price-affordable">
            <img className="tooltip-cookie" src="/big-cookie.svg" />
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