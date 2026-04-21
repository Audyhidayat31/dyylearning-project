import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useEnrollments } from "@/context/EnrollmentContext";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const { user } = useAuth();
  const { enrolled, completedLessons, quizScores } = useEnrollments();
  const [name, setName] = useState(user?.name || "");

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-3xl py-10">
        <h1 className="font-display text-3xl font-bold">Profil Saya</h1>
        <p className="mt-1 text-muted-foreground">Kelola informasi akunmu.</p>

        <Card className="mt-6 bg-gradient-card p-8">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gradient-primary text-2xl text-primary-foreground">
                {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-display text-2xl font-bold">{user.name}</div>
              <div className="text-muted-foreground">{user.email}</div>
              <Badge variant="outline" className="mt-2 border-primary/30 bg-primary/10 text-primary-glow">{user.role}</Badge>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Nama lengkap</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user.email} disabled />
            </div>
          </div>

          <Button variant="hero" className="mt-6"
            onClick={() => toast({ title: "Profil tersimpan (demo)" })}>
            Simpan Perubahan
          </Button>
        </Card>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-card p-5">
            <div className="text-sm text-muted-foreground">Kursus Diikuti</div>
            <div className="mt-1 font-display text-3xl font-bold text-gradient">{enrolled.length}</div>
          </Card>
          <Card className="bg-gradient-card p-5">
            <div className="text-sm text-muted-foreground">Materi Selesai</div>
            <div className="mt-1 font-display text-3xl font-bold text-gradient">{completedLessons.length}</div>
          </Card>
          <Card className="bg-gradient-card p-5">
            <div className="text-sm text-muted-foreground">Quiz Diambil</div>
            <div className="mt-1 font-display text-3xl font-bold text-gradient">{Object.keys(quizScores).length}</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
