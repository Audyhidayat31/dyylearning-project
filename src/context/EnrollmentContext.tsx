// Context untuk enrollment & progress (demo localStorage)
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface EnrollmentContextType {
  enrolled: string[];                    // courseId[]
  completedLessons: string[];            // lessonId[]
  quizScores: Record<string, { score: number; total: number }>;
  enroll: (courseId: string) => void;
  toggleLesson: (lessonId: string) => void;
  setQuizScore: (quizId: string, score: number, total: number) => void;
}

const Ctx = createContext<EnrollmentContextType | null>(null);

export function EnrollmentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const key = (k: string) => `dyylearning_${user?.id || "guest"}_${k}`;

  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [completedLessons, setCompleted] = useState<string[]>([]);
  const [quizScores, setScores] = useState<Record<string, { score: number; total: number }>>({});

  // Reload tiap user berubah
  useEffect(() => {
    setEnrolled(JSON.parse(localStorage.getItem(key("enroll")) || "[]"));
    setCompleted(JSON.parse(localStorage.getItem(key("lessons")) || "[]"));
    setScores(JSON.parse(localStorage.getItem(key("scores")) || "{}"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const persist = (k: string, v: unknown) => localStorage.setItem(key(k), JSON.stringify(v));

  const enroll = (courseId: string) => {
    if (enrolled.includes(courseId)) return;
    const next = [...enrolled, courseId];
    setEnrolled(next); persist("enroll", next);
  };

  const toggleLesson = (lessonId: string) => {
    const next = completedLessons.includes(lessonId)
      ? completedLessons.filter((x) => x !== lessonId)
      : [...completedLessons, lessonId];
    setCompleted(next); persist("lessons", next);
  };

  const setQuizScore = (quizId: string, score: number, total: number) => {
    const next = { ...quizScores, [quizId]: { score, total } };
    setScores(next); persist("scores", next);
  };

  return (
    <Ctx.Provider value={{ enrolled, completedLessons, quizScores, enroll, toggleLesson, setQuizScore }}>
      {children}
    </Ctx.Provider>
  );
}

export function useEnrollments() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useEnrollments butuh EnrollmentProvider");
  return c;
}
