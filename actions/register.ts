/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import * as z from "zod"
import bcrypt from "bcryptjs";

import { db } from "@/db/prisma";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
   const validateFields = RegisterSchema.safeParse(values);

   if (!validateFields.success) {
      return { error: "Invalid fields!" }
   }

   const { email, password, name } = validateFields.data;
   const hashedPassword = await bcrypt.hash(password, 10); 

   const existingUser = await db.user.findUnique({
      where: { 
         email 
      },
   });

   if (existingUser) {
      return { error: "User already in use!"}
   }

   await db.user.create({ 
      data: {
         email, 
         password: hashedPassword, 
         name
      }
   });

   return { success: "User created!"};
};