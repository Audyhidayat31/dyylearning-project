import { COURSES } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Edit, Eye, Trash2, Plus } from "lucide-react";

export const ManageCourses = () => {
  // Demo: tampilkan semua course sebagai milik instructor
  const myCourses = COURSES;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Kursus</h1>
          <p className="text-sm text-muted-foreground">Edit, hapus, atau lihat performa setiap kursus Anda.</p>
        </div>
        <Button asChild variant="hero" size="sm">
          <Link to="/dashboard/create"><Plus className="mr-2 h-4 w-4" /> Buat Kursus</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {myCourses.map((c) => (
          <Card key={c.id} className="overflow-hidden bg-gradient-card">
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
              <img src={c.thumbnail} alt="" className="h-20 w-32 rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="border-primary/30 bg-primary/10 text-[10px] text-primary-glow">{c.category}</Badge>
                  <span className="text-xs text-muted-foreground">{c.level}</span>
                </div>
                <h3 className="font-semibold truncate">{c.title}</h3>
                <div className="text-xs text-muted-foreground mt-1">
                  {c.students.toLocaleString()} Siswa · ⭐ {c.rating} · {c.lessons.length} Materi
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/courses/${c.id}`}><Eye className="h-4 w-4 mr-1.5" /> Lihat</Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1.5" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
