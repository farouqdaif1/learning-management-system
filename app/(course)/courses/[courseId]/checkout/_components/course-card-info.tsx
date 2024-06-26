import Image from "next/image";
import { IconBadge } from "@/components/icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import CourseProgress from "@/components/cousre-progress";

interface CourseCardInfoProps {
  id: string;
  title: string;
  imageUrl: string;
  chapterLength: number;
  price: number;
  progress: number | null;
  category: string;
  season: string;
}
const CourseCardInfo = ({
  id,
  title,
  imageUrl,
  chapterLength,
  price,
  progress,
  category,
  season,
}: CourseCardInfoProps) => {
  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image fill className="object-cover" alt={title} src={imageUrl} />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium ">{title}</div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground border rounded-full p-[6px] bg-slate-sky-600">
            {category}
          </p>
          <p className="text-xs text-muted-foreground border rounded-full p-[6px] bg-slate-sky-600">
            {season}
          </p>
        </div>

        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <IconBadge size="sm" icon={BookOpen} />
            <span>
              {chapterLength}
              {chapterLength === 1 ? " Chapter" : " Chapters"}
            </span>
          </div>
        </div>
        {progress !== null ? (
          <CourseProgress
            size="sm"
            value={progress}
            variant={progress === 100 ? "success" : "default"}
          />
        ) : (
          <p className="text-md md:text-sm font-medium text-slate-700">
            {formatPrice(price)}
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseCardInfo;
