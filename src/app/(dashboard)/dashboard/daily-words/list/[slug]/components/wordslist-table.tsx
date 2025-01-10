"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { wordTypeToColor } from "@/config/features";
import { noPhoto } from "@/config/placeholder";
import { getUserDailyWords } from "@/lib/server/queries/user/daily-words";
import { cn } from "@/lib/utils";
import { TZDate } from "@date-fns/tz";
import { isToday, isTomorrow, format } from "date-fns";
import { CalendarSync, Clock, Hourglass, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  words: Awaited<ReturnType<typeof getUserDailyWords>>;
}

export default function WordslistTable(props: Props) {
  const { words } = props;
  const [selected, setSelected] = useState<number[]>([]);

  const onClick = (id: number) => {
    let state = [...selected];
    const includes = selected.includes(id);
    if (includes) state = state.filter((item) => item !== id);
    if (!includes) state.push(id);
    setSelected(state);
  };

  return (
    <div className="px-4 py-6 bg-primary/5">
      <div className="p-6 flex items-center justify-between bg-primary/10 rounded-t-3xl">
        <span className="font-semibold">Wordslist</span>
        <Button variant="secondary" size="icon" disabled={!selected.length}>
          <Trash />
        </Button>
      </div>
      <div className="bg-background">
        {words.map(({ id, word, nextReview, updatedAt, completedAt }) => {
          const isLearned = !!completedAt;
          const isWaiting = !isLearned && !updatedAt;

          const reviewDay = new TZDate(nextReview);
          let reviewDate = format(reviewDay, "iii");
          if (isToday(reviewDay)) reviewDate = "Today";
          if (isTomorrow(reviewDay)) reviewDate = "Tomorrow";
          return (
            <div
              key={id}
              className="text-sm lg:text-base flex justify-between items-center p-4"
            >
              <div className="flex items-center gap-2">
                <Image
                  width={100}
                  height={100}
                  alt=""
                  src={word.wordPhoto?.thumbnail || noPhoto}
                  className="hidden md:block w-12 h-10 rounded"
                />
                <div className="flex flex-wrap gap-1 line-clamp-1">
                  <span>{word.title}</span>
                  <span
                    className={cn("font-semibold", wordTypeToColor(word.type))}
                  >
                    [ {word.type} ]
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 justify-end">
                  <Clock className="size-4" />
                  <div className="flex items-center gap-2">
                    <span className="hidden md:block">Learning time:</span>
                    <span className="font-semibold">{reviewDate}</span>
                  </div>
                  <div className="relative">
                    <CalendarSync
                      className={cn(
                        "size-6 text-purple-400",
                        isLearned && "text-green-400",
                        isWaiting && "text-orange-400",
                      )}
                      strokeWidth={1}
                    />
                    {isWaiting && (
                      <div className="absolute flex items-center justify-center w-3 h-3 text-sm font-semibold rounded-full -top-1 -right-2 bg-orange-400">
                        <Hourglass className="size-2" />
                      </div>
                    )}
                  </div>
                </div>
                <Checkbox
                  checked={selected.includes(id)}
                  onClick={() => onClick(id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
