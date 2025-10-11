import { Brain } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <Link href="/" className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Brain</h2>
          <p className="text-xs text-muted-foreground">Your second brain</p>
        </div>
      </Link>
    </div>
  );
};
