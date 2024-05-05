"use client";
import { Category } from "@prisma/client";
import { BsFillPeopleFill } from "react-icons/bs";
import { IconType } from "react-icons";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}
const Categories = ({ items }: CategoriesProps) => {
  const iconMap: Record<Category["name"], IconType> = {
    "الفرقة الاولي": BsFillPeopleFill,
    "الفرقة الثانية": BsFillPeopleFill,
    "الفرقة الثالثة": BsFillPeopleFill,
    "الفرقة الرابعه": BsFillPeopleFill,
  };
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto  pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          value={item.id}
          icon={iconMap[item.name]}
        />
      ))}
    </div>
  );
};

export default Categories;
