import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Categories from "./_components/categories";
import Seasons from "./_components/seasons";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import CoursesList from "@/components/courses-list";

interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
    seasonId: string;
  };
}
const Search = async ({ searchParams }: SearchProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
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
  const courses = await getCourses({ userId, ...searchParams });

  return (
    <>
      <div className="px-6 pt-6  md:hidden md:mb-0">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex flex-col  gap-y-2 ">
          <Categories items={categories} />
          <Seasons items={seasons} />
        </div>
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Search;
