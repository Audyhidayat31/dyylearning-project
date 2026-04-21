import { Navbar } from "@/components/Navbar";
import { COURSES } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Star, Users } from "lucide-react";
import { useMemo, useState } from "react";

const categories = ["Semua", "Web Development", "Backend", "Design", "Data Science"];

export default function Courses() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Semua");

  const filtered = useMemo(
    () => COURSES.filter((c) =>
      (cat === "Semua" || c.category === cat) &&
      c.title.toLowerCase().includes(q.toLowerCase())
    ),
    [q, cat]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-gradient-hero">
        <div className="container py-16 text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Jelajahi <span className="text-gradient">Kursus</span></h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Temukan kursus yang cocok dengan tujuan belajarmu.</p>
          <div className="relative mx-auto mt-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari kursus..." className="pl-10 h-12 text-base" />
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-smooth ${
                cat === c ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Link key={c.id} to={`/courses/${c.id}`}>
              <Card className="group overflow-hidden bg-gradient-card transition-smooth hover:shadow-glow hover:-translate-y-1">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img src={c.thumbnail} alt={c.title} loading="lazy"
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary-glow">{c.category}</Badge>
                    <Badge variant="outline">{c.level}</Badge>
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-tight">{c.title}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                  <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {c.rating}</div>
                    <div className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.students.toLocaleString()}</div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <div className="py-16 text-center text-muted-foreground">Tidak ada kursus ditemukan.</div>}
      </section>
    </div>
  );
}
