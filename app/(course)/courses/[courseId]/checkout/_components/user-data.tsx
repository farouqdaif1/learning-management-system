"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CourseCardInfo from "./course-card-info";
import CourseEnrollButton from "./course-enroll-button-info";
import CourseEnrollButtonInfo from "./course-enroll-button-info";
interface UserDataFormProps {
  id: string;
  title: string;
  imageUrl: string;
  chapterLength: number;
  price: number;
  category: string;
  season: string;
}
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
});
const UserDataForm = ({
  id,
  title,
  imageUrl,
  chapterLength,
  price,
  category,
  season,
}: UserDataFormProps) => {
  const onSubmit = () => {
    console.log("submitted");
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
  });
  return (
    <div className="p-6 grid md:grid-cols-2 grid-cols-1">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="+2010123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="p-6">
        <CourseCardInfo
          id={id}
          title={title}
          imageUrl={imageUrl!}
          price={price!}
          category={category!}
          season={season!}
          chapterLength={chapterLength!}
          progress={null}
        />
      </div>
      <div className="w-full flex flex-row items-center justify-end mr-3">
        <CourseEnrollButtonInfo courseId={id} price={price} />
      </div>
    </div>
  );
};

export default UserDataForm;
