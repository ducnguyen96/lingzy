import { PronunciationEntity } from "@/lib/server/services/dictionary";
import PronunciationButton from "../audio-button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { wordTypeToColor } from "@/config/features";
import UserActionBlock from "./user-action-block";

type WordBoxProps = {
  word: string;
  translationId: number;
  pronunciations: PronunciationEntity[];
  translations: { type: string; quant: number }[];
};
export default function WordBox({
  word,
  translationId,
  pronunciations,
  translations = [],
}: WordBoxProps) {
  return (
    <div className="rounded-2xl border flex flex-col">
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize">{word}</p>
          <UserActionBlock translationId={translationId} />
        </div>
      </div>
      <div className="p-4">
        {pronunciations.map((item) => (
          <PronunciationButton key={item.id} {...item} />
        ))}
      </div>
      <div className="flex flex-wrap items-center p-4 justify-between border rounded-b-2xl">
        <div className="flex flex-wrap gap-4">
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
        <p className="text-xs text-center font-semibold text-muted-foreground">
          Definition & Meaning of &quot;{word}&quot;
        </p>
      </div>
    </div>
  );
}
