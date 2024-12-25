"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Bookmark,
  CalendarSync,
  ChartColumn,
  Folders,
  LogOut,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    title: "daily words",
    href: "/daily-words",
    icon: { icon: CalendarSync },
  },
  {
    title: "my word lists",
    href: "/word-lists",
    icon: { icon: Folders },
  },
  {
    title: "bookmarks",
    href: "/bookmarks",
    icon: { icon: Bookmark },
  },
  {
    title: "stats",
    href: "/stats",
    icon: { icon: ChartColumn },
  },
];

export default function UserButton() {
  const { data: session, status } = useSession();

  switch (status) {
    case "loading":
      return <Skeleton className="h-12 w-12 rounded-full" />;

    case "unauthenticated":
      return (
        <Button onClick={() => signIn("google")}>Signin With Google</Button>
      );

    default:
      const user = session.user!;
      const userImg = user.image!;
      const userImgAlt = `${user.name}-logo`;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={userImg} alt={userImgAlt} />
            </Avatar>
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
                <Link href={href} className="flex items-center gap-4 w-full">
                  <icon.icon size={16} />
                  <p className="capitalize">{title}</p>
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
