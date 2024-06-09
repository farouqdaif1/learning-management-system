"use client";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  massage: z.string().min(10, {
    message: "Please enter a valid message.",
  }),
});
const ContactUs = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      massage: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {};
  return (
    <div
      id="contact-us"
      className="w-full min:h-screen bg-gray-bg font-Almarai  "
    >
      <div className=" h-[100%]  grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center mt-5 mb-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col justify-start w-[80%]"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-end text-lg">
                      الاسم
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel className="flex justify-end text-lg">
                      البريد الالكتروني
                    </FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
                    <FormLabel className="flex justify-end text-lg">
                      رقم الهاتف
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="massage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-end text-lg">
                      الرسالة
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex flex-row items-center justify-start mr-3">
                <Button
                  className="w-full md:w-auto bg-gradient-to-l from-gradient-2 to-gradient-3 font-medium text-white"
                  type="submit"
                >
                  تواصل الان
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div
          className="flex justify-center items-center order-first md:order-last "
          style={{
            backgroundImage: "url('/vector.webp')",
            backgroundSize: "contain",
          }}
        >
          <p className="w-[100%] text-[7.5rem] text-brown font-bold flex flex-col justify-end items-center">
            تواصل
            <br />
            <span className="text-gold ">معانـــا</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
