import { useRef, useState } from "react";
import { UpgradeTooltip } from "./Tooltip";

import './Upgrade.css';

type UpgradeImageProps = {
  cookiesInBank: number,
  cps: number,
  name: string,
  building?: string,
  description: string,
  price: number,
  image: string,
  tier: string,
};

export const UpgradeImage = ({ cookiesInBank, cps, name, building, description, price, image, tier }: UpgradeImageProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);
  const [right, setRight] = useState<number>(0);

  const divRef = useRef<HTMLDivElement | null>(null)

  const mouseEnterHandler = () => {
    setIsTooltipVisible(true)

    if (divRef.current) {
      const divPosition = divRef.current.getBoundingClientRect();
      const newY = divPosition.top + 1;
      const newX = screen.width - divPosition.right + 60;
      setTop(newY)
      setRight(newX)
    }
  }

  return (
    <>
      <div
        onMouseEnter={() => mouseEnterHandler()}
        onMouseLeave={() => setIsTooltipVisible(false)}
        className="upgrade"
        id={name}
        ref={divRef}
      >
        <img src={`/upgrades/${image}`} alt={name} />
      </div>
      {isTooltipVisible && <UpgradeTooltip cookiesInBank={cookiesInBank} cps={cps} name={name} building={building} description={description} price={price} image={image} tier={tier} top={top} right={right} />}
    </>
  );
};