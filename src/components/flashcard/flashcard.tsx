"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Frown,
  Meh,
  Redo2,
  Smile,
  SwatchBookIcon,
  Undo2,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { wordTypeToColor } from "@/config/features";
import { countryEmoji } from "../audio-button";
import { ReviewQuality } from "@/enums/review";
import { TodayWordEntity } from "@/lib/server/services/daily-word";
import "./flashcard.css";
import ReviewButton from "./review-button";

interface FlashCardProps {
  className?: string;
  focused: boolean;
  review: (id: number, rating: ReviewQuality) => void;
  entity: TodayWordEntity;
}

export default function FlashCard(props: FlashCardProps) {
  const { className, review, focused, entity } = props;
  const [flipped, setFlipped] = useState(false);
  const { word: translation, id } = entity;
  const { word } = translation;
  const pronun = word.pronunciations.find((p) => p.country === "us");

  useEffect(() => {
    if (focused && pronun && pronun.audio) new Audio(pronun.audio).play();
  }, [focused, pronun]);

  return (
    <div
      className={cn(
        "flash-card p-3",
        focused ? "" : "cursor-default pointer-events-none select-none",
        flipped ? "flipped" : "",
        className,
      )}
    >
      <div className="flash-card-inner">
        {/* Front */}
        <div className="flash-card-front bg-primary/10 shadow-xl shadow-foreground/20 rounded-3xl">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="p-7 px-10 rounded-tr-3xl rounded-bl-3xl bg-blue-500 [&_svg]:size-5"
              onClick={() => pronun && new Audio(pronun.audio).play()}
            >
              <Volume2 />
            </Button>
          </div>
          <div className="flex-1 flex flex-col gap-6 text-center p-6">
            <span className="font-semibold text-xl">{word.word}</span>
            <p
              className={cn("font-semibold", wordTypeToColor(translation.type))}
            >
              [ {translation.type} ]
            </p>

            <span>
              {countryEmoji["us"]} {pronun?.phonetic}
            </span>
            {translation.examples.length ? (
              <div className="rounded-3xl bg-background p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <SwatchBookIcon className="text-muted-foreground" size={20} />
                  <span className="font-semibold text-sm">Example</span>
                </div>
                <ul className="space-y-2 p-1 max-h-24 overflow-scroll text-muted-foreground text-start list-disc list-inside marker:text-yellow-500">
                  {translation.examples.slice(0, 2).map((example, idx) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <Button
            className="py-7 rounded-t-none rounded-b-3xl"
            onClick={() => setFlipped(!flipped)}
          >
            <Undo2 /> Tap to see definition
          </Button>
        </div>
        {/* Back */}
        <div className="flash-card-back bg-primary/10 shadow-lg shadow-foreground/30 rounded-3xl">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFlipped(!flipped)}
            className="p-2 bg-blue-500 py-6 px-9 [&_svg]:size-5 rounded-tl-3xl rounded-br-3xl"
          >
            <Redo2 />
          </Button>

          <div className="flex-1 p-4 text-center flex items-center justify-center">
            {translation.translation}
          </div>
          <div className="flex cursor-pointer">
            <ReviewButton
              className="rounded-bl-3xl bg-red-500 text-red-100 dark:bg-red-800 dark:text-red-500"
              icon={<Frown />}
              text="Didn't know"
              action={() => review(id, ReviewQuality.bad)}
            />
            <ReviewButton
              className="bg-yellow-500 text-yellow-100 dark:bg-yellow-800 dark:text-yellow-500"
              icon={<Meh />}
              text="Almost knew"
              action={() => review(id, ReviewQuality.normal)}
            />
            <ReviewButton
              className="rounded-br-3xl bg-green-500 text-green-100 dark:bg-green-800 dark:text-green-500"
              icon={<Smile />}
              text="Knew it"
              action={() => review(id, ReviewQuality.good)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
