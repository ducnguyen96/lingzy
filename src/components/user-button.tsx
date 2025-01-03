"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Bookmark,
  CalendarSync,
  ChartColumn,
  Folders,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { DailyWordBadge } from "./word-count-badge";

const menuItems = [
  {
    title: "daily words",
    href: "/dashboard/daily-words/overview",
    icon: { icon: CalendarSync },
  },
  {
    title: "my word lists",
    href: "/dashboard/my-category",
    icon: { icon: Folders },
  },
  {
    title: "bookmarks",
    href: "/dashboard/bookmarks",
    icon: { icon: Bookmark },
  },
  {
    title: "stats",
    href: "/dashboard/my-stats",
    icon: { icon: ChartColumn },
  },
];

export default function UserButton() {
  const { status, data } = useSession();

  switch (status) {
    case "loading":
      return <Skeleton className="h-8 w-8 rounded-full" />;

    case "unauthenticated":
      return (
        <Button onClick={() => signIn("google")}>Signin With Google</Button>
      );
    default:
      const user = data.user!;
      const userImg = user.image!;
      const userImgAlt = `${user.name}-logo`;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              height={30}
              width={30}
              src={userImg}
              alt={userImgAlt}
              className="rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuLabel className="flex items-center justify-between gap-4">
              <Image
                className="rounded-full"
                width={30}
                height={30}
                src={userImg}
                alt={userImgAlt}
              />
              <div>
                <p className="text-lg font-light">{user.name}</p>
                <p className="font-light">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {menuItems.map(({ title, href, icon }, idx) => (
              <DropdownMenuItem key={idx}>
                <Link
                  href={href}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-2">
                    <icon.icon size={16} />
                    <p className="capitalize">{title}</p>
                  </div>
                  {idx === 0 ? <DailyWordBadge /> : null}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut size={16} /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
  }
}
