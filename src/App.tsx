import { useState } from 'react'
import { Milk } from './components/Milk.tsx'

import './App.css'
import { Building } from './components/Building.tsx'

type Building = {
  name: string,
  price: number,
  image: string,
  owned: number
}

function App() {
  const [buildings] = useState<Building[]>([
    {
      name: "Cursor",
      price: 10,
      image: "/public/cursor.svg",
      owned: 0
    },
    {
      name: "Grandma",
      price: 100,
      image: "/public/grandma.svg",
      owned: 0
    },
    {
      name: "Farm",
      price: 500,
      image: "/public/farm.svg",
      owned: 0,
    },
    {
      name: "Mine",
      price: 1000,
      image: "/public/mine.svg",
      owned: 0
    },
    {
      name: "Factory",
      price: 5000,
      image: "/public/factory.svg",
      owned: 0
    }
  ])


  return (
    <div className="app">
      <section className="section-left">
        <header>Player's Bakery</header>
        <div className="cookies-production-info">
          <span>0 cookies</span>
          <span>0 cookies per second</span>
        </div>
        <div className="big-cookie-glow">
          <img className="big-cookie" src="/big-cookie.svg" />
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
      </section>
      <section className="section-right">
        <header className="store-header">Store</header>
        <header className="upgrades-header">Upgrades</header>
        <div className="upgrades"></div>
        <header className="buildings-header">Buildings</header>
        <div className="buildings">
          {buildings.map((building) => (
            <Building name={building.name} price={building.price} image={building.image} owned={building.owned} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default App