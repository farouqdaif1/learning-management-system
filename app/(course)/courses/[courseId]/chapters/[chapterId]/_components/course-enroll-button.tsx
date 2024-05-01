"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/navigation";
interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  const router = useRouter();
  const onEnroll = async () => {
    router.push(`/courses/${courseId}/checkout`);
  };
  return (
    <Button onClick={onEnroll} className="w-full md:w-auto">
      Check out {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
