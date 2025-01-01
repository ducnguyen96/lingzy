"use client";

import { PronunciationEntity } from "@/lib/server/services/dictionary";
import { Volume2 } from "lucide-react";

export const countryEmoji: Record<string, string> = {
  uk: "🇬🇧",
  us: "🇺🇸",
};

export default function PronunciationButton({
  country,
  phonetic,
  audio,
}: PronunciationEntity) {
  return (
    <div className="flex items-center gap-4">
      <p>{countryEmoji[country]}</p>
      <Volume2
        className="cursor-pointer opacity-70"
        onClick={() => new Audio(audio).play()}
      />
      <p className="opacity-50">/{phonetic}/</p>
    </div>
  );
}
