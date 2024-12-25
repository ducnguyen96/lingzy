import { PronunciationEntity } from "@/lib/server/services/dictionary";
import PronunciationButton from "../audio-button";
import { WordBoxButton } from "./word-box-button";

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
      <div className="flex items-center px-4 py-2 justify-between border rounded-b-2xl">
        <div className="flex gap-4">
          {translations.map((item, idx) => (
            <WordBoxButton key={idx} {...item} />
          ))}
        </div>
        <p className="text-xs font-semibold opacity-50">
          Definition & Meaning of &quot;{word}&quot;
        </p>
      </div>
    </div>
  );
}
