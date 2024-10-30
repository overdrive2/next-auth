CREATE TYPE "public"."user_role" AS ENUM('admin', 'user', 'superuser');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"image" text,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'user'
);
