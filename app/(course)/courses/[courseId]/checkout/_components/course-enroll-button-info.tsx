"use client";
// import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
// import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

const CourseEnrollButtonInfo = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const onEnroll = async () => {
    // try {
    // setIsLoaded(true);
    // const { data } = await axios.get(`/api/courses/${courseId}/checkout`);
    router.push(`/courses/${courseId}/checkout`);
    // router.push(`${data}`);

    // console.log("Front end", data);
    // } catch (error) {
    // toast.error("Payment failed. Please try again.");
    // } finally {
    //   setIsLoaded(false);
    // }
  };
  return (
    <Button onClick={onEnroll} className="w-full md:w-auto" disabled={isLoaded}>
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButtonInfo;
