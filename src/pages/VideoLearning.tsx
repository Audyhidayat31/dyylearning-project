import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { COURSES } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEnrollments } from "@/context/EnrollmentContext";
import { CheckCircle2, Circle, ArrowLeft, ArrowRight, Download, PlayCircle, FileText, FileType2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const iconByType = { VIDEO: PlayCircle, PDF: FileType2, TEXT: FileText };

export default function VideoLearning() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find((c) => c.id === courseId);
  const { completedLessons, toggleLesson } = useEnrollments();

  if (!course) return <div className="min-h-screen bg-background"><Navbar /><div className="container py-20 text-center">Kursus tidak ditemukan</div></div>;

  const idx = course.lessons.findIndex((l) => l.id === lessonId);
  const lesson = course.lessons[idx] ?? course.lessons[0];
  const completed = completedLessons.includes(lesson.id);

  const courseCompletedCount = course.lessons.filter((l) => completedLessons.includes(l.id)).length;
  const progress = Math.round((courseCompletedCount / course.lessons.length) * 100);

  const goTo = (offset: number) => {
    const next = course.lessons[idx + offset];
    if (next) navigate(`/learn/${course.id}/${next.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <Link to={`/courses/${course.id}`} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Kembali ke detail kursus
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr,340px]">
          {/* PLAYER / CONTENT */}
          <div className="space-y-4">
            <Card className="overflow-hidden bg-card">
              {lesson.type === "VIDEO" && (
                <div className="aspect-video w-full bg-black">
                  <iframe
                    src={lesson.content}
                    title={lesson.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              {lesson.type === "TEXT" && (
                <div className="p-8 prose prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-foreground">{lesson.content}</p>
                </div>
              )}
              {lesson.type === "PDF" && (
                <div className="flex flex-col items-center gap-4 p-12 text-center">
                  <FileType2 className="h-16 w-16 text-primary-glow" />
                  <p className="text-muted-foreground">Materi PDF</p>
                  <Button asChild variant="hero">
                    <a href={lesson.content} target="_blank" rel="noreferrer"><Download className="mr-2 h-4 w-4" /> Unduh PDF</a>
                  </Button>
                </div>
              )}
            </Card>

            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Materi {idx + 1} dari {course.lessons.length}</div>
              <h1 className="mt-1 font-display text-2xl font-bold md:text-3xl">{lesson.title}</h1>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button variant={completed ? "default" : "hero"} onClick={() => toggleLesson(lesson.id)}>
                {completed ? <><CheckCircle2 className="mr-2 h-4 w-4" /> Selesai ✓</> : "Tandai Selesai"}
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => goTo(-1)} disabled={idx === 0}>
                  <ArrowLeft className="mr-1 h-4 w-4" /> Sebelumnya
                </Button>
                <Button variant="outline" onClick={() => goTo(1)} disabled={idx === course.lessons.length - 1}>
                  Berikutnya <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* SIDEBAR LESSONS */}
          <aside className="space-y-4">
            <Card className="bg-gradient-card p-5">
              <div className="text-sm font-medium">Progress kursus</div>
              <div className="mt-1 mb-2 text-2xl font-bold text-gradient">{progress}%</div>
              <Progress value={progress} className="h-2" />
              <div className="mt-2 text-xs text-muted-foreground">{courseCompletedCount} / {course.lessons.length} materi</div>
            </Card>

            <Card className="bg-gradient-card p-2">
              <div className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Daftar Materi</div>
              {course.lessons.map((l, i) => {
                const Icon = iconByType[l.type];
                const done = completedLessons.includes(l.id);
                const active = l.id === lesson.id;
                return (
                  <Link key={l.id} to={`/learn/${course.id}/${l.id}`}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-smooth ${
                      active ? "bg-primary/15 text-foreground" : "hover:bg-accent/50"
                    }`}>
                    {done ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-success" /> : <Circle className="h-4 w-4 flex-shrink-0 text-muted-foreground" />}
                    <Icon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <span className="flex-1 truncate">{i + 1}. {l.title}</span>
                  </Link>
                );
              })}
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
