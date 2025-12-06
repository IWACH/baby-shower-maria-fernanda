import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AdminBadge() {
  return (
    <Badge
      variant="outline"
      className="gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-700 dark:text-purple-400 font-medium"
    >
      <Shield className="w-4 h-4" />
      Modo Admin
    </Badge>
  );
}
