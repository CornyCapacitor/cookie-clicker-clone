import './App.css'
import { Milk } from './components/Milk.tsx'

function App() {
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
            Welcome to Cookie Clicker clone by Mateusz Minder!
          </section>
          <section className="header-right header-section">
            <button className="header-button">Info</button>
            <button className="header-button">Restart</button>
          </section>
        </div>
      </section>
      <section className="section-right">
        <header>Store</header>
      </section>
    </div>
  )
}

export default App