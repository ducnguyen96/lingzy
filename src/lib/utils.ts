import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFilename(mime: "audio" | "photo") {
  let filename = `${new Date().getTime()}`;
  if (mime === "audio") {
    filename = `${filename}.mp3`;
  } else {
    filename = `${filename}.jpeg`;
  }
  return { path: `/assets/${mime}/${filename}` };
}
