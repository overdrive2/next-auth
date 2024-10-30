import { createInsertSchema } from "drizzle-zod";
import { text, pgTable, pgEnum, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

export const UserRole = pgEnum('user_role', ['admin', 'user', 'superuser']);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  email: varchar({ length: 100 }),
  image: text("image"),
  password: varchar({ length: 256 }).notNull(),
  role: UserRole().default("user"),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  }),
});

export const insertUserSchema = createInsertSchema(users);