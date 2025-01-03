import { cn } from "@/lib/utils";
import { ArrowRight, CalendarSync } from "lucide-react";
import Link from "next/link";
import { cloneElement, JSX } from "react";

interface EveryComponentProps {
  href: string;
  text: string;
  value: number;
  badge: JSX.Element;
  color: string;
}

export default function EveryComponent(props: EveryComponentProps) {
  const { text, value, badge, color, href } = props;

  return (
    <Link
      prefetch={false}
      className="flex items-center gap-4 group"
      href={href}
    >
      <div className="relative">
        <CalendarSync size={40} className={`text-${color}`} strokeWidth={1} />
        <div
          className={cn(
            "absolute flex items-center justify-center w-5 h-5 text-sm font-semibold rounded-full -top-1 -right-2",
            `bg-${color}`,
          )}
        >
          {cloneElement(badge)}
        </div>
      </div>
      <div className="flex flex-1 bg-background rounded-3xl p-4 lg:px-6 items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <span className="lg:text-lg">{text}</span>
          <div
            className={cn(
              "p-2 py-1 space-x-2 bg-opacity-50 rounded-3xl",
              `text-${color} bg-${color}`,
            )}
          >
            <span className="font-semibold textsm">{value}</span>
            <span>Word</span>
          </div>
        </div>
        <ArrowRight className="group-hover:translate-x-4 transition-transform duration-300" />
      </div>
    </Link>
  );
}
