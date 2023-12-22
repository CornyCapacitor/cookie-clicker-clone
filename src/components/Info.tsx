import './Header.css'

export const Info = () => {
  return (
    <div className="main">
      <header>Info</header>
      <section className="section">
        <header>General</header>
        <section>
          <span>Thanks for testing my cookie clicker clone game! I'm aware that this app isn't exactly like cookie clicker, but I only wanted to implement some of basic game logic to test how is it working out in the wild. If you have any questions, you can find me through any of the sites below I'm signed to. Have a nice day, player! :)</span>
        </section>
      </section>
      <section className="section">
        <header>Find me there</header>
        <section className="icons-section">
          <a href="https://github.com/HornyCapacitor" target="_blank" >
            <img className="icon" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
          </a>
          <a href="https://linkedin.com/in/mateusz-minder-b19303257" target="_blank" >
            <img className="icon" src="https://cdn.icon-icons.com/icons2/2428/PNG/512/linkedin_black_logo_icon_147114.png" />
          </a>
        </section>
      </section>
    </div>
  )
}