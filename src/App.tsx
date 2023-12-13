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
        <img className="big-cookie" src="/big-cookie.svg" />
        <Milk color="white" />
      </section>
      <section className="section-middle">
        <header>Welcome to cookie clicker by Mateusz Minder!</header>
      </section>
      <section className="section-right">
        <header>Store</header>
      </section>
    </div>
  )
}

export default App