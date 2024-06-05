import Image from "next/image";
import { formatPrice } from "@/lib/format";

interface CourseCardInfoProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}
const CourseCardInfo = ({ title, imageUrl, price }: CourseCardInfoProps) => {
  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-auto w-96">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image fill className="object-cover" alt={title} src={imageUrl} />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium ">{title}</div>
        <p className="text-md md:text-sm font-medium text-slate-700">
          {formatPrice(price)}
        </p>
      </div>
    </div>
  );
};

export default CourseCardInfo;
