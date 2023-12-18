import { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Building } from './components/Building.tsx'
import { formatNumber } from './components/FormatNumber.ts'
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
  modifying: { building?: string, other?: string },
  modifyingValue: number,
  unlockCondition: { building: string, amount: number },
  owned: boolean,
  tier: string,
}

type ClickMessage = {
  id: number,
  text: string,
}

function App() {
  // Arrays
  const [buildings, setBuildings] = useState<Building[]>(BuildingData);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(UpgradesData);
  const [availableUpgrades, setAvailableUpgrades] = useState<Upgrade[]>([]);

  // Cookies states
  const [cookiesBaked, setCookiesBaked] = useState<number>(0);
  const [, setCookiesBakedString] = useState<string>("0");
  const [cookiesInBank, setCookiesInBank] = useState<number>(0);
  const [cookiesInBankString, setCookiesInBankString] = useState<string>("0");
  const [refreshRate] = useState<number>(100);

  // Cps states
  const [cpsBase, setCpsBase] = useState<number>(0.000001);
  const [cps, setCps] = useState<number>(0.000001);
  const [cpsString, setCpsString] = useState<string>("0");
  const [cpsModifier] = useState<number>(1);

  // Click states & functions
  const [cookieClickMultiplier, setCookieClickMultiplier] = useState<number>(1);
  const [thousandFingersEnabled, setThousandFingersEnabled] = useState<boolean>(false);
  const [thousandFingersValue, setThousandFingersValue] = useState<number>(0);
  const [thousandFingersMultiplier, setThousandFingersMultiplier] = useState<number>(1);
  const [clickMessages, setClickMessages] = useState<ClickMessage[]>([])

  // Clicking the BIG COOKIE
  const bigCookieClick = () => {
    // Add cookies to the bank
    const clickValue = 1 * cookieClickMultiplier + thousandFingersValue * thousandFingersMultiplier
    setCookiesInBank(cookiesInBank + clickValue);
    setCookiesBaked(cookiesBaked + clickValue)

    // Create cookie message
    const newMessage = { id: new Date().getTime(), text: `+${clickValue}` }
    setClickMessages((p) => [...p, newMessage])

    // Remove the message
    setTimeout(() => {
      setClickMessages((p) => p.filter((msg) => msg.id !== newMessage.id))
    }, 3000)
  }

  // Buying buildings
  const buyBuilding = (name: string) => {
    const findBuildingIndex = (name: string) => {
      return buildings.findIndex(building => building.name === name)
    }

    const buildingIndex = findBuildingIndex(name)
    const buildingPrice = buildings[buildingIndex].price

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
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

  // Buying upgrades
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
    } else if (modifying.other === "Thousand fingers") {
      if (upgrades[upgradeIndex].modifyingValue === 0.0) {
        // setThousandFingers(p => ({ ...p, multiplier: p.multiplier + 1 }))
        setThousandFingersEnabled(true);
      } else {
        setThousandFingersMultiplier(thousandFingersMultiplier * upgrades[upgradeIndex].modifyingValue)
      }
    }

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
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
    const singleUpgrade = (index: number, unlockCondition: { building: string, amount: number }) => {
      const buildingIndex = buildings.findIndex(building => building.name === unlockCondition.building)

      if (buildingIndex !== -1 && buildings[buildingIndex].owned >= unlockCondition.amount && upgrades[index].owned === false && !availableUpgrades.some((upgrade) => upgrade === upgrades[index])) {
        setAvailableUpgrades((p) => [...p, upgrades[index]])
      }
    }

    upgrades.forEach((upgrade, index) => {
      singleUpgrade(index, upgrade.unlockCondition)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cpsBase])

  // Calculating new cps base and thousand fingers
  useEffect(() => {
    let newCpsBase = 0;
    let otherBuildings = 0;
    let thousandFingersValue = 0;

    for (const building of buildings) {
      newCpsBase += building.modifier * building.owned * building.cps
    }

    if (thousandFingersEnabled) {
      for (const building of buildings) {
        if (building.name !== "Cursor") {
          otherBuildings += building.owned
        }
      }
    }

    thousandFingersValue = +(otherBuildings * 0.1).toFixed(2)
    setThousandFingersValue(thousandFingersValue)

    setCpsBase(newCpsBase + thousandFingersValue * thousandFingersMultiplier)
  }, [buildings, thousandFingersMultiplier, thousandFingersEnabled])

  // Calculating new cps
  useEffect(() => {
    const newCps = cpsBase * cpsModifier
    setCps(newCps);
  }, [cpsBase, cpsModifier])

  // Converting long numbers to numbers with verbal replacement
  useEffect(() => {
    setCpsString(formatNumber(cps, 2))
    setCookiesInBankString(formatNumber(cookiesInBank, 0))
    setCookiesBakedString(formatNumber(cookiesBaked, 0))
  }, [cps, cookiesInBank, cookiesBaked])

  // Available upgrades sorting by price
  useEffect(() => {
    setAvailableUpgrades((p) => [...p].sort((a, b) => a.price - b.price));
  }, [cps]);

  return (
    <div className="app">
      <section className="section-left">
        <header>Player's Bakery</header>
        <div className="cookies-production-info">
          <span>{`${cookiesInBankString} cookies`}</span>
          <span>{`${cpsString} cookies per second`}</span>
        </div>
        <div className="big-cookie-container">
          <div className="big-cookie-glow">
            <img className="big-cookie" src="/big-cookie.svg" onClick={() => bigCookieClick()} />
          </div>
          {clickMessages.map((message) => (
            <div className="click-message" key={message.id}>{formatNumber(Number(message.text), 2)}</div>
          ))}
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
        <button className="header-button" onClick={() => setCookiesInBank(p => p + 1e5)}>Cheat {1e5} cookies</button>
        <button className="header-button" onClick={() => console.log(buildings)}>Console log buildings</button>
        <button className="header-button" onClick={() => setBuildings((p) => p.map((building, index) => index === 0 ? { ...building, owned: building.owned + 550 } : building))}>Add 550 cursors</button>
        <button className="header-button" onClick={() => setBuildings((p) => p.map((building, index) => index === 1 ? { ...building, owned: building.owned + 550 } : building))}>Add 550 grandmas</button>
      </section>
      <section className="section-right">
        <header className="store-header">Store</header>
        <header className="upgrades-header">Upgrades</header>
        <div className="upgrades">
          {availableUpgrades.map((upgrade, index) => (
            <Upgrade cookiesInBank={cookiesInBank} cps={cps} key={index} name={upgrade.name} description={upgrade.description} price={upgrade.price} image={upgrade.image} tier={upgrade.tier} buyUpgrade={buyUpgrade} />
          ))}
        </div>
        <header className="buildings-header">Buildings</header>
        <div className="buildings">
          {buildings.map((building, index) => (
            <Building cookiesInBank={cookiesInBank} cps={cps} key={index} name={building.name} price={building.price} image={building.image} owned={building.owned} buildingCps={building.cps} modifier={building.modifier} buyBuilding={buyBuilding} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default App