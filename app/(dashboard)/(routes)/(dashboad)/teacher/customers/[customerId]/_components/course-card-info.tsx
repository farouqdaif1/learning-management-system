"use client";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CourseCardInfoProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}
const CourseCardInfo = ({
  id,
  title,
  imageUrl,
  price,
}: CourseCardInfoProps) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/customers/purchase/${id}`);
      toast.success("تم الحذف بنجاح");
      router.refresh();
    } catch (error) {
      toast.error("حدث خطأ ما");
    }
  };
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
      <div>
        <button
          className=" group-hover:bg-slate-100 group-hover:text-gold-foreground transition-all w-full mt-2 py-2 rounded-md text-sm font-medium text-white bg-gold-foreground text-center"
          type="button"
          onClick={() => {
            handleDelete(id);
          }}
        >
          <span className="flex flex-row  justify-center items-center">
            <TrashIcon />
            مسح من المشتريات
          </span>
        </button>
      </div>
    </div>
  );
};

export default CourseCardInfo;
