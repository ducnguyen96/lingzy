import { Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useEffect, useState } from "react";
import { DictContent } from "./dictionary/content";
import { WordEntity } from "@/lib/server/services/dictionary";
import { ScrollArea } from "./ui/scroll-area";

export default function DictContentDialog(props: { word: string }) {
  const [entity, setEntity] = useState<WordEntity | undefined>(undefined);

  const { word } = props;
  const lowercased = word.trim().toLowerCase();

  useEffect(() => {
    if (lowercased.length)
      fetch(`/api/dictionary?q=${lowercased}&lang=en`, {
        cache: "force-cache",
      })
        .then((res) => res.json())
        .then((json) => setEntity(json.data));
  }, [lowercased]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Query result for: {word}</DialogTitle>
        </DialogHeader>
        {entity ? (
          <ScrollArea className="w-full min-h-80 max-h-[80vh] select-none">
            <DictContent {...entity} />
          </ScrollArea>
        ) : (
          <span>No Result</span>
        )}
      </DialogContent>
    </Dialog>
  );
}
