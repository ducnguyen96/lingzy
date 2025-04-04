import { wordTypeToColor } from "@/config/features";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TranslationGroupBoxProps = {
  className?: string;
  children: ReactNode;
  title: string;
  type: string;
};

export default function TranslationGroupBox({
  children,
  className,
  title,
  type,
}: TranslationGroupBoxProps) {
  return (
    <div className={className} id={type}>
      <div className="border rounded-2xl">
        <div className="flex items-center justify-between bg-muted p-4 rounded">
          <span className="text-xl">{title}</span>
          <span
            className={cn(
              "text-xs text-white font-semibold px-2 py-1 rounded uppercase",
              wordTypeToColor(type, "bg"),
            )}
          >
            {type}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
