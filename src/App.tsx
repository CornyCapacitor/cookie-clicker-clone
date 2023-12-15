import { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Building } from './components/Building.tsx'
import { Milk } from './components/Milk.tsx'
import { Upgrade } from './components/Upgrade.tsx'
import { BuildingData } from './gamedata/BuildingData.ts'
import { UpgradesData } from './gamedata/UpgradesData.ts'

import './App.css'

type Building = {
  name: string,
  price: number,
  image: string,
  owned: number
  cps: number,
  modifier: number,
}

// type Achievement = {
//   name: string,
//   requirement: string,
//   achieved: boolean,
// }

type Upgrade = {
  name: string,
  description: string,
  price: number,
  image: string,
  modifying: string | { building: string, other?: string },
  modifyingValue: number,
  modifiedBuilding: string,
  unlockCondition: string | { building: string, amount: number },
  owned: boolean,
}

function App() {
  // Arrays
  const [buildings, setBuildings] = useState<Building[]>(BuildingData);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(UpgradesData)
  const [availableUpgrades, setAvailableUpgrades] = useState<Upgrade[]>([]);

  // Cookies states
  const [cookiesBaked, setCookiesBaked] = useState<number>(0);
  const [cookiesInBank, setCookiesInBank] = useState<number>(0);
  const [refreshRate] = useState<number>(100);

  // Cps states
  const [cpsBase, setCpsBase] = useState<number>(0.000001)
  const [cps, setCps] = useState<number>(0.000001);
  const [cpsModifier] = useState<number>(1);

  // Click states & functions
  const [cookieClickMultiplier, setCookieClickMultiplier] = useState<number>(1);
  const bigCookieClick = () => {
    const clickValue = 1 * cookieClickMultiplier
    setCookiesInBank(cookiesInBank + clickValue);
    setCookiesBaked(cookiesBaked + clickValue)
  }

  const buyBuilding = (name: string) => {
    const findBuildingIndex = (name: string) => {
      return buildings.findIndex(building => building.name === name)
    }

    const buildingIndex = findBuildingIndex(name)
    const buildingPrice = buildings[buildingIndex].price

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    })

    if (cookiesInBank >= buildingPrice) {
      // Reduce cookies
      setCookiesInBank(cookiesInBank - buildingPrice)

      // Setting owned of building to +1
      setBuildings((p) => p.map((building, index) => index === buildingIndex ? { ...building, owned: building.owned + 1 } : building))

      // Setting price of building to price * 1.15
      setBuildings((p) => p.map((building, index) => index === buildingIndex ? { ...building, price: Math.floor(1 + building.price * 1.15) } : building))

      Toast.fire({
        icon: "success",
        title: `Bought 1 ${name}!`
      })
    } else {
      Toast.fire({
        icon: "error",
        title: "Not enough cookies!"
      })
    }
  }

  const buyUpgrade = (name: string) => {
    const findUpgradeIndex = (name: string) => {
      return upgrades.findIndex(upgrade => upgrade.name === name)
    }

    const upgradeIndex = findUpgradeIndex(name)
    const upgradePrice = upgrades[upgradeIndex].price
    const modifyingValue = upgrades[upgradeIndex].modifyingValue

    const modifying = upgrades[upgradeIndex].modifying as { building: string, other: string }

    // Getting modified building index
    const buildingName = modifying.building
    const buildingIndex = buildings.findIndex(building => building.name === buildingName)

    // Checking others parameters to change
    if (modifying.other === "Clicks") {
      setCookieClickMultiplier(cookieClickMultiplier * upgrades[upgradeIndex].modifyingValue)
    }

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    })

    if (cookiesInBank >= upgradePrice) {
      // Reduce cookies
      setCookiesInBank(cookiesInBank - upgradePrice)

      // Setting upgrade to true
      setUpgrades((p) => p.map((upgrade, index) => index === upgradeIndex ? { ...upgrade, owned: true } : upgrade))

      // Remove upgrade from available upgrades
      setAvailableUpgrades((p) => p.filter((upgrade) => upgrade !== upgrades[upgradeIndex]))

      // Update building cps modifier
      setBuildings((p) => p.map((building, index) => index === buildingIndex ? { ...building, modifier: (buildings[buildingIndex].modifier * modifyingValue) } : building))

      Toast.fire({
        icon: "success",
        title: `Bought ${name} upgrade!`
      })
    } else {
      Toast.fire({
        icon: "error",
        title: "Not enough cookies!"
      })
    }
  }

  // Cps functionality
  const addCookies = useCallback(() => {
    setCookiesInBank(cookies => cookies + cps / refreshRate);
    setCookiesBaked(cookies => cookies + cps / refreshRate)
  }, [cps, refreshRate])

  const interval = useCallback(() =>
    setInterval(addCookies, 1000 / refreshRate),
    [addCookies, refreshRate])

  useEffect(() => {
    const cookieTimer = interval()
    return () => {
      clearInterval(cookieTimer);
    }
  }, [interval])

  // Showing available upgrades
  useEffect(() => {
    // Reinforced index finger
    if (buildings[0].owned === 1 && upgrades[0].owned === false && !availableUpgrades.some((upgrade) => upgrade === upgrades[0])) {
      setAvailableUpgrades((p) => [...p, upgrades[0]])
    }

    // Forwards from grandma
    if (buildings[1].owned === 1 && upgrades[1].owned === false && !availableUpgrades.some((upgrade) => upgrade === upgrades[1])) {
      setAvailableUpgrades((p) => [...p, upgrades[1]])
    }
  }, [cpsBase])

  // Calculating new cps base
  useEffect(() => {
    const cursorCps = buildings[0].modifier * buildings[0].owned * buildings[0].cps
    const grandmaCps = buildings[1].modifier * buildings[1].owned * buildings[1].cps
    const newCpsBase = cursorCps + grandmaCps;
    setCpsBase(newCpsBase)
  }, [buildings])

  // Calculating new cps
  useEffect(() => {
    const newCps = cpsBase * cpsModifier
    setCps(newCps);
  }, [cpsBase, cpsModifier])

  return (
    <div className="app">
      <section className="section-left">
        <header>Player's Bakery</header>
        <div className="cookies-production-info">
          <span>{cookiesInBank.toFixed(0)} cookies</span>
          <span>{cps.toFixed(2)} cookies per second</span>
        </div>
        <div className="big-cookie-glow">
          <img className="big-cookie" src="/big-cookie.svg" onClick={() => bigCookieClick()} />
        </div>
        <Milk color="white" />
      </section>
      <section className="section-middle">
        <div className="header">
          <section className="header-left header-section">
            <button className="header-button">Options</button>
            <button className="header-button">Stats</button>
          </section>
          <section className="header-middle header-section">
            <header>Welcome to Cookie Clicker clone by Mateusz Minder!</header>
          </section>
          <section className="header-right header-section">
            <button className="header-button">Info</button>
            <button className="header-button">Restart</button>
          </section>
        </div>
        <button className="header-button" onClick={() => setCookiesInBank(p => p + 100)}>Cheat 100 cookies</button>
        <button className="header-button" onClick={() => console.log(buildings)}>Console log buildings</button>
      </section>
      <section className="section-right">
        <header className="store-header">Store</header>
        <header className="upgrades-header">Upgrades</header>
        <div className="upgrades">
          {availableUpgrades.map((upgrade, index) => (
            <Upgrade key={index} name={upgrade.name} image={upgrade.image} buyUpgrade={buyUpgrade} />
          ))}
        </div>
        <header className="buildings-header">Buildings</header>
        <div className="buildings">
          {buildings.map((building, index) => (
            <Building key={index} name={building.name} price={building.price} image={building.image} owned={building.owned} buyBuilding={buyBuilding} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default App