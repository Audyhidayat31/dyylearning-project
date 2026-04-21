import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { toast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = login(email, password);
    setLoading(false);
    if (!res.ok) {
      toast({ title: "Gagal masuk", description: res.error, variant: "destructive" });
      return;
    }
    toast({ title: "Selamat datang kembali!" });
    navigate("/dashboard");
  };

  const quickLogin = (em: string) => { setEmail(em); setPassword("password123"); };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <Card className="bg-gradient-card p-8 shadow-elegant">
          <h1 className="font-display text-2xl font-bold">Masuk ke akunmu</h1>
          <p className="mt-1 text-sm text-muted-foreground">Lanjutkan perjalanan belajarmu.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kamu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Memuat..." : "Masuk"}
            </Button>
          </form>

          <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-primary-glow">
              <Sparkles className="h-3 w-3" /> Akun Demo (klik untuk isi otomatis)
            </div>
            <div className="space-y-1 text-xs">
              {[
                { e: "admin@gmail.com", l: "Admin" },
                { e: "guru@gmail.com", l: "Instructor" },
                { e: "siswa@gmail.com", l: "Student" },
              ].map((d) => (
                <button type="button" key={d.e} onClick={() => quickLogin(d.e)}
                  className="block w-full rounded px-2 py-1 text-left text-muted-foreground transition-smooth hover:bg-primary/10 hover:text-foreground">
                  <span className="font-medium">{d.l}:</span> {d.e} <span className="opacity-60">/ password123</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link to="/register" className="font-medium text-primary-glow hover:underline">Daftar gratis</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
