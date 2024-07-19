"use client";
import { Season } from "@prisma/client";
import { IconType } from "react-icons";
import { PiNumberCircleOne, PiNumberCircleTwo } from "react-icons/pi";
import { BsEraser } from "react-icons/bs";
import SeasonItem from "./season-item";

interface SeasonsProps {
  items: Season[];
}
const Seasons = ({ items }: SeasonsProps) => {
  const iconMap: Record<Season["name"], IconType> = {
    "الترم الاول": PiNumberCircleOne,
    "الترم الثاني": PiNumberCircleTwo,
    عامة: BsEraser,
  };
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto  pb-2">
      {items.map((item) => (
        <SeasonItem
          key={item.id}
          label={item.name}
          value={item.id}
          icon={iconMap[item.name]}
        />
      ))}
    </div>
  );
};

export default Seasons;
