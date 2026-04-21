import { DEMO_USERS, COURSES } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, BookOpen, GraduationCap, TrendingUp, Trash2 } from "lucide-react";

const roleColor: Record<string, string> = {
  STUDENT: "bg-success/20 text-success border-success/30",
  INSTRUCTOR: "bg-primary/20 text-primary-glow border-primary/30",
  ADMIN: "bg-warning/20 text-warning border-warning/30",
};

export const AdminDashboard = () => {
  const totalEnrollments = COURSES.reduce((a, c) => a + c.students, 0);
  const stats = [
    { icon: Users,         label: "Total User",         value: DEMO_USERS.length, color: "text-primary-glow" },
    { icon: BookOpen,      label: "Total Kursus",       value: COURSES.length, color: "text-success" },
    { icon: GraduationCap, label: "Total Enrollment",   value: totalEnrollments.toLocaleString(), color: "text-warning" },
    { icon: TrendingUp,    label: "Pertumbuhan Bulan",  value: "+18%", color: "text-success" },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Statistik Platform</h1>
        <p className="mt-1 text-muted-foreground">Pantau performa dyyLEARNING secara keseluruhan.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-gradient-card p-4">
            <s.icon className={`h-6 w-6 ${s.color}`} />
            <div className="mt-2 font-display text-xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-bold">Manajemen User</h2>
        <Card className="overflow-hidden bg-gradient-card">
          {DEMO_USERS.map((u) => (
            <div key={u.id} className="flex items-center justify-between gap-4 border-b border-border/40 p-3 last:border-0 transition-smooth hover:bg-accent/30">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={roleColor[u.role]}>{u.role}</Badge>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};
