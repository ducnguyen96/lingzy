"use client";

import { ReactNode, useState } from "react";
import FlipCard from "../flipcard/flipcard";
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

interface ReviewButtonProps {
  className?: string;
  icon: ReactNode;
  text: string;
  action: () => void;
}

interface FlashCardProps {
  className?: string;
  focused: boolean;
  review: (quality: ReviewQuality) => void;
}

function ReviewButton(props: ReviewButtonProps) {
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

export default function FlashCard(props: FlashCardProps) {
  const { className, review, focused } = props;
  const [flipped, setFlipped] = useState(false);

  return (
    <FlipCard
      flipped={flipped}
      className={cn(
        focused ? "" : "cursor-default pointer-events-none select-none",
        className,
      )}
      front={
        <div
          className={cn(
            "flip-card-front bg-primary/10 shadow-xl shadow-foreground/20 rounded-3xl",
          )}
        >
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="p-7 px-10 rounded-tr-3xl rounded-bl-3xl bg-blue-500 [&_svg]:size-5"
            >
              <Volume2 />
            </Button>
          </div>
          <div className="flex-1 flex flex-col gap-6 text-center p-6">
            <span className="font-semibold text-xl">codex</span>
            <span className={wordTypeToColor("noun")}>[noun]</span>
            <span>{countryEmoji["us"]} /kˈoʊdɛks/</span>
            <div className="rounded-3xl bg-background p-4 space-y-4">
              <div className="flex items-center gap-2">
                <SwatchBookIcon className="text-muted-foreground" size={20} />
                <span className="font-semibold text-sm">Example</span>
              </div>
              <ul className="space-y-2 text-muted-foreground text-start list-disc list-inside marker:text-yellow-500">
                {[
                  "The codex was carefully preserved in a climate-controlled vault to prevent further deterioration of its delicate parchment pages.",
                  "The museum's prized exhibit is an illuminated codex from the medieval period, featuring intricately detailed illustrations and calligraphy.",
                ]
                  .slice(0, 2)
                  .map((example, idx) => (
                    <li key={idx}>{example}</li>
                  ))}
              </ul>
            </div>
          </div>
          <Button
            className="py-7 rounded-t-none rounded-b-3xl"
            onClick={() => setFlipped(!flipped)}
          >
            <Undo2 /> Tap to see definition
          </Button>
        </div>
      }
      back={
        <div className="flip-card-back bg-primary/10 shadow-lg shadow-foreground/30 rounded-3xl">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFlipped(!flipped)}
            className="p-2 bg-blue-500 py-6 px-9 [&_svg]:size-5 rounded-tl-3xl rounded-br-3xl"
          >
            <Redo2 />
          </Button>

          <div className="flex-1 text-center flex items-center">
            an ancient book, written by hand, especially of scriptures,
            classics, etc.
          </div>
          <div className="flex">
            <ReviewButton
              className="rounded-bl-3xl bg-red-500 text-red-100 dark:bg-red-800 dark:text-red-500"
              icon={<Frown />}
              text="Didn't know"
              action={() => review(ReviewQuality.bad)}
            />
            <ReviewButton
              className="bg-yellow-500 text-yellow-100 dark:bg-yellow-800 dark:text-yellow-500"
              icon={<Meh />}
              text="Almost knew"
              action={() => review(ReviewQuality.bad)}
            />
            <ReviewButton
              className="rounded-br-3xl bg-green-500 text-green-100 dark:bg-green-800 dark:text-green-500"
              icon={<Smile />}
              text="Knew it"
              action={() => review(ReviewQuality.good)}
            />
          </div>
        </div>
      }
    />
  );
}
