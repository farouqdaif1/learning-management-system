"use client";

import ConfirmModal from "@/components/modals/confirm-modals";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteCustomerProps {
  customerId: string;
}
const DeleteCustomer = ({ customerId }: DeleteCustomerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/customers/${customerId}`);
      router.push("/teacher/customers");
      toast.success("تم حذف العميل بنجاح");
      router.refresh();
    } catch (error) {
      toast.error("فشل في حذف العميل");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" w-full mb-10 flex justify-end items-center gap-x-2 font-medium">
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default DeleteCustomer;
