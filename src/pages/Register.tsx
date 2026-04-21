import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { toast } from "@/hooks/use-toast";
import { Role } from "@/data/mockData";
import { GraduationCap, Briefcase } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("STUDENT");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = register(name.trim(), email.trim().toLowerCase(), password, role);
    setLoading(false);
    if (!res.ok) {
      toast({ title: "Gagal mendaftar", description: res.error, variant: "destructive" });
      return;
    }
    toast({ title: "Akun berhasil dibuat!", description: "Selamat datang di dyyLEARNING." });
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <Card className="bg-gradient-card p-8 shadow-elegant">
          <h1 className="font-display text-2xl font-bold">Buat akun gratis</h1>
          <p className="mt-1 text-sm text-muted-foreground">Mulai belajar atau mengajar dalam hitungan detik.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Saya ingin menjadi</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { v: "STUDENT" as Role, label: "Siswa", icon: GraduationCap },
                  { v: "INSTRUCTOR" as Role, label: "Instruktur", icon: Briefcase },
                ].map((r) => (
                  <button key={r.v} type="button" onClick={() => setRole(r.v)}
                    className={`flex flex-col items-center gap-1 rounded-lg border p-4 transition-smooth ${role === r.v
                        ? "border-primary bg-primary/10 text-primary-glow shadow-glow"
                        : "border-border bg-card hover:border-primary/40"
                      }`}>
                    <r.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nama lengkap</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimal 6 karakter" />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Memuat..." : "Daftar Sekarang"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-medium text-primary-glow hover:underline">Masuk</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
