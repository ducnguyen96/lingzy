import { PronunciationEntity } from "@/lib/server/services/dictionary";
import PronunciationButton from "../audio-button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { wordTypeToColor } from "./colors";

type WordBoxProps = {
  word: string;
  pronunciations: PronunciationEntity[];
  translations: { type: string; quant: number }[];
};
export default function WordBox({
  word,
  pronunciations,
  translations = [],
}: WordBoxProps) {
  return (
    <div className="rounded-2xl border flex flex-col">
      <div className="p-4 pb-0">
        <p className="text-2xl font-semibold capitalize">{word}</p>
      </div>
      <div className="p-4">
        {pronunciations.map((item) => (
          <PronunciationButton key={item.id} {...item} />
        ))}
      </div>
      <div className="flex items-center p-4 justify-between border rounded-b-2xl">
        <div className="flex gap-4">
          {translations.map(({ type, quant }, idx) => (
            <Link
              key={idx}
              href={`#${type}`}
              className={cn(
                "text-xs text-white font-semibold p-2 rounded uppercase",
                wordTypeToColor(type, "bg"),
              )}
            >
              {type}({quant})
            </Link>
          ))}
        </div>
        <p className="text-xs font-semibold text-muted-foreground">
          Definition & Meaning of &quot;{word}&quot;
        </p>
      </div>
    </div>
  );
}
