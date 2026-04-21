import { useAuth } from "@/context/AuthContext";
import { useEnrollments } from "@/context/EnrollmentContext";
import { COURSES, QUIZZES } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BookOpen, Trophy, Flame, ArrowRight, PlayCircle } from "lucide-react";

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { enrolled, completedLessons, quizScores } = useEnrollments();
  const myCourses = COURSES.filter((c) => enrolled.includes(c.id));
  const totalLessons = myCourses.reduce((a, c) => a + c.lessons.length, 0);
  const doneLessons = myCourses.reduce((a, c) => a + c.lessons.filter(l => completedLessons.includes(l.id)).length, 0);
  const avgScore = Object.values(quizScores).length
    ? Math.round(Object.values(quizScores).reduce((a, s) => a + (s.score / s.total) * 100, 0) / Object.values(quizScores).length)
    : 0;

  const stats = [
    { icon: BookOpen, label: "Kursus Diikuti", value: enrolled.length, color: "text-primary-glow" },
    { icon: Flame, label: "Materi Selesai", value: `${doneLessons}/${totalLessons}`, color: "text-warning" },
    { icon: Trophy, label: "Skor Quiz Avg", value: `${avgScore}%`, color: "text-success" },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Halo, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="mt-1 text-muted-foreground">Lanjutkan perjalanan belajarmu hari ini.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="bg-gradient-card p-4">
            <s.icon className={`h-6 w-6 ${s.color}`} />
            <div className="mt-2 font-display text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </Card>
        ))}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Kursus Saya</h2>
          <Button asChild variant="ghost" size="sm"><Link to="/courses">Jelajah lainnya <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        {myCourses.length === 0 ? (
          <Card className="bg-gradient-card p-10 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-3 text-muted-foreground">Belum ada kursus. Yuk mulai!</p>
            <Button asChild variant="hero" className="mt-4"><Link to="/courses">Jelajahi Kursus</Link></Button>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {myCourses.map((c) => {
              const done = c.lessons.filter(l => completedLessons.includes(l.id)).length;
              const pct = Math.round((done / c.lessons.length) * 100);
              return (
                <Card key={c.id} className="overflow-hidden bg-gradient-card transition-smooth hover:shadow-glow">
                  <div className="flex">
                    <img src={c.thumbnail} alt="" className="h-28 w-28 flex-shrink-0 object-cover" />
                    <div className="flex-1 space-y-1.5 p-3">
                      <Badge variant="outline" className="border-primary/30 bg-primary/10 text-xs text-primary-glow">{c.category}</Badge>
                      <h3 className="font-semibold leading-tight">{c.title}</h3>
                      <Progress value={pct} className="h-1.5" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{pct}% selesai</span>
                        <Link to={`/learn/${c.id}/${c.lessons[0]?.id}`} className="inline-flex items-center gap-1 text-primary-glow hover:underline">
                          <PlayCircle className="h-3 w-3" /> Lanjut
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {QUIZZES.length > 0 && (
        <div>
          <h2 className="mb-3 font-display text-lg font-bold">Quiz Tersedia</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {QUIZZES.map((q) => {
              const s = quizScores[q.id];
              return (
                <Card key={q.id} className="flex items-center justify-between bg-gradient-card p-3">
                  <div>
                    <div className="font-medium">{q.title}</div>
                    <div className="text-xs text-muted-foreground">{q.questions.length} pertanyaan</div>
                    {s && <Badge variant="outline" className="mt-1 border-success/30 bg-success/10 text-success">Skor terakhir: {s.score}/{s.total}</Badge>}
                  </div>
                  <Button asChild variant="hero" size="sm"><Link to={`/quiz/${q.id}`}>Mulai</Link></Button>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
