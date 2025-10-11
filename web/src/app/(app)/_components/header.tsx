"use client";

import { Brain } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { authClient } from "~/lib/auth.client";

export const Header = () => {
  return (
    <header className="max-w-3xl mx-auto p-4 flex flex-row items-center justify-between">
      <Link href="/app" className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Brain</h2>
          <p className="text-xs text-muted-foreground">Your second brain</p>
        </div>
      </Link>
      <UserMenu />
    </header>
  );
};

const menuItems = [
  { label: "Profile", href: "/app/profile" },
  { label: "Billing", href: "/app/billing" },
  { label: "Settings", href: "/app/settings" },
];

const externalLinks = [
  {
    label: "GitHub",
    href: "https://github.com/jabedzaman/second-brain",
  },
  {
    label: "Support",
    href: "https://github.com/jabedzaman/second-brain/issues",
  },
  { label: "API", href: "#", disabled: true },
];

const UserMenu = () => {
  const { useSession, signOut } = authClient;
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarImage
            src={session?.user?.image || undefined}
            alt={session?.user?.name || "User Avatar"}
          />
          <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">Home</Link>
        </DropdownMenuItem>
        {externalLinks.map((item) => (
          <DropdownMenuItem
            key={item.href}
            asChild
            className={item.disabled ? "opacity-50 pointer-events-none" : ""}
          >
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-disabled={item.disabled ? true : undefined}
            >
              {item.label}
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            signOut({
              fetchOptions: {
                onSuccess: () => router.push("/sign-in"),
                onError: (error: any) => {
                  toast.error(`Error signing out: ${error.message}`);
                },
              },
            })
          }
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
