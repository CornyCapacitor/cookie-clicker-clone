import './Milk.css'

type MilkProps = {
  color: string,
}

export const Milk = ({ color }: MilkProps) => {
  color

  return (
    <div className="milk">
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </div>
  )
}