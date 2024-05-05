"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Combobox } from "@/components/ui/combobox";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SeasonFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}
const formSchema = z.object({
  seasonId: z.string().min(1),
});
const SeasonForm = ({ initialData, courseId, options }: SeasonFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggle = () => {
    setIsEditing((curr) => !curr);
  };
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seasonId: initialData?.seasonId || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Semester Updated");
      toggle();
      router.refresh();
    } catch (error) {
      toast.error("Something  Went wrong");
    }
  };
  const selectedOption = options.find(
    (option) => option.value === initialData.seasonId
  );
  return (
    <div className="p-4 bg-slate-100 border mt-6 rounded-md ">
      <div className="font-medium flex items-center justify-between">
        Course semester
        <Button onClick={toggle} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      <div>
        {!isEditing && (
          <p
            className={cn(
              "text-sm mr-2",
              !initialData.seasonId && "text-slate-500 italic"
            )}
          >
            {selectedOption?.label || "No Semester Provided"}
          </p>
        )}
        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="seasonId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Combobox {...field} options={options} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default SeasonForm;
