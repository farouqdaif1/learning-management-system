import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ExploreOurCourses = () => {
  return (
    <div className="font-Almarai  min:h-screen md:flex flex-col justify-center items-center bg-gray-bg space-y-5 pt-5 pb-5">
      <div className="w-full ">
        <h2 className="w-full text-5xl  font-bold text-center  text-gold">
          دوراتـــــــــنـا
        </h2>
      </div>
      <div className="p-2 w-[95%] grid grid-cols-1 md:grid-cols-3 gab-10 md:space-x-10 space-y-5 items-center justify-center">
        <div className="relative w-[80%] aspect-square rounded-md overflow-hidden m-auto">
          <Image
            className="w-full h-full object-contain rounded-xl"
            alt="one"
            src="/one.webp"
            fill
          />
        </div>
        <div className="relative w-[80%] aspect-square rounded-md overflow-hidden m-auto">
          <Image
            className="w-full h-full object-contain rounded-xl"
            alt="one"
            src="/two.webp"
            fill
          />
        </div>
        <div className="relative  w-[80%] aspect-square rounded-md overflow-hidden m-auto">
          <Image
            className="w-full h-full object-contain rounded-xl"
            alt="one"
            src="/three.webp"
            fill
          />
        </div>
      </div>
      <div className="w-full h-[10%] flex flex-col justify-center items-center mb-10 ">
        <Link href="/search">
          <Button className="bg-gradient-to-l from-gradient-2 to-gradient-3  rounded-xl text-black hover:bg-gold text-xl font-medium text-center">
            تصفح جميع الكورسات
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ExploreOurCourses;
