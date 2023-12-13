import './Building.css'

type BuildingProps = {
  name: string,
  price: number,
  image: string,
  owned: number
}

export const Building = ({ name, price, image, owned }: BuildingProps) => {
  return (
    <div className="building">
      <img className="building-image" src={image} />
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