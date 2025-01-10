"use client";

import EmblaCarousel from "@/components/carousel/embla-carousel";
import { everyComp } from "@/config/overview";
import { cn } from "@/lib/utils";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { CalendarSync } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function IntervalsCarousel() {
  const path = usePathname();
  const segments = path.split("/");
  const opts: EmblaOptionsType = {
    align: "start",
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(opts);

  const defaultEntries = Object.entries(everyComp);
  type Entry = (typeof defaultEntries)[0];
  const items: Entry[] = [
    ["all", { title: "All" }],
    ...defaultEntries,
    ["learned", { title: "Learned" }],
  ];

  return (
    <EmblaCarousel
      emblaApi={emblaApi}
      emblaRef={emblaRef}
      effect={[]}
      className="p-6"
    >
      {items.map(([key, { title }], idx) => {
        const isCurrent = segments[segments.length - 1] === key;
        return (
          <Link
            key={key}
            href={`/dashboard/daily-words/list/${key}`}
            className={cn(
              "embla__slide [&:not(:first-child)]:ml-4 text-sm md:text-base font-semibold px-3 py-2 rounded-3xl flex items-center gap-2",
              isCurrent ? "text-primary" : "text-muted-foreground",
              isCurrent ? "bg-primary/30" : "bg-primary/10",
            )}
          >
            <div className="relative">
              <CalendarSync className="size-6" strokeWidth={1} />
              <div className="absolute flex items-center justify-center w-5 h-5 text-sm font-semibold rounded-full -top-1 -right-2">
                <span>{idx + 1}</span>
              </div>
            </div>
            <span>{title}</span>
          </Link>
        );
      })}
    </EmblaCarousel>
  );
}
