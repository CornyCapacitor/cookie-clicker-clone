type OptionsProps = {
  changeVolume: (value: number) => void;
  changeRefreshRate: (value: number) => void;
  cheatBuildings: (number: number) => void;
  cheatCookies: (number: number) => void;
  volume: number,
  refreshRate: number,
}

export const Options = ({ changeVolume, volume, changeRefreshRate, refreshRate, cheatBuildings, cheatCookies }: OptionsProps) => {

  const handleChangeVolume = (value: number) => {
    changeVolume(value)
  }

  const handleChangeRefreshRate = (value: number) => {
    changeRefreshRate(value)
  }

  const handleCheatBuildings = (value: number) => {
    cheatBuildings(value)
  }

  const handleCheatCookies = (value: number) => {
    cheatCookies(value)
  }

  return (
    <div className="main">
      <header>Options</header>
      <section className="section">
        <header>General</header>
        <section className="section-section">
          <div className="volume">
            <span className="volume-header">Volume:</span>
            {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((value) => (
              <div key={value} className="single-radio">
                <input
                  className="single-radio-radio"
                  name="volume"
                  type="radio"
                  value={value}
                  checked={volume === value}
                  onChange={() => handleChangeVolume(value)}
                />
                <label className="single-radio-label">{value * 10}</label>
              </div>
            ))}
          </div>
          <div className="refresh">
            <span>Refresh rate:</span>
            {[1, 20, 40, 60, 80, 100].map((value) => (
              <div key={value} className="single-radio">
                <input
                  className="single-radio-radio"
                  name="refresh"
                  type="radio"
                  value={value}
                  checked={refreshRate === value}
                  onChange={() => handleChangeRefreshRate(value)}
                />
                <label className="single-radio-label">{value}</label>
              </div>
            ))}
          </div>
        </section>
        <header>Tiny cheats</header>
        <section className="section-section" style={{ gap: "10px" }}>
          <span>Basically, these are only for testing purpose. Nobody has that much time to spend months on testing the game. So here you are, simple buttons for speeding up things a lil' bit :D</span>
          <button onClick={() => handleCheatCookies(1e33)}>Cheat 1e33 cookies</button>
          <button onClick={() => handleCheatBuildings(10)}>Cheat 10 buildings</button>
        </section>
      </section>
      <span></span>
    </div>
  )
}