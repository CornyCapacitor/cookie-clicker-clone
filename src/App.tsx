import { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Building } from './components/Building.tsx'
import { Milk } from './components/Milk.tsx'

import './App.css'

type Building = {
  name: string,
  price: number,
  image: string,
  owned: number
  cps: number,
}

function App() {
  const [buildings] = useState<Building[]>([
    {
      name: "Cursor",
      price: 15,
      image: "/public/cursor.svg",
      owned: 0,
      cps: 0.1,
    },
    {
      name: "Grandma",
      price: 100,
      image: "/public/grandma.svg",
      owned: 0,
      cps: 1,
    },
    {
      name: "Farm",
      price: 1100,
      image: "/public/farm.svg",
      owned: 0,
      cps: 8,

    },
    {
      name: "Mine",
      price: 12000,
      image: "/public/mine.svg",
      owned: 0,
      cps: 47
    },
    {
      name: "Factory",
      price: 13000,
      image: "/public/factory.svg",
      owned: 0,
      cps: 260
    }
  ])

  const buyBuilding = (name: string) => {
    const findBuildingIndex = (name: string) => {
      return buildings.findIndex(building => building.name === name)
    }


    const buildingIndex = findBuildingIndex(name)
    const buildingPrice = buildings[buildingIndex].price
    const buildingCps = buildings[buildingIndex].cps

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
      setCookiesInBank(cookiesInBank - buildingPrice)
      setCps(cps + buildingCps)

      buildings[buildingIndex].owned += 1;
      buildings[buildingIndex].price = Math.floor(1 + buildings[buildingIndex].price * 1.15)
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

  // Cookies states
  const [cookiesBaked, setCookiesBaked] = useState<number>(0);
  const [cookiesInBank, setCookiesInBank] = useState<number>(0);

  // Cps states
  const [cps, setCps] = useState<number>(0.00000000001);

  // Click states
  const [cookieClickMultiplier] = useState<number>(1);

  const addCookie = useCallback(() => {
    setCookiesInBank(cookies => cookies + 1);
    setCookiesBaked(cookies => cookies + 1)
  }, [])

  const bigCookieClick = () => {
    const clickValue = 1 * cookieClickMultiplier
    setCookiesInBank(cookiesInBank + clickValue);
    setCookiesBaked(cookiesBaked + clickValue)
  }

  // Cps interval
  const interval = useCallback(() =>
    setInterval(addCookie, 1000 / cps),
    [addCookie, cps])

  useEffect(() => {
    const cookieTimer = interval()
    return () => {
      clearInterval(cookieTimer);
    }
  }, [interval])

  return (
    <div className="app">
      <section className="section-left">
        <header>Player's Bakery</header>
        <div className="cookies-production-info">
          <span>{cookiesInBank} cookies</span>
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
      </section>
      <section className="section-right">
        <header className="store-header">Store</header>
        <header className="upgrades-header">Upgrades</header>
        <div className="upgrades"></div>
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