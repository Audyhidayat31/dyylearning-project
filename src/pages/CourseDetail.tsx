import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { QUIZZES } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEnrollments } from "@/context/EnrollmentContext";
import { useAuth } from "@/context/AuthContext";
import { useCourses } from "@/context/CourseContext";
import { toast } from "sonner";
import {
  PlayCircle, FileText, FileType2, Star, Users, Clock,
  CheckCircle2, ClipboardList, ArrowLeft,
} from "lucide-react";

const iconByType = { VIDEO: PlayCircle, PDF: FileType2, TEXT: FileText };

export default function CourseDetail() {
  const { id } = useParams();
  const { getCourseById } = useCourses();
  const course = getCourseById(id || "");
  const { user } = useAuth();
  const { enrolled, enroll } = useEnrollments();
  const navigate = useNavigate();

  if (!course) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-20 text-center text-muted-foreground">Kursus tidak ditemukan.</div>
    </div>
  );

  const quiz = QUIZZES.find((q) => q.courseId === course.id);
  const isEnrolled = enrolled.includes(course.id);

  const handleEnroll = () => {
    if (!user) { navigate("/login"); return; }
    enroll(course.id);
    toast.success(`Kamu kini terdaftar di ${course.title}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-gradient-hero">
        <div className="container py-12">
          <Link to="/courses" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Kembali ke kursus
          </Link>
          <div className="grid gap-10 md:grid-cols-[1fr,400px]">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary-glow">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <h1 className="font-display text-3xl font-bold md:text-5xl">{course.title}</h1>
              <p className="text-lg text-muted-foreground">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-warning text-warning" /> {course.rating || 0} rating</div>
                <div className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {(course.students || 0).toLocaleString()} siswa</div>
                <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.lessons?.length || 0} materi</div>
              </div>
              <p className="text-sm text-muted-foreground">Pengajar: <span className="font-medium text-foreground">{course.instructor}</span></p>
            </div>

            <Card className="h-fit overflow-hidden bg-gradient-card shadow-elegant">
              <img src={course.thumbnail} alt={course.title} className="aspect-video w-full object-cover" />
              <div className="space-y-3 p-6">
                {isEnrolled ? (
                  <>
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="h-5 w-5" /> <span className="font-medium">Sudah terdaftar</span>
                    </div>
                    <Button asChild variant="hero" size="lg" className="w-full">
                      <Link to={`/learn/${course.id}/${course.lessons[0]?.id}`}>Lanjutkan Belajar</Link>
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleEnroll} variant="hero" size="lg" className="w-full">Enroll — Gratis</Button>
                )}
                {quiz && isEnrolled && (
                  <Button asChild variant="glow" size="lg" className="w-full">
                    <Link to={`/quiz/${quiz.id}`}><ClipboardList className="mr-2 h-4 w-4" /> Ikuti Quiz</Link>
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="mb-6 font-display text-2xl font-bold">Materi Pembelajaran</h2>
        <div className="space-y-2">
          {course.lessons?.length > 0 ? (
            course.lessons.map((l, idx) => {
              const Icon = iconByType[l.type] || PlayCircle;
              return (
                <Card key={l.id} className="flex items-center justify-between bg-gradient-card p-4 transition-smooth hover:border-primary/40">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Materi {idx + 1} · {l.type}</div>
                      <div className="font-medium">{l.title}</div>
                    </div>
                  </div>
                  {isEnrolled ? (
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/learn/${course.id}/${l.id}`}>Mulai</Link>
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">🔒 Enroll dulu</span>
                  )}
                </Card>
              );
            })
          ) : (
            <div className="text-center py-10 text-muted-foreground">Belum ada materi untuk kursus ini.</div>
          )}
        </div>
      </section>
    </div>
  );
}
