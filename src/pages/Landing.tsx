import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Sparkles, PlayCircle, BookOpen, Award, Users, Zap,
  ArrowRight, CheckCircle2, Star,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { COURSES } from "@/data/mockData";

const features = [
  { icon: PlayCircle, title: "Video HD Interaktif", desc: "Streaming pembelajaran berkualitas tinggi dengan progress otomatis." },
  { icon: BookOpen, title: "Materi Lengkap", desc: "Video, PDF, dan teks markdown — semua dalam satu tempat." },
  { icon: Award, title: "Quiz & Sertifikat", desc: "Uji pemahaman dan dapatkan skor instan setelah menyelesaikan kursus." },
  { icon: Users, title: "Komunitas Aktif", desc: "Belajar bersama 10,000+ siswa dan instruktur berpengalaman." },
];

const stats = [
  { value: "10K+", label: "Siswa Aktif" },
  { value: "200+", label: "Kursus Premium" },
  { value: "50+", label: "Instruktur Pakar" },
  { value: "4.9", label: "Rating Rata-rata" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-32">
          <div className="animate-fade-in space-y-6">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary-glow">
              <Sparkles className="mr-1.5 h-3 w-3" /> Platform E-Learning Generasi Baru
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
              Belajar tanpa batas, <br />
              <span className="text-gradient">tumbuh tanpa henti.</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Kuasai skill masa depan lewat ribuan kursus interaktif dari instruktur terbaik. Mulai gratis, belajar di mana saja, kapan saja.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/register">Mulai Belajar Gratis <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="glow" size="xl">
                <Link to="/courses">Jelajahi Kursus</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Tanpa kartu kredit</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Akses selamanya</div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />
            <img
              src={heroImg}
              alt="Ilustrasi platform pembelajaran dyyLEARNING"
              width={1280}
              height={960}
              className="relative rounded-2xl border border-border/40 shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="container grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-gradient md:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary-glow">
            <Zap className="mr-1.5 h-3 w-3" /> Fitur Unggulan
          </Badge>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Semua yang kamu butuhkan untuk berkembang</h2>
          <p className="mt-3 text-muted-foreground">Dirancang untuk pengalaman belajar terbaik di setiap level.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="group bg-gradient-card p-6 transition-smooth hover:shadow-glow hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section className="container py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Kursus Populer</h2>
            <p className="mt-2 text-muted-foreground">Pilihan terfavorit dari ribuan siswa.</p>
          </div>
          <Button asChild variant="ghost"><Link to="/courses">Lihat semua <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.slice(0, 3).map((c) => (
            <Link key={c.id} to={`/courses/${c.id}`}>
              <Card className="group overflow-hidden bg-gradient-card transition-smooth hover:shadow-glow hover:-translate-y-1">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img src={c.thumbnail} alt={c.title} loading="lazy"
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
                </div>
                <div className="space-y-2 p-5">
                  <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary-glow">{c.category}</Badge>
                  <h3 className="font-display text-lg font-semibold leading-tight">{c.title}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                  <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {c.rating}</div>
                    <div>{c.students.toLocaleString()} siswa</div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <Card className="relative overflow-hidden border-primary/30 bg-gradient-card p-12 text-center shadow-elegant">
          <div className="absolute inset-0 bg-gradient-hero opacity-30" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Siap memulai perjalanan belajarmu?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Bergabunglah dengan ribuan pelajar yang sudah mengubah karir mereka bersama dyyLEARNING.
            </p>
            <Button asChild variant="hero" size="xl" className="mt-6">
              <Link to="/register">Daftar Sekarang — Gratis</Link>
            </Button>
          </div>
        </Card>
      </section>

      <footer className="border-t border-border/40 bg-card/30">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2026 dyyLEARNING. Dibangun dengan ♥ untuk pembelajar.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privasi</a>
            <a href="#" className="hover:text-foreground">Syarat</a>
            <a href="#" className="hover:text-foreground">Kontak</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
