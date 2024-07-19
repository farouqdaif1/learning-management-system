"use client";
import { Category } from "@prisma/client";
import {
  BsPeople,
  BsBook,
  BsBookmarkCheck,
  BsPalette,
  BsGraphUp,
} from "react-icons/bs";
import { IconType } from "react-icons";

import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}
const Categories = ({ items }: CategoriesProps) => {
  const iconMap: Record<Category["name"], IconType> = {
    "الفرقة الاولي": BsPeople,
    "الفرقة الثانية": BsPeople,
    "الفرقة الثالثة": BsPeople,
    "الفرقة الرابعه": BsPeople,
    دورات: BsBook,
    ندوات: BsBookmarkCheck,
    اخري: BsPalette,
    دبلومات: BsGraphUp,
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
