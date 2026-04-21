import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Upload, Plus, Trash2, Save } from "lucide-react";

export const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Berhasil!", description: "Kursus baru telah disimpan sebagai draft." });
      navigate("/dashboard/manage");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Buat Kursus Baru</h1>
        <p className="text-sm text-muted-foreground">Isi detail kursus untuk mulai membagikan ilmu Anda.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-gradient-card p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Kursus</Label>
            <Input id="title" placeholder="Contoh: Mastering React for Professionals" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Input id="category" placeholder="Web Development" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Tingkat Kesulitan</Label>
              <select id="level" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Singkat</Label>
            <Textarea id="description" placeholder="Jelaskan apa yang akan dipelajari di kursus ini..." className="min-h-[100px]" required />
          </div>

          <div className="space-y-2">
            <Label>Thumbnail Kursus</Label>
            <div className="flex items-center justify-center border-2 border-dashed border-border/60 rounded-lg p-8 transition-smooth hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Klik atau drag gambar untuk upload thumbnail</p>
                <p className="text-[10px] text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Batal</Button>
          <Button type="submit" variant="hero" disabled={loading}>
            {loading ? "Menyimpan..." : <><Save className="mr-2 h-4 w-4" /> Simpan Kursus</>}
          </Button>
        </div>
      </form>
    </div>
  );
};
