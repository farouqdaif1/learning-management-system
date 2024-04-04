import { db } from "@/lib/db";
import Categories from "./_components/categories";
import Seasons from "./_components/seasons";
import SearchInput from "@/components/search-input";

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
    <>
      <div className="px-6 pt-6  md:hidden md:mb-0">
        <SearchInput />
      </div>
      <div className="p-6 flex flex-col  gap-y-2 ">
        <Categories items={categories} />
        <Seasons items={seasons} />
      </div>
    </>
  );
};

export default Search;
