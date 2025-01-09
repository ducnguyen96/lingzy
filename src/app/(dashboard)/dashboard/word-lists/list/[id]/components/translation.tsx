import { Button } from "@/components/ui/button";
import { wordTypeToColor } from "@/config/features";
import { noPhoto } from "@/config/placeholder";
import { WordListWithTranslations } from "@/lib/server/services/word-list";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import Image from "next/image";

interface Props {
  className?: string;
  entity: WordListWithTranslations["translations"][0];
}
export function Translation(props: Props) {
  const { className, entity } = props;
  const { wordPhoto, type, word } = entity;

  return (
    <div
      className={cn(
        "relative group flex flex-col items-center rounded-3xl bg-primary/5 p-4 shadow-foreground/10 hover:shadow-foreground/30 cursor-pointer shadow text-center",
        className,
      )}
    >
      <Image
        width={200}
        height={200}
        alt=""
        className="rounded-2xl w-16 h-16 lg:w-24 lg:h-24"
        src={wordPhoto?.thumbnail || noPhoto}
      />
      <span className="text-muted-foreground mt-4">{word.word}</span>
      <span
        className={cn(
          "text-xs line-clamp-1 w-full text-white font-semibold px-2 py-1 rounded uppercase",
          wordTypeToColor(type, "text"),
        )}
      >
        {type}
      </span>
      <Button
        variant="secondary"
        className="absolute right-2 top-2 text-destructive hidden group-hover:flex"
        size="icon"
      >
        <CircleX />
      </Button>
    </div>
  );
}
