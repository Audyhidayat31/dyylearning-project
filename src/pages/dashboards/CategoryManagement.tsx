import { useCourses } from "@/context/CourseContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const CategoryManagement = () => {
  const { categories, addCategory, updateCategory, deleteCategory, courses } = useCourses();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [name, setName] = useState("");

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName("");
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (cat: string) => {
    setEditingCategory(cat);
    setName(cat);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory, name);
      toast.success("Kategori diperbarui");
    } else {
      addCategory(name);
      toast.success("Kategori ditambahkan");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (cat: string) => {
    const isUsed = courses.some(c => c.category === cat);
    if (isUsed) {
      toast.error("Tidak bisa menghapus kategori yang sedang digunakan oleh kursus");
      return;
    }
    if (confirm(`Hapus kategori "${cat}"?`)) {
      deleteCategory(cat);
      toast.success("Kategori dihapus");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Manajemen Kategori</h1>
          <p className="text-sm text-muted-foreground">Kelola kategori kursus yang tersedia di platform.</p>
        </div>
        <Button onClick={handleOpenCreate} variant="hero" size="sm">
          <Plus className="mr-2 h-4 w-4" /> Tambah Kategori
        </Button>
      </div>

      <Card className="overflow-hidden bg-gradient-card">
        <div className="divide-y divide-border/40">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center justify-between gap-4 p-4 transition-smooth hover:bg-accent/10">
              <div className="font-medium">{cat}</div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleOpenEdit(cat)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(cat)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Kategori" : "Tambah Kategori"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Kategori</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Mobile Development" required />
            </div>
            <DialogFooter>
              <Button type="submit" variant="hero" className="w-full">
                {editingCategory ? "Simpan Perubahan" : "Tambah Kategori"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
