"use client";
import { ReactNode } from "react";
import "./flipcard.css";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  flipped: boolean;
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

export default function FlipCard(props: FlipCardProps) {
  const { front, back, className, flipped } = props;

  return (
    <div className={cn("flip-card p-3", className, flipped ? "flipped" : "")}>
      <div className="flip-card-inner">
        {front}
        {back}
      </div>
    </div>
  );
}
