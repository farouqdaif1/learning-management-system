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
import { cn } from "@/lib/utils";
const formSchema = z.object({
  userEmail: z.string().min(1, {
    message: "Title is required",
  }),
  courseId: z.string().min(1),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  chapterId: z.string().min(1),
  watches: z.string().min(1),
  seeTime: z.string().min(1),
});

const CreateUser = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
      name: "",
      courseId: "",
      chapterId: "",
      watches: "",
      seeTime: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const [courses, setCourses] = useState<
    { id: string; title: string; chapters: any[] }[]
  >([]);
  const [chapters, setChapters] = useState<{ id: string; title: string }[]>([]);

  const selectedCourseId = form.watch("courseId");
  const watchTime = [
    { "1": "1 مشاهدة" },
    { "2": "2 مشاهدة" },
    { "3": "3 مشاهدة" },
    { "4": "4 مشاهدة" },
    { "5": "5 مشاهدة" },
    { "6": "6 مشاهدة" },
    { "7": "7 مشاهدة" },
    { "8": "8 مشاهدة" },
    { "9": "9 مشاهدة" },
    { "10": "10 مشاهدة" },
    { "11": "11 مشاهدة" },
    { "12": "12 مشاهدة" },
  ];
  const seeTime = [
    { "1": "ساعه" },
    { "2": "ساعتين" },
    { "3": "3 ساعه" },
    { "4": "4 ساعه" },
    { "5": "5 ساعه" },
    { "6": "6 ساعه" },
    { "12": "نصف يوم " },
    { "24": "يوم" },
    { "48": " يومين " },
    { "168": " اسبوع" },
    { "720": "شهر " },
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/chapterCustomer", {
        ...values,
        watches: parseInt(values.watches),
        seeTime: parseInt(values.seeTime),
      });
      toast.success("تم بيع المحاضرة الي المشتري بنجاح");
      router.push("/teacher/customerChapter");
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
  useEffect(() => {
    if (selectedCourseId) {
      const filteredCourses = courses.filter(
        (course) => course.id === selectedCourseId
      );
      setChapters(filteredCourses[0].chapters);
    }
  }, [courses, selectedCourseId]);
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
          <div
            className={cn(
              !selectedCourseId &&
                "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
            )}
          >
            <FormField
              control={form.control}
              name="chapterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> اختر المحاضرة </FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      options={chapters.map((chapter) => ({
                        label: chapter.title,
                        value: chapter.id,
                      }))}
                    />
                  </FormControl>
                  <FormDescription>
                    اخترالمحاضرة التي يريدها المشتري
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className={cn(
              !selectedCourseId &&
                "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
            )}
          >
            <FormField
              control={form.control}
              name="watches"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> عدد المشاهدات </FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      options={watchTime.map((watch) => ({
                        label: Object.values(watch)[0],
                        value: Object.keys(watch)[0],
                      }))}
                    />
                  </FormControl>
                  <FormDescription>عدد مراة مشاهدة المحاضرة</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className={cn(
              !selectedCourseId &&
                "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
            )}
          >
            <FormField
              control={form.control}
              name="seeTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> الوقت المسموح به </FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      options={seeTime.map((see) => ({
                        label: Object.values(see)[0],
                        value: Object.keys(see)[0],
                      }))}
                    />
                  </FormControl>
                  <FormDescription>
                    يمكنه مشاهدة في خلال عدد الساعات المحدد
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
            <Link href="/teacher/customers">
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
