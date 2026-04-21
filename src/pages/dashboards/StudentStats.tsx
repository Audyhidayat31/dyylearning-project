import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, GraduationCap, TrendingUp, Clock } from "lucide-react";

export const StudentStats = () => {
  const students = [
    { name: "Audy Hidayat", course: "React.js untuk Pemula", progress: 75, lastActive: "2 jam yang lalu" },
    { name: "Budi Santoso", course: "Node.js & Express REST API", progress: 40, lastActive: "5 jam yang lalu" },
    { name: "Siti Aminah", course: "UI/UX Design Fundamentals", progress: 90, lastActive: "1 hari yang lalu" },
    { name: "Rizky Ramadhan", course: "React.js untuk Pemula", progress: 15, lastActive: "3 jam yang lalu" },
    { name: "Dewi Lestari", course: "Python untuk Data Science", progress: 100, lastActive: "12 jam yang lalu" },
  ];

  const stats = [
    { label: "Total Siswa", value: "5,946", icon: Users, color: "text-primary-glow" },
    { label: "Penyelesaian", value: "82%", icon: GraduationCap, color: "text-success" },
    { label: "Pertumbuhan", value: "+12%", icon: TrendingUp, color: "text-warning" },
    { label: "Waktu Belajar", value: "4.2h/day", icon: Clock, color: "text-primary-glow" },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Statistik Siswa</h1>
        <p className="text-sm text-muted-foreground">Pantau kemajuan dan aktivitas siswa di setiap kursus Anda.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-gradient-card p-4">
            <s.icon className={`h-6 w-6 ${s.color}`} />
            <div className="mt-2 font-display text-xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-card overflow-hidden">
        <div className="p-4 border-b border-border/40 font-semibold text-sm">Aktivitas Terkini</div>
        <div className="divide-y divide-border/40">
          {students.map((s, i) => (
            <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-smooth hover:bg-accent/10">
              <div className="flex-1">
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.course}</div>
              </div>
              <div className="flex-1 max-w-[200px]">
                <div className="flex justify-between text-[10px] mb-1">
                  <span>Progress</span>
                  <span>{s.progress}%</span>
                </div>
                <Progress value={s.progress} className="h-1" />
              </div>
              <div className="text-xs text-muted-foreground sm:text-right min-w-[120px]">
                {s.lastActive}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
