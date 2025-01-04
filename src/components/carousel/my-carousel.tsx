"use client";
import EmblaCarousel from "@/components/carousel/embla-carousel";
import FlashCard from "@/components/flashcard/flashcard";
import { ReviewQuality } from "@/enums/review";
import { TodayWordEntity } from "@/lib/server/services/daily-word";
import useEmblaCarousel from "embla-carousel-react";
import { GraduationCap, X } from "lucide-react";
import { useState } from "react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { EmblaOptionsType } from "embla-carousel";
import { cn } from "@/lib/utils";
import { useGlobalLoading } from "../providers/global-loading-provider";

export default function MyCarousel({
  todayWords,
}: {
  todayWords: TodayWordEntity[];
}) {
  const [index, setIndex] = useState(0);
  const { toggleLoading } = useGlobalLoading();
  const len = todayWords.length;

  const opts: EmblaOptionsType = {
    align: "center",
    containScroll: false,
    dragFree: false,
    watchDrag: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(opts);
  const [emblaRef1, emblaApi1] = useEmblaCarousel({ ...opts, align: "start" });

  const review = (quality: ReviewQuality) => {
    if (emblaApi) emblaApi.scrollNext();
    if (emblaApi1) emblaApi1.scrollNext();
    setIndex(index + 1);
    toggleLoading();
  };

  return (
    <>
      <div className="z-10 bg-background border p-4 md:py-6 md:px-12 lg:px-28 xl:px-52 2xl:px-80">
        <div className="flex items-center gap-6 font-semibold">
          <div className="flex items-center gap-4">
            <GraduationCap className="text-primary" size={32} />
            <span className="text-lg">Flashcard</span>
          </div>
          <div className="flex items-center gap-4 flex-1">
            <Progress
              value={Math.round((index / len) * 100)}
              className="[&>div]:duration-1000"
            />
            <span className="text-primary">
              {index}/{len}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="[&_svg]:size-5">
            <X />
          </Button>
        </div>
        <EmblaCarousel
          emblaApi={emblaApi1}
          emblaRef={emblaRef1}
          className="mt-4 hidden lg:block"
          effect={["opacity"]}
        >
          {todayWords.map((entity, idx) => (
            <span
              key={entity.id}
              className={cn(
                "embla__slide h-10 px-4 py-2 rounded-2xl bg-primary/10 border ml-4",
                index === idx ? "border-primary" : "",
              )}
            >
              {entity.word.word.word}
            </span>
          ))}
        </EmblaCarousel>
      </div>
      <EmblaCarousel
        emblaApi={emblaApi}
        emblaRef={emblaRef}
        className="mt-10 lg:mt-20"
      >
        {todayWords.map((entity, idx) => (
          <FlashCard
            key={entity.id}
            entity={entity}
            focused={index === idx}
            review={review}
            className="embla__slide h-[550px] lg:h-[600px] md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          />
        ))}
      </EmblaCarousel>
    </>
  );
}
