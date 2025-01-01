"use client";
import EmblaCarousel from "@/components/carousel/carousel";
import FlashCard from "@/components/flashcard/flashcard";
import { ReviewQuality } from "@/enums/review";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";

export default function Page() {
  const [index, setIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    dragFree: false,
    watchDrag: false,
  });

  const review = (quality: ReviewQuality) => {
    if (emblaApi) emblaApi.scrollNext();
    setIndex(index + 1);
  };

  return (
    <EmblaCarousel emblaApi={emblaApi} emblaRef={emblaRef}>
      <FlashCard
        focused={index === 0}
        review={review}
        className="embla__slide h-[650px] w-[calc(100vw-32px)] md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      />
      <FlashCard
        focused={index === 1}
        review={review}
        className="embla__slide h-[650px] w-[calc(100vw-32px)] md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      />
      <FlashCard
        focused={index === 2}
        review={review}
        className="embla__slide h-[650px] w-[calc(100vw-32px)] md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      />
      <FlashCard
        focused={index === 3}
        review={review}
        className="embla__slide h-[650px] w-[calc(100vw-32px)] md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      />
      <FlashCard
        focused={index === 4}
        review={review}
        className="embla__slide h-[650px] w-[calc(100vw-32px)] md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      />
      <FlashCard
        focused={index === 5}
        review={review}
        className="embla__slide h-[650px] w-[calc(100vw-32px)] md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      />
    </EmblaCarousel>
  );
}
