"use client";

import Link from "next/link";
import { Home, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { homeRouteForRole } from "@/lib/auth-storage";

export function DashboardHeader() {
  const { user, logout } = useAuth();
  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const home = homeRouteForRole(user.role);

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href={home} className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-5 w-5" />
          <span>DevSubmit</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/" />}
            nativeButton={false}
          >
            <Home className="mr-1 h-4 w-4" />
            Home
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="hidden flex-col items-start text-xs sm:flex">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-muted-foreground">{user.role}</span>
                  </div>
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56">
              {/* Plain div — no Base UI GroupLabel context needed */}
              <div className="flex flex-col px-2 py-1.5 text-sm">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                render={
                  <button
                    type="button"
                    className="relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent focus:bg-accent"
                    onClick={() => logout()}
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
