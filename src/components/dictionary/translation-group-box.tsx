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
    <div className={className}>
      <div className="border rounded-2xl">
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded">
          <span className="text-2xl">{title}</span>
          <span
            id={type}
            className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
          >
            {type}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
