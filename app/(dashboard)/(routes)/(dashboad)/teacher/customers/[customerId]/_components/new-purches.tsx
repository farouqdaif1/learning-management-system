"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import { Combobox } from "@/components/ui/combobox";
import { useEffect, useState } from "react";
const formSchema = z.object({
  userEmail: z.string().min(1, {
    message: "Title is required",
  }),
  courseId: z.string().min(1),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
interface NewPurchasesProps {
  name: string;
  email: string;
}
const NewPurchases = ({ name, email }: NewPurchasesProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: email,
      name: name,
      courseId: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/customers", values);
      toast.success("تم بيع الكورس الي المشتري بنجاح");
      form.reset();

      router.refresh();
    } catch (error) {
      toast.error("حدث شئ خاطئ");
    }
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        const courses = res.data;

        setCourses(courses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, []);
  return (
    <div className="p-6">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8"
        >
          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel> اختر المسار </FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    options={courses.map((course) => ({
                      label: course.title,
                      value: course.id,
                    }))}
                  />
                </FormControl>
                <FormDescription>
                  اختر المسار الذي ينتمي له المشتري
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={!isValid || isSubmitting}>
              بيع الكورس
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewPurchases;
