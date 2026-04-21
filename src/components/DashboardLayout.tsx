import { useNavigate, NavLink as RRNavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard, BookOpen, GraduationCap, Users, BarChart3,
  PlusSquare, ClipboardList, LogOut, User as UserIcon, Library,
  Menu, Home
} from "lucide-react";
import { useEffect, useState } from "react";

const linksByRole = {
  STUDENT: [
    { to: "/dashboard",         label: "Dashboard",  icon: LayoutDashboard, end: true },
    { to: "/dashboard/courses", label: "Kursus Saya", icon: Library },
    { to: "/courses",           label: "Jelajah",    icon: BookOpen },
    { to: "/profile",           label: "Profil",     icon: UserIcon },
  ],
  INSTRUCTOR: [
    { to: "/dashboard",          label: "Dashboard",       icon: LayoutDashboard, end: true },
    { to: "/dashboard/manage",   label: "Kelola Kursus",   icon: BookOpen },
    { to: "/dashboard/create",   label: "Buat Kursus",     icon: PlusSquare },
    { to: "/dashboard/students", label: "Statistik Siswa", icon: BarChart3 },
    { to: "/profile",            label: "Profil",          icon: UserIcon },
  ],
  ADMIN: [
    { to: "/dashboard",         label: "Statistik",         icon: BarChart3, end: true },
    { to: "/dashboard/users",   label: "Manajemen User",    icon: Users },
    { to: "/dashboard/courses-admin", label: "Manajemen Kursus", icon: BookOpen },
    { to: "/profile",           label: "Profil",            icon: UserIcon },
  ],
} as const;

const roleColor: Record<string, string> = {
  STUDENT: "bg-success/20 text-success border-success/30",
  INSTRUCTOR: "bg-primary/20 text-primary-glow border-primary/30",
  ADMIN: "bg-warning/20 text-warning border-warning/30",
};

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;
  const links = linksByRole[user.role];

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <div className="flex flex-col gap-1">
      <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Umum</div>
      <RRNavLink to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-smooth text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={onClick}>
        <Home className="h-4 w-4" /> Beranda
      </RRNavLink>
      <RRNavLink to="/courses" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-smooth text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={onClick}>
        <BookOpen className="h-4 w-4" /> Kursus
      </RRNavLink>
      <div className="my-2 border-t border-sidebar-border/50" />
      
      <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Menu {user.role}</div>
      {links.map((l) => (
        <RRNavLink
          key={l.to}
          to={l.to}
          end={"end" in l ? l.end : false}
          onClick={onClick}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth ${
              isActive
                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`
          }
        >
          <l.icon className="h-4 w-4" />
          {l.label}
        </RRNavLink>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-border/40 bg-sidebar md:flex md:flex-col">
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <Logo />
        </div>
        <div className="flex-1 p-4">
          <NavLinks />
        </div>
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{user.name}</div>
              <Badge variant="outline" className={`mt-0.5 text-[10px] ${roleColor[user.role]}`}>{user.role}</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => { logout(); navigate("/"); }}>
            <LogOut className="mr-2 h-4 w-4" /> Keluar
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {/* Mobile top nav */}
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/40 bg-background/80 px-4 backdrop-blur md:hidden">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] border-r-border/40 bg-sidebar p-0">
                <SheetHeader className="border-b border-sidebar-border p-6 text-left">
                  <SheetTitle><Logo /></SheetTitle>
                </SheetHeader>
                <div className="p-4">
                  <NavLinks onClick={() => setOpen(false)} />
                </div>
                <div className="absolute bottom-0 w-full border-t border-sidebar-border p-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => { logout(); navigate("/"); }}>
                    <LogOut className="mr-2 h-4 w-4" /> Keluar
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Logo />
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-primary text-[10px] text-primary-foreground">
              {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="container py-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
