import './Building.css';

type BuildingProps = {
  name: string,
  price: number,
  image: string,
  owned: number
  buyBuilding: (name: string) => void;
}

export const Building = ({ name, price, image, owned, buyBuilding }: BuildingProps) => {

  const handleBuildingClick = () => {
    buyBuilding(name);
  }

  return (
    <div className="building" id={name} onClick={() => handleBuildingClick()}>
      <img className="building-image" src={`/public/buildings/${image}`} />
      <div className="building-info">
        <span className="building-name">{name}</span>
        <div className="building-price-container">
          <img className="building-cookie" src="/public/big-cookie.svg" />
          <span className="building-price">{price}</span>
        </div>
      </div>
      <span className="building-owned">{owned}</span>
    </div>
  )
}