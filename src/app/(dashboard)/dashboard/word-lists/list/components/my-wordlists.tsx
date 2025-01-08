import { Bookmark, Plus } from "lucide-react";
import { Suspense } from "react";
import { Wordlist, WordlistsFallback } from "./wordlist";
import { getMyWordlists } from "@/lib/server/queries/user/word-lists";
import AddNewWordListDialog from "@/components/wordlist/add-new-wordlist-dialog";
import { Button } from "@/components/ui/button";

async function Wordlists() {
  const myWL = await getMyWordlists();
  return (
    <div className="grid grid-cols-16 gap-4">
      <AddNewWordListDialog
        className="col-span-8 md:col-span-4 xl:col-span-2"
        triggerButton={
          <Button className="rounded-3xl w-full h-full" variant="secondary">
            <div className="p-6 rounded-full bg-primary/10">
              <Plus />
            </div>
          </Button>
        }
      />
      {myWL.map((wl, idx) => (
        <Wordlist
          key={idx}
          entity={wl}
          className="col-span-8 md:col-span-4 xl:col-span-2"
        />
      ))}
    </div>
  );
}

export default function MyWordlists() {
  return (
    <div className="p-6 space-y-6 bg-primary/10 text-lg font-semibold">
      <div className="flex gap-2 items-center">
        <Bookmark />
        <span>Created by me:</span>
      </div>
      <Suspense fallback={<WordlistsFallback />}>
        <Wordlists />
      </Suspense>
    </div>
  );
}
