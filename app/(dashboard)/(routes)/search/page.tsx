import { db } from "@/lib/db";
import Categories from "./_components/categories";
import Seasons from "./_components/seasons";

const Search = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const seasons = await db.season.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="p-6 flex items-center gap-x-2 ">
      <Categories items={categories} />
      <Seasons items={seasons} />
    </div>
  );
};

export default Search;
