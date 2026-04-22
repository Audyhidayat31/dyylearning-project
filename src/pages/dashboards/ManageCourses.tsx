import { useCourses } from "@/context/CourseContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Edit, Eye, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export const ManageCourses = () => {
  const { courses, deleteCourse } = useCourses();
  const { user } = useAuth();

  // If instructor, only show their courses. If admin, show all.
  const displayCourses = user?.role === "ADMIN" 
    ? courses 
    : courses.filter(c => c.instructor === user?.name);

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus kursus ini?")) {
      deleteCourse(id);
      toast.success("Kursus berhasil dihapus");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kelola Kursus</h1>
          <p className="text-sm text-muted-foreground">
            {user?.role === "ADMIN" ? "Kelola seluruh kursus yang ada di platform." : "Edit, hapus, atau lihat performa setiap kursus Anda."}
          </p>
        </div>
        <Button asChild variant="hero" size="sm">
          <Link to="/dashboard/create"><Plus className="mr-2 h-4 w-4" /> Buat Kursus</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {displayCourses.length === 0 ? (
          <Card className="p-10 text-center text-muted-foreground bg-accent/5 border-dashed">
            Belum ada kursus yang dibuat.
          </Card>
        ) : (
          displayCourses.map((c) => (
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
                    {c.students?.toLocaleString() || 0} Siswa · ⭐ {c.rating || 0} · {c.lessons?.length || 0} Materi
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/courses/${c.id}`}><Eye className="h-4 w-4 mr-1.5" /> Lihat</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/dashboard/edit/${c.id}`}><Edit className="h-4 w-4 mr-1.5" /> Edit</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(c.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
