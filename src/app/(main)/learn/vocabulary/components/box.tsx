import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export default function Box({ children, className }: Props) {
  return (
    <div className={cn("bg-primary/10 p-4 lg:p-6 rounded-3xl", className)}>
      {children}
    </div>
  );
}
