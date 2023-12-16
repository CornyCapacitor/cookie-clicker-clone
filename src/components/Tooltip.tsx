import './Tooltip.css'

type TooltipProps = {
  name: string,
  price: number,

}

export const BuildingTooltip = ({ name, price }: TooltipProps) => {
  return (
    <div className="tooltip">
      <span>{name}</span>
      <span>{price}</span>
    </div>
  )
}

export const UpgradeTooltip = ({ name, price }: TooltipProps) => {
  return (
    <div className="tooltip">
      <span>{name}</span>
      <span>{price}</span>
    </div>
  )
}