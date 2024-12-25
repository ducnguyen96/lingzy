import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFilename(mime: "audio" | "photo") {
  let filename = nanoid();
  if (mime === "audio") {
    filename = `${filename}.mp3`;
  } else {
    filename = `${filename}.jpeg`;
  }
  return `/assets/${mime}/${filename}`;
}
