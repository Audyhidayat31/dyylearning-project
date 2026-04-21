import { useEnrollments } from "@/context/EnrollmentContext";
import { COURSES } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlayCircle, BookOpen } from "lucide-react";

export const MyCourses = () => {
  const { enrolled, completedLessons } = useEnrollments();
  const myCourses = COURSES.filter((c) => enrolled.includes(c.id));

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Kursus Saya</h1>
        <p className="text-sm text-muted-foreground">Lanjutkan pembelajaran Anda yang sedang berlangsung.</p>
      </div>

      {myCourses.length === 0 ? (
        <Card className="p-12 text-center bg-gradient-card">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Belum ada kursus</h3>
          <p className="text-muted-foreground mb-6">Anda belum mengambil kursus apapun.</p>
          <Button asChild variant="hero">
            <Link to="/courses">Jelajahi Kursus</Link>
          </Button>
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
                    <Badge variant="outline" className="border-primary/30 bg-primary/10 text-[10px] text-primary-glow">{c.category}</Badge>
                    <h3 className="font-semibold text-sm leading-tight line-clamp-1">{c.title}</h3>
                    <div className="pt-1">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span>Progress</span>
                        <span>{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-1" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] pt-1">
                      <span className="text-muted-foreground">{done}/{c.lessons.length} Materi</span>
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
  );
};
