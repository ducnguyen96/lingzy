"use client";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar() {
  const { data: session } = useSession();

  if (!session || !session.user) return <p>No User</p>;

  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>{session.user.name}</AvatarFallback>
    </Avatar>
  );
}
