export const Options = () => {
  return (
    <div className="main">
      <header>Options</header>
      <section className="section">
        <header>General</header>
        <section className="section-section">
          <div>Volume:</div>
          <input type="number" />
          <div>Refresh rate:</div>
          <input type="number" max="40" />
        </section>
      </section>
      <span></span>
    </div>
  )
}