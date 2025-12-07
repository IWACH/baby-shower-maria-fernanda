import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AdminBadge() {
  return (
    <Badge
      variant="outline"
      className="gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 text-primary dark:text-primary font-medium"
    >
      <Shield className="w-4 h-4" />
      Modo Admin
    </Badge>
  );
}
