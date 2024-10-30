/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState, useTransition } from "react";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage, 
 } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
/*
type FormValues = z.input<typeof loginSchema>;

type Props = {
   email?: string;
   password?: string;
   onSubmit: (values: FormValues) => void;
   disabled?: boolean;
};
*/
const RegisterForm = () => {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransaction] = useTransition();
   
   const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         email: "",
         password: "",
         name: "",
      }
   });

   const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
      setError("");
      setSuccess("");

      startTransition(()=> {
         register(values)
         .then((data) => {
            setError(data.error);
            setSuccess(data.success);
         });
      });
      console.log(values);
   }

   return (
      <CardWrapper
         headerLabel="Welcome back"
         backButtonLabel="Have an account?"
         backButtonHref="/sign-in"
         showSocial
      >
         <Form {...form}>
            <form 
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-6"
            >
               <div className="space-y-4">
               <FormField 
                     name="name"
                     disabled={isPending}
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>
                              Name
                           </FormLabel>
                           <FormControl>
                              <Input 
                                 {...field}
                                 placeholder="User Name"
                                 type="text"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField 
                     name="email"
                     disabled={isPending}
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>
                              Email
                           </FormLabel>
                           <FormControl>
                              <Input 
                                 {...field}
                                 placeholder="Email Address"
                                 type="email"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField 
                     disabled={isPending}
                     name="password"
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>
                              Password
                           </FormLabel>
                           <FormControl>
                              <Input 
                                 {...field}
                                 placeholder="******"
                                 type="password"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormError message={error} />
               <FormSuccess message={success} />
               <Button 
                  disabled={isPending}
                  className="w-full"
               >
                  Login
               </Button>
            </form>
         </Form>
      </CardWrapper>
   )
}

export default RegisterForm; 