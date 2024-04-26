"use client";
import qs from "query-string";
import { useEffect, useState } from "react";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategoryId = searchParams.get("categoryId");
  const currentSeasonId = searchParams.get("seasonId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          seasonId: currentSeasonId,
          title: debouncedValue,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url);
  }, [debouncedValue, currentCategoryId, currentSeasonId, pathname, router]);
  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="ماذا تريد ان تتعلم ؟"
      />
    </div>
  );
};

export default SearchInput;
