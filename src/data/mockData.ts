// Mock data dummy untuk frontend (representasi seed backend)
export type Role = "ADMIN" | "INSTRUCTOR" | "STUDENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  password?: string;
  avatar?: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: "VIDEO" | "PDF" | "TEXT";
  content: string;
  duration?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  thumbnail: string;
  instructor: string;
  students: number;
  rating: number;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  answer: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  questions: QuizQuestion[];
}

// ============ DEMO USERS ============
export const DEMO_USERS: User[] = [
  { id: "u1", name: "Admin Demo", email: "admin@gmail.com", role: "ADMIN", password: "password123" },
  { id: "u2", name: "Budi Pengajar", email: "guru@gmail.com", role: "INSTRUCTOR", password: "password123" },
  { id: "u3", name: "Siti Murid", email: "siswa@gmail.com", role: "STUDENT", password: "password123" },
];

// ============ COURSES ============
export const COURSES: Course[] = [
  {
    id: "c1",
    title: "React.js untuk Pemula",
    description: "Pelajari fondasi React: komponen, props, state, hooks, dan routing modern.",
    category: "Web Development",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    instructor: "Budi Pengajar",
    students: 1284,
    rating: 4.8,
    lessons: [
      { id: "l1", title: "Pengenalan React", type: "VIDEO", content: "https://www.youtube.com/embed/Tn6-PIqc4UM", duration: "12:34" },
      { id: "l2", title: "JSX & Komponen", type: "TEXT", content: "JSX adalah ekstensi sintaks JavaScript yang memungkinkan kita menulis HTML di dalam JS. Setiap komponen React mengembalikan elemen JSX." },
      { id: "l3", title: "useState & useEffect", type: "VIDEO", content: "https://www.youtube.com/embed/O6P86uwfdR0", duration: "18:20" },
      { id: "l4", title: "Cheatsheet Hooks", type: "PDF", content: "https://example.com/hooks.pdf" },
    ],
  },
  {
    id: "c2",
    title: "Node.js & Express REST API",
    description: "Bangun REST API production-ready dengan Express, middleware, dan autentikasi JWT.",
    category: "Backend",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    instructor: "Budi Pengajar",
    students: 842,
    rating: 4.7,
    lessons: [
      { id: "l5", title: "Setup Express", type: "VIDEO", content: "https://www.youtube.com/embed/L72fhGm1tfE", duration: "10:00" },
      { id: "l6", title: "Routing & Middleware", type: "TEXT", content: "Middleware adalah fungsi yang dijalankan sebelum handler route." },
    ],
  },
  {
    id: "c3",
    title: "UI/UX Design Fundamentals",
    description: "Prinsip desain modern: hirarki visual, tipografi, warna, dan interaksi.",
    category: "Design",
    level: "Beginner",
    thumbnail: "https://s3-alpha.figma.com/hub/file/2942566861/7e3aaade-4be8-47a8-aa6c-fe6f0c220316-cover.png",
    instructor: "Budi Pengajar",
    students: 2150,
    rating: 4.9,
    lessons: [
      { id: "l7", title: "Pengenalan UI/UX", type: "VIDEO", content: "https://www.youtube.com/embed/c9Wg6Cb_YlU", duration: "15:00" },
    ],
  },
  {
    id: "c4",
    title: "Python untuk Data Science",
    description: "Pandas, NumPy, dan visualisasi data untuk analisis modern.",
    category: "Data Science",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
    instructor: "Budi Pengajar",
    students: 1670,
    rating: 4.8,
    lessons: [
      { id: "l8", title: "Intro Pandas", type: "VIDEO", content: "https://www.youtube.com/embed/vmEHCJofslg", duration: "20:00" },
    ],
  },
];

export const QUIZZES: Quiz[] = [
  {
    id: "q1",
    courseId: "c1",
    title: "Quiz Dasar React",
    questions: [
      { id: "qq1", text: "Apa itu JSX?", options: ["Bahasa baru", "Sintaks JS yang mirip HTML", "Library CSS", "Database"], answer: 1 },
      { id: "qq2", text: "Hook untuk state adalah?", options: ["useEffect", "useState", "useMemo", "useRef"], answer: 1 },
      { id: "qq3", text: "Komponen React mengembalikan?", options: ["String", "JSX/Element", "Function", "Object"], answer: 1 },
    ],
  },
];
