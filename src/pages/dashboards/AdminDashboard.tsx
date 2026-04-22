import { useAuth } from "@/context/AuthContext";
import { useCourses } from "@/context/CourseContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, BookOpen, GraduationCap, TrendingUp, Trash2, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

const roleColor: Record<string, string> = {
  STUDENT: "bg-success/20 text-success border-success/30",
  INSTRUCTOR: "bg-primary/20 text-primary-glow border-primary/30",
  ADMIN: "bg-warning/20 text-warning border-warning/30",
};

export const AdminDashboard = () => {
  const { allUsers, deleteUser } = useAuth();
  const { courses, categories } = useCourses();
  
  const totalEnrollments = courses.reduce((a, c) => a + (c.students || 0), 0);
  
  const stats = [
    { icon: Users,         label: "Total User",         value: allUsers.length, color: "text-primary-glow" },
    { icon: BookOpen,      label: "Total Kursus",       value: courses.length, color: "text-success" },
    { icon: GraduationCap, label: "Total Enrollment",   value: totalEnrollments.toLocaleString(), color: "text-warning" },
    { icon: ClipboardList, label: "Total Kategori",     value: categories.length, color: "text-primary-glow" },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Statistik Platform</h1>
          <p className="mt-1 text-muted-foreground">Pantau performa dyyLEARNING secara keseluruhan.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-gradient-card p-4 transition-smooth hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-background/50 ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="font-display text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card overflow-hidden">
          <div className="p-4 border-b border-border/40 flex items-center justify-between">
            <h2 className="font-display font-bold">User Terbaru</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/users">Kelola Semua</Link>
            </Button>
          </div>
          <div className="divide-y divide-border/40">
            {allUsers.slice(-5).reverse().map((u) => (
              <div key={u.id} className="flex items-center justify-between p-4 transition-smooth hover:bg-accent/10">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-primary text-[10px] text-primary-foreground">
                      {u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{u.name}</div>
                    <div className="text-[10px] text-muted-foreground">{u.email}</div>
                  </div>
                </div>
                <Badge variant="outline" className={`text-[10px] ${roleColor[u.role]}`}>{u.role}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-gradient-card overflow-hidden">
          <div className="p-4 border-b border-border/40 flex items-center justify-between">
            <h2 className="font-display font-bold">Kursus Terpopuler</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/courses-admin">Kelola Semua</Link>
            </Button>
          </div>
          <div className="divide-y divide-border/40">
            {[...courses].sort((a, b) => b.students - a.students).slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4 transition-smooth hover:bg-accent/10">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={c.thumbnail} className="h-8 w-12 rounded object-cover flex-shrink-0" alt="" />
                  <div className="truncate">
                    <div className="text-sm font-medium truncate">{c.title}</div>
                    <div className="text-[10px] text-muted-foreground">{c.category}</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-primary-glow">{c.students.toLocaleString()} Siswa</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
