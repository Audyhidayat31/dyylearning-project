// Dashboard router yang menampilkan komponen sesuai role
import { useAuth } from "@/context/AuthContext";
import { StudentDashboard } from "./dashboards/StudentDashboard";
import { InstructorDashboard } from "./dashboards/InstructorDashboard";
import { AdminDashboard } from "./dashboards/AdminDashboard";

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;
  if (user.role === "STUDENT")    return <StudentDashboard />;
  if (user.role === "INSTRUCTOR") return <InstructorDashboard />;
  return <AdminDashboard />;
}
