"use client";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import { Input } from "./ui/input";

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  className?: string;
  field?: ControllerRenderProps<TFieldValues, TName>;
  setValue?: UseFormSetValue<TFieldValues>;
  fieldName?: TName;
}

export default function AvatarUploadButton<
  F extends FieldValues = FieldValues,
  N extends FieldPath<F> = FieldPath<F>,
>({ className, field, setValue, fieldName }: Props<F, N>) {
  const ref = useRef<HTMLInputElement>(null);
  const formData = new FormData();

  const [src, setSrc] = useState();

  const [progress, setProgress] = useState(0);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;

    const file = event.target.files[0];
    formData.set("file", file);

    const progressRef = { current: progress };

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = 10 + Math.round(0.9 * prevProgress);
        progressRef.current = newProgress;
        return newProgress;
      });
    }, 300);

    const res = await fetch("/api/user/upload", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();

    clearInterval(interval);
    setProgress(100);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setProgress(0);

    setSrc(json["src"]);
    if (setValue && fieldName) setValue(fieldName, json["src"]);
  };

  return (
    <>
      <div className={cn("relative w-16 h-16", className)}>
        {src && !progress ? (
          <Image
            width={200}
            height={200}
            src={src}
            alt=""
            onClick={() => ref?.current?.click()}
            className="cursor-pointer rounded-full h-full"
          />
        ) : (
          <Button
            type="button"
            onClick={() => ref?.current?.click()}
            className="rounded-full w-full h-full"
            variant="secondary"
          >
            <Upload className={cn(progress ? "animate-bounce" : "")} />
          </Button>
        )}
        {!!progress && (
          <Progress
            value={progress}
            className="[&>div]:duration-500 h-[2px] absolute -bottom-1"
          />
        )}
      </div>
      <Input value={src} className="hidden" {...field} />
      <input
        onChange={handleChange}
        multiple={false}
        ref={ref}
        type="file"
        hidden
      />
    </>
  );
}
