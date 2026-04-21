import { pgTable, text, timestamp, boolean, integer, doublePrecision, pgEnum, uniqueIndex, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["STUDENT", "INSTRUCTOR", "ADMIN"]);

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: userRoleEnum("role").default("STUDENT").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const categories = pgTable("category", {
  id: text("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const courses = pgTable("course", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  thumbnail: text("thumbnail"),
  price: doublePrecision("price").default(0).notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  categoryId: text("category_id").references(() => categories.id),
  instructorId: text("instructor_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
}, (table) => {
  return {
    categoryIdx: index("course_category_id_idx").on(table.categoryId),
    instructorIdx: index("course_instructor_id_idx").on(table.instructorId),
  };
});

export const sections = pgTable("section", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  order: integer("order").notNull(),
  courseId: text("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
}, (table) => {
  return {
    courseIdx: index("section_course_id_idx").on(table.courseId),
  };
});

export const lessons = pgTable("lesson", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  videoUrl: text("video_url"),
  position: integer("position").notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  isFree: boolean("is_free").default(false).notNull(),
  sectionId: text("section_id").references(() => sections.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
}, (table) => {
  return {
    sectionIdx: index("lesson_section_id_idx").on(table.sectionId),
  };
});

export const enrollments = pgTable("enrollment", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  courseId: text("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
}, (table) => {
  return {
    userCourseIdx: uniqueIndex("enrollment_user_id_course_id_idx").on(table.userId, table.courseId),
    courseIdx: index("enrollment_course_id_idx").on(table.courseId),
  };
});

export const progress = pgTable("progress", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  lessonId: text("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
}, (table) => {
  return {
    userLessonIdx: uniqueIndex("progress_user_id_lesson_id_idx").on(table.userId, table.lessonId),
    lessonIdx: index("progress_lesson_id_idx").on(table.lessonId),
  };
});

export const reviews = pgTable("review", {
  id: text("id").primaryKey(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  courseId: text("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
}, (table) => {
  return {
    userCourseIdx: uniqueIndex("review_user_id_course_id_idx").on(table.userId, table.courseId),
    courseIdx: index("review_course_id_idx").on(table.courseId),
  };
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  courses: many(courses, { relationName: "instructor_courses" }),
  enrollments: many(enrollments),
  reviews: many(reviews),
  progress: many(progress),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  category: one(categories, {
    fields: [courses.categoryId],
    references: [categories.id],
  }),
  instructor: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
    relationName: "instructor_courses",
  }),
  sections: many(sections),
  enrollments: many(enrollments),
  reviews: many(reviews),
}));

export const sectionsRelations = relations(sections, ({ one, many }) => ({
  course: one(courses, {
    fields: [sections.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  section: one(sections, {
    fields: [lessons.sectionId],
    references: [sections.id],
  }),
  userProgress: many(progress),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(users, {
    fields: [progress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [progress.lessonId],
    references: [lessons.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [reviews.courseId],
    references: [courses.id],
  }),
}));
