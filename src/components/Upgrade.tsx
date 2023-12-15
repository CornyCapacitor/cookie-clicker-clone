import './Upgrade.css';

type UpgradeProps = {
  name: string,
  image: string,
  buyUpgrade: (name: string) => void;
}

export const Upgrade = ({ name, image, buyUpgrade }: UpgradeProps) => {

  const handleUpgradeClick = () => {
    buyUpgrade(name)
  }

  return (
    <div className="upgrade" id={name} onClick={() => handleUpgradeClick()}>
      <img src={`/public/upgrades/${image}`} />
    </div>
  )
}