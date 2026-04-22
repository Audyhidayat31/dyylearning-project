import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { COURSES, Course, Lesson } from "@/data/mockData";

interface CourseContextType {
  courses: Course[];
  categories: string[];
  addCourse: (course: Omit<Course, "id">) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  getCourseById: (id: string) => Course | undefined;
  addCategory: (name: string) => void;
  updateCategory: (oldName: string, newName: string) => void;
  deleteCategory: (name: string) => void;
}

const CourseContext = createContext<CourseContextType | null>(null);
const COURSES_KEY = "dyylearning_courses";
const CATEGORIES_KEY = "dyylearning_categories";

const DEFAULT_CATEGORIES = ["Web Development", "Backend", "Design", "Data Science"];

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(() => {
    const raw = localStorage.getItem(COURSES_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      const merged = [...COURSES];
      stored.forEach((s: Course) => {
        if (!merged.find(m => m.id === s.id)) merged.push(s);
      });
      return merged;
    }
    return COURSES;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (raw) return JSON.parse(raw);
    return DEFAULT_CATEGORIES;
  });

  const persistCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
    localStorage.setItem(COURSES_KEY, JSON.stringify(newCourses));
  };

  const persistCategories = (newCats: string[]) => {
    setCategories(newCats);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(newCats));
  };

  const addCourse = (courseData: Omit<Course, "id">) => {
    const newCourse: Course = { ...courseData, id: `c${Date.now()}` };
    persistCourses([...courses, newCourse]);
  };

  const updateCourse = (id: string, courseData: Partial<Course>) => {
    persistCourses(courses.map(c => c.id === id ? { ...c, ...courseData } : c));
  };

  const deleteCourse = (id: string) => {
    persistCourses(courses.filter(c => c.id !== id));
  };

  const getCourseById = (id: string) => courses.find(c => c.id === id);

  const addCategory = (name: string) => {
    if (!categories.includes(name)) persistCategories([...categories, name]);
  };

  const updateCategory = (oldName: string, newName: string) => {
    persistCategories(categories.map(c => c === oldName ? newName : c));
    // Also update courses that use this category
    persistCourses(courses.map(c => c.category === oldName ? { ...c, category: newName } : c));
  };

  const deleteCategory = (name: string) => {
    persistCategories(categories.filter(c => c !== name));
  };

  return (
    <CourseContext.Provider value={{ 
      courses, categories, addCourse, updateCourse, deleteCourse, getCourseById,
      addCategory, updateCategory, deleteCategory 
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourses harus di dalam CourseProvider");
  return ctx;
}
