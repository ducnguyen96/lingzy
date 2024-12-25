"use client";
import { Button } from "../ui/button";

export function WordBoxButton(props: { type: string; quant: number }) {
  return (
    <Button
      className="rounded-3xl capitalize"
      onClick={() => (location.hash = `#${props.type}`)}
    >
      {props.type}({props.quant})
    </Button>
  );
}
