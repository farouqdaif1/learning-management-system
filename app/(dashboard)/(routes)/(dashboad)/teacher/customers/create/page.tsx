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
    message: "Title is required",
  }),
});

const CreateUser = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
      name: "",
      courseId: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const [courses, setCourses] = useState<{ id: string; title: string }[]>([]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    try {
      console.log(values);

      const res = await axios.post("/api/customers", values);
      // router.push(`/teacher/courses/${res.data.id}`);
      toast.success("تم بيع الكورس الي المشتري بنجاح");
      // router.push("/teacher/customers");
    } catch (error) {
      toast.error("حدث شئ خاطئ");
    }
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        const courses = res.data;
        console.log(courses);
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
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel> البريد الالكتروني الخاص بالمشتري </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  ادخل البريد الالكتروني للمستخدم الذي تريد انشاء حساب له
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الخاص بالمشتري </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="احمد فاروق علي"
                    {...field}
                  />
                </FormControl>
                <FormDescription> اسم المشرتي للمسار </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Link href="/teacher/buyers">
              <Button type="button" variant="ghost">
                الغاء
              </Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              انشاء
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateUser;
