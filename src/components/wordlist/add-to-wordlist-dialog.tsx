import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Folders } from "lucide-react";
import UserWordList from "./user-word-list";
import { useState } from "react";
import { WordListEntity } from "@/lib/server/services/word-list";

interface Props {
  translationId: number;
  title: string;
}

export default function AddToWordListDialog({ translationId, title }: Props) {
  const [open, setOpen] = useState(false);
  const [myWordLists, setMyWordLists] = useState<WordListEntity[]>([]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="[&_svg]:size-5">
              <Folders />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UserWordList
          myWordLists={myWordLists}
          setMyWordLists={setMyWordLists}
          translationId={translationId}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
