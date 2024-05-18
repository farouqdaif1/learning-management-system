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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/format";
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
  });
  const router = useRouter();

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoaded(true);
      const paymentKey = await axios.post(
        `/api/courses/${id}/checkout`,
        values
      );
      // const { data } = await axios.post(`/api/courses/${id}/checkout`, values);
      router.push(
        `https://accept.paymob.com/api/acceptance/iframes/834821?payment_token=${paymentKey.data.token}`
      );

      // router.push(`${data}`);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsLoaded(false);
    }
  };
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="p-6 grid md:grid-cols-2 grid-cols-1">
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
            <div className="w-full flex flex-row items-center justify-end mr-3">
              <Button
                className="w-full md:w-auto"
                disabled={isLoaded || !isValid || isSubmitting}
                type="submit"
              >
                Enroll for {formatPrice(price)}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserDataForm;
