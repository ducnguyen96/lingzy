"use client";

import EmblaCarousel from "@/components/carousel/embla-carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMyWordLists } from "@/lib/server/queries/user/word-lists";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export default function MyWordListsCarousel(props: {
  wordLists: Awaited<ReturnType<typeof getMyWordLists>>;
}) {
  const { wordLists } = props;

  const opts: EmblaOptionsType = {
    align: "start",
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(opts);
  return (
    <EmblaCarousel
      emblaApi={emblaApi}
      emblaRef={emblaRef}
      effect={[]}
      className="mt-8"
    >
      {wordLists.map((entity, idx) => (
        <TooltipProvider key={entity.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={cn("embla__slide")}>
                {entity.thumbnail && (
                  <Image
                    width={64}
                    height={64}
                    src={entity.thumbnail}
                    alt={entity.title}
                    className="rounded-full w-16 h-16"
                  />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>{entity.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </EmblaCarousel>
  );
}
