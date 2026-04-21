import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 ${className}`}>
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
      <GraduationCap className="h-5 w-5 text-primary-foreground" />
    </div>
    <span className="font-display text-xl font-bold tracking-tight">
      dyy<span className="text-gradient">LEARNING</span>
    </span>
  </Link>
);
