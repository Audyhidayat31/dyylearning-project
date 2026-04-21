import { useAuth } from "@/context/AuthContext";
import { COURSES } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, BarChart3, Star, PlusSquare } from "lucide-react";
import { Link } from "react-router-dom";

export const InstructorDashboard = () => {
  const { user } = useAuth();
  // Demo: tampilkan semua course sebagai milik instructor
  const myCourses = COURSES;
  const totalStudents = myCourses.reduce((a, c) => a + c.students, 0);
  const avgRating = (myCourses.reduce((a, c) => a + c.rating, 0) / myCourses.length).toFixed(1);

  const stats = [
    { icon: BookOpen, label: "Kursus Saya", value: myCourses.length },
    { icon: Users, label: "Total Siswa", value: totalStudents.toLocaleString() },
    { icon: Star, label: "Rating Avg", value: avgRating },
    { icon: BarChart3, label: "Pendapatan", value: "Rp 12.4jt" },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Selamat datang, {user?.name?.split(" ")[0]}!</h1>
          <p className="mt-1 text-muted-foreground">Kelola kursus dan pantau perkembangan siswamu.</p>
        </div>
        <Button variant="hero"><PlusSquare className="mr-2 h-4 w-4" /> Buat Kursus Baru</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-gradient-card p-4">
            <s.icon className="h-6 w-6 text-primary-glow" />
            <div className="mt-2 font-display text-xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-bold">Kursus Anda</h2>
        <Card className="overflow-hidden bg-gradient-card">
          <div className="grid grid-cols-12 gap-4 border-b border-border/40 p-3 text-[10px] font-semibold uppercase text-muted-foreground">
            <div className="col-span-6">Kursus</div>
            <div className="col-span-2">Kategori</div>
            <div className="col-span-2">Siswa</div>
            <div className="col-span-2 text-right">Aksi</div>
          </div>
          {myCourses.map((c) => (
            <div key={c.id} className="grid grid-cols-12 items-center gap-4 border-b border-border/40 p-3 last:border-0 transition-smooth hover:bg-accent/30">
              <div className="col-span-6 flex items-center gap-3">
                <img src={c.thumbnail} alt="" className="h-12 w-16 rounded-md object-cover" />
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.lessons.length} materi · ⭐ {c.rating}</div>
                </div>
              </div>
              <div className="col-span-2"><Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary-glow">{c.category}</Badge></div>
              <div className="col-span-2 font-medium">{c.students.toLocaleString()}</div>
              <div className="col-span-2 text-right">
                <Button asChild variant="ghost" size="sm"><Link to={`/courses/${c.id}`}>Lihat</Link></Button>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};
