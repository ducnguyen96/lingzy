import { Bookmark } from "lucide-react";
import { Suspense } from "react";
import { Wordlist, WordlistsFallback } from "./wordlist";
import { WordListEntity } from "@/lib/server/services/word-list";

async function Wordlists() {
  const bookmarkWL: WordListEntity[] = await new Promise((resolve) =>
    setTimeout(() => resolve([]), 1000),
  );
  return (
    <div className="grid grid-flow-col auto-cols-max gap-6">
      {bookmarkWL.map((wl, idx) => (
        <Wordlist
          key={idx}
          isBookmark
          entity={wl}
          className="col-span-8 md:col-span-4 xl:col-span-2"
        />
      ))}
    </div>
  );
}

export default function BookmarkWordlists() {
  return (
    <div className="p-6 space-y-6 bg-primary/10 text-lg font-semibold rounded-3xl">
      <div className="flex gap-2 items-center">
        <Bookmark />
        <span>Bookmarked Wordlists:</span>
        <span>Bookmarked Wordlists</span>
      </div>
      <Suspense fallback={<WordlistsFallback />}>
        <Wordlists />
      </Suspense>
    </div>
  );
}
