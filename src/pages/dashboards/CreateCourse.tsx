import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Plus, Trash2, Save } from "lucide-react";
import { useCourses } from "@/context/CourseContext";
import { useAuth } from "@/context/AuthContext";
import { Course, Lesson } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CreateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addCourse, updateCourse, getCourseById, categories } = useCourses();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800", // Default
  });

  useEffect(() => {
    if (id) {
      const course = getCourseById(id);
      if (course) {
        setFormData({
          title: course.title,
          description: course.description,
          category: course.category,
          level: course.level,
          thumbnail: course.thumbnail,
        });
      }
    } else if (categories.length > 0 && !formData.category) {
      setFormData(prev => ({ ...prev, category: categories[0] }));
    }
  }, [id, getCourseById, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (id) {
        updateCourse(id, formData);
        toast.success("Kursus berhasil diperbarui");
      } else {
        addCourse({
          ...formData,
          instructor: user?.name || "Unknown",
          students: 0,
          rating: 0,
          lessons: [], // Lessons could be added in a second step or here
        });
        toast.success("Kursus baru telah ditambahkan");
      }
      setLoading(false);
      navigate("/dashboard/manage");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">{id ? "Edit Kursus" : "Buat Kursus Baru"}</h1>
        <p className="text-sm text-muted-foreground">Isi detail kursus untuk mulai membagikan ilmu Anda.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-gradient-card p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Kursus</Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={e => setFormData({ ...formData, title: e.target.value })} 
              placeholder="Contoh: Mastering React for Professionals" 
              required 
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select 
                value={formData.category} 
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Tingkat Kesulitan</Label>
              <Select 
                value={formData.level} 
                onValueChange={(val: any) => setFormData({ ...formData, level: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Singkat</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={e => setFormData({ ...formData, description: e.target.value })} 
              placeholder="Jelaskan apa yang akan dipelajari di kursus ini..." 
              className="min-h-[100px]" 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label>Thumbnail Kursus (URL)</Label>
            <Input 
              value={formData.thumbnail} 
              onChange={e => setFormData({ ...formData, thumbnail: e.target.value })} 
              placeholder="https://images.unsplash.com/..." 
            />
            <div className="mt-2 h-40 w-full overflow-hidden rounded-lg border border-border/40">
              <img src={formData.thumbnail} alt="Preview" className="h-full w-full object-cover" />
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Batal</Button>
          <Button type="submit" variant="hero" disabled={loading}>
            {loading ? "Menyimpan..." : <><Save className="mr-2 h-4 w-4" /> {id ? "Simpan Perubahan" : "Simpan Kursus"}</>}
          </Button>
        </div>
      </form>
    </div>
  );
};
