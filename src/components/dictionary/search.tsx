"use client";

import { WordEntity } from "@/lib/server/services/dictionary";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import Image from "next/image";

export default function DictSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const [state, formAction, isPending] = useActionState(async () => {
    const resp = await fetch(`/api/dictionary?s=${debouncedTerm}&lang=en`);

    const json = await resp.json();
    return json.data as WordEntity[];
  }, []);

  const [, startTransition] = useTransition();

  useEffect(() => {
    const dictContent = document.getElementById("dict-content");
    if (!debouncedTerm && dictContent) dictContent.style.display = "block";
    if (!debouncedTerm) return;

    startTransition(() => {
      formAction();
    });

    if (dictContent) dictContent.style.display = "none";
  }, [formAction, debouncedTerm]);

  return (
    <div className="py-10">
      <div className="md:px-16 lg:px-32 xl:px-64">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.trim())}
          placeholder="Search"
          className="rounded-3xl p-6"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {isPending &&
          [...Array(Math.floor(Math.random() * 8) + 1)].map((_, idx) => (
            <Skeleton key={idx} className="h-60 rounded-lg" />
          ))}
        {debouncedTerm && !isPending && !state.length && <p>No result</p>}
        {state.map((word) => (
          <Link
            key={word.id}
            href={`/dictionary/en/${word.word}`}
            className={
              searchTerm ? "flex flex-col p-4 border rounded-lg" : "hidden"
            }
            onClick={() => setSearchTerm("")}
          >
            <Image
              src={
                word.translations[0].wordPhoto?.thumbnail ||
                "/assets/photo/no-photo.jpg"
              }
              width={512}
              height={512}
              alt={word.word}
              className="h-28 rounded-lg"
            />
            <div className="flex flex-1 flex-col justify-between space-y-2">
              <div className="flex flex-col space-y-2">
                <p className="text-lg font-semibold">{word.word}</p>
                <p>{word.translations[0].translation}</p>
              </div>
              <p className="text-lg font-bold">
                [ {word.translations[0].type} ]
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
