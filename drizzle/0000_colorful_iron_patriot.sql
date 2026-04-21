CREATE TYPE "public"."user_role" AS ENUM('STUDENT', 'INSTRUCTOR', 'ADMIN');--> statement-breakpoint
CREATE TABLE "category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "course" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"thumbnail" text,
	"price" double precision DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"category_id" text,
	"instructor_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "course_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "enrollment" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"video_url" text,
	"position" integer NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"is_free" boolean DEFAULT false NOT NULL,
	"section_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "progress" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" text PRIMARY KEY NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"user_id" text NOT NULL,
	"course_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "section" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"order" integer NOT NULL,
	"course_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"email_verified" timestamp,
	"image" text,
	"password" text,
	"role" "user_role" DEFAULT 'STUDENT' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_instructor_id_user_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_section_id_section_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."section"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_lesson_id_lesson_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lesson"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "section" ADD CONSTRAINT "section_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "course_category_id_idx" ON "course" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "course_instructor_id_idx" ON "course" USING btree ("instructor_id");--> statement-breakpoint
CREATE UNIQUE INDEX "enrollment_user_id_course_id_idx" ON "enrollment" USING btree ("user_id","course_id");--> statement-breakpoint
CREATE INDEX "enrollment_course_id_idx" ON "enrollment" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX "lesson_section_id_idx" ON "lesson" USING btree ("section_id");--> statement-breakpoint
CREATE UNIQUE INDEX "progress_user_id_lesson_id_idx" ON "progress" USING btree ("user_id","lesson_id");--> statement-breakpoint
CREATE INDEX "progress_lesson_id_idx" ON "progress" USING btree ("lesson_id");--> statement-breakpoint
CREATE UNIQUE INDEX "review_user_id_course_id_idx" ON "review" USING btree ("user_id","course_id");--> statement-breakpoint
CREATE INDEX "review_course_id_idx" ON "review" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX "section_course_id_idx" ON "section" USING btree ("course_id");