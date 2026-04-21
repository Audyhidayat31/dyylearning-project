import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { QUIZZES, COURSES } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEnrollments } from "@/context/EnrollmentContext";
import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, RotateCcw, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Quiz() {
  const { quizId } = useParams();
  const quiz = QUIZZES.find((q) => q.id === quizId);
  const course = COURSES.find((c) => c.id === quiz?.courseId);
  const { setQuizScore } = useEnrollments();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) return <div className="min-h-screen bg-background"><Navbar /><div className="container py-20 text-center">Quiz tidak ditemukan</div></div>;

  const score = quiz.questions.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0);
  const percent = Math.round((score / quiz.questions.length) * 100);

  const submit = () => {
    if (Object.keys(answers).length < quiz.questions.length) {
      toast({ title: "Jawab semua dulu ya", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    setQuizScore(quiz.id, score, quiz.questions.length);
  };

  const reset = () => { setAnswers({}); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-3xl py-10">
        {course && (
          <Link to={`/courses/${course.id}`} className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {course.title}
          </Link>
        )}
        <h1 className="font-display text-3xl font-bold">{quiz.title}</h1>
        <p className="mt-1 text-muted-foreground">{quiz.questions.length} pertanyaan · pilih jawaban yang benar</p>

        {submitted && (
          <Card className="mt-6 border-primary/30 bg-gradient-card p-6 text-center shadow-glow">
            <Trophy className="mx-auto h-12 w-12 text-warning" />
            <div className="mt-3 font-display text-3xl font-bold">{percent}%</div>
            <div className="text-muted-foreground">Skor: {score} / {quiz.questions.length}</div>
            <div className="mt-4 flex justify-center gap-2">
              <Button onClick={reset} variant="outline"><RotateCcw className="mr-2 h-4 w-4" /> Coba lagi</Button>
              <Button onClick={() => navigate("/dashboard")} variant="hero">Ke Dashboard</Button>
            </div>
          </Card>
        )}

        <div className="mt-6 space-y-4">
          {quiz.questions.map((q, idx) => (
            <Card key={q.id} className="bg-gradient-card p-6">
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase text-primary-glow">Pertanyaan {idx + 1}</div>
                <div className="mt-1 text-lg font-medium">{q.text}</div>
              </div>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const selected = answers[q.id] === i;
                  const correct  = q.answer === i;
                  const showResult = submitted;
                  let cls = "border-border bg-card hover:border-primary/40";
                  if (showResult && correct) cls = "border-success bg-success/10 text-success";
                  else if (showResult && selected && !correct) cls = "border-destructive bg-destructive/10 text-destructive";
                  else if (selected) cls = "border-primary bg-primary/10 text-primary-glow";
                  return (
                    <button key={i} disabled={submitted}
                      onClick={() => setAnswers({ ...answers, [q.id]: i })}
                      className={`flex w-full items-center justify-between rounded-lg border p-3 text-left text-sm transition-smooth ${cls}`}>
                      <span>{opt}</span>
                      {showResult && correct && <CheckCircle2 className="h-4 w-4" />}
                      {showResult && selected && !correct && <XCircle className="h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        {!submitted && (
          <Button onClick={submit} variant="hero" size="lg" className="mt-6 w-full">Kumpulkan Jawaban</Button>
        )}
      </div>
    </div>
  );
}
