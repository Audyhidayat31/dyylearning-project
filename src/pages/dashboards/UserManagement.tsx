import { DEMO_USERS } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, Shield, UserCheck } from "lucide-react";

const roleColor: Record<string, string> = {
  STUDENT: "bg-success/20 text-success border-success/30",
  INSTRUCTOR: "bg-primary/20 text-primary-glow border-primary/30",
  ADMIN: "bg-warning/20 text-warning border-warning/30",
};

export const UserManagement = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Manajemen User</h1>
        <p className="text-sm text-muted-foreground">Kelola hak akses dan peran pengguna di platform.</p>
      </div>

      <Card className="overflow-hidden bg-gradient-card">
        <div className="divide-y divide-border/40">
          {DEMO_USERS.map((u) => (
            <div key={u.id} className="flex items-center justify-between gap-4 p-4 transition-smooth hover:bg-accent/10">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-[10px] ${roleColor[u.role]}`}>{u.role}</Badge>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Shield className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
