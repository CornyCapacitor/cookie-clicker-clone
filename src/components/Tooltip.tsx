import { formatNumber } from './FormatNumber'

import './Tooltip.css'

type TooltipProps = {
  cookiesInBank: number,
  cps: number,
  name: string,
  description: string,
  price: number,
  image: string,
  top: number,
  right: number,
}

type BuildingProps = TooltipProps & {
  owned: number
  buildingCps: number,
  modifier: number,
}

type UpgradeProps = TooltipProps & {
  tier: string,
  building?: string,
}

export const BuildingTooltip = ({ cookiesInBank, cps, name, description, price, owned, buildingCps, modifier, top, right }: BuildingProps) => {

  // Handling the building image source
  const getBuildingImage = (name: string) => {
    const imageName = name.toLowerCase().replace(/\s/g, '_');
    return `/upgrades/${imageName}/plain_${imageName}.webp`;
  };

  const tooltipImageSrc = getBuildingImage(name)

  // Checking if building's affordable
  const affordable = cookiesInBank >= price

  // Setting single building cps
  const singleBuildingCps = buildingCps * modifier

  // Setting owned building cps
  const ownedBuildingsCps = singleBuildingCps * owned

  // Setting bank worth
  const bankWorth = ((price / cookiesInBank) * 100).toFixed(2) + "%"

  // Setting time worth
  const calculateWorth = (price: number, cps: number) => {
    const calculatedWorth = price / cps
    const seconds = calculatedWorth > 0 ? calculatedWorth : 0;
    if (seconds < 60) {
      return `${Math.floor(seconds)} seconds`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minutes`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)} hours`;
    } else if (seconds < 2628000) {
      return `${Math.floor(seconds / 86400)} days`;
    } else if (seconds < 31536000) {
      return `${Math.floor(seconds / 2628000)} months`;
    } else {
      return `${Math.floor(seconds / 31536000)} years`;
    }
  }

  const timeWorth = calculateWorth(price, cps)

  return (
    <div className="tooltip" style={{ top: top, right: right }}>
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

export const UpgradeTooltip = ({ cookiesInBank, cps, name, building, description, price, image, tier, top, right }: UpgradeProps) => {

  // Handling the upgrade image source
  let tooltipImageSrc = image

  const getBuildingImage = (building: string, tier: string) => {
    const buildingName = building.toLowerCase().replace(/\s/g, '_');
    return `${buildingName}/${tier}_${buildingName}.webp`
  }

  if (building) {
    tooltipImageSrc = getBuildingImage(building, tier)
  }

  // Checking if upgrade's affordable
  const affordable = cookiesInBank >= price

  // Setting bank worth
  const bankWorth = ((price / cookiesInBank) * 100).toFixed(2) + "%"

  // Setting time worth
  const calculateWorth = (price: number, cps: number) => {
    const calculatedWorth = price / cps
    const seconds = calculatedWorth > 0 ? calculatedWorth : 0;
    if (seconds < 60) {
      return `${Math.floor(seconds)} seconds`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minutes`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)} hours`;
    } else if (seconds < 2628000) {
      return `${Math.floor(seconds / 86400)} days`;
    } else if (seconds < 31536000) {
      return `${Math.floor(seconds / 2628000)} months`;
    } else {
      return `${Math.floor(seconds / 31536000)} years`;
    }
  }

  const timeWorth = calculateWorth(price, cps)

  // Setting tier theme
  const themeSelector = (tier: string) => {
    switch (tier) {
      case "beryllium":
        return "#cc3fc7";
      case "blueberyllium":
        return "#099ad9";
      case "chalcedhoney":
        return "#d98609";
      case "buttergold":
        return "#d9ac09";
      case "sugarmuck":
        return "#4a9e88";
      case "jetmint":
        return "#06c449";
      case "cherrysilver":
        return "#b50707";
      case "hazelrald":
        return "#127d01";
      case "mooncandy":
        return "#0269d6";
      case "astrofudge":
        return "#851313";
      case "alabascream":
        return "#fff9c2";
      case "iridyum":
        return "#2b2b2b";
      case "glucosmium":
        return "#00a2ff";
      case "glimmeringue":
        return "#fff86e";
      default:
        return "";
    }
  }

  const tierTheme = themeSelector(tier)

  return (
    <div style={{ top: top, right: right }} className="tooltip">
      <section className="upper-section">
        <div className="left">
          <img className="tooltip-image" src={`/upgrades/${tooltipImageSrc}`} />
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