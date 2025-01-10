"use client";

import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import "./embla-carousel.css";
import { EmblaViewportRefType } from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TWEEN_FACTOR_BASE = 0.1;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

interface PropType extends PropsWithChildren {
  className?: string;
  emblaRef: EmblaViewportRefType;
  emblaApi?: EmblaCarouselType;
  effect?: string[];
  hideControl?: boolean;
}

export default function EmblaCarousel(props: PropType) {
  const {
    children,
    emblaRef,
    emblaApi,
    className,
    effect = ["opacity", "scale"],
    hideControl,
  } = props;

  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const tweenNode = tweenNodes.current[slideIndex];
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();

          if (effect.includes("opacity")) tweenNode.style.opacity = opacity;
          if (effect.includes("scale"))
            tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  return (
    <div className={cn("relative group", className)}>
      {!hideControl ? (
        <Button
          size="icon"
          variant="secondary"
          className="opacity-50 rounded-full group-hover:opacity-100 absolute top-1/2 left-0 !-translate-y-1/2 z-10"
          onClick={scrollPrev}
        >
          <ChevronLeft />
        </Button>
      ) : null}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>
      {!hideControl ? (
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full opacity-50 group-hover:opacity-100 absolute top-1/2 right-0 -translate-y-1/2 z-10"
          onClick={scrollNext}
        >
          <ChevronRight />
        </Button>
      ) : null}
    </div>
  );
}
