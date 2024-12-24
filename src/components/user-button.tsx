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
import { CalendarSync, LogOut } from "lucide-react";
import Link from "next/link";

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
            <DropdownMenuItem>
              <Link href="/daily-words" className="flex items-center gap-4">
                <CalendarSync /> daily words
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
  }
}
