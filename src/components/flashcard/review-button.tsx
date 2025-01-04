import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ReviewButtonProps {
  className?: string;
  icon: ReactNode;
  text: string;
  action: () => void;
}

export default function ReviewButton(props: ReviewButtonProps) {
  const { icon, text, action, className } = props;
  return (
    <div
      className={cn("flex flex-col flex-1 text-center p-2", className)}
      onClick={action}
    >
      <div className="flex justify-center">{icon}</div>
      <span>{text}</span>
    </div>
  );
}
