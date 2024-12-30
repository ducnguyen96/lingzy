"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CalendarSync, Folders, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { ReactNode, useActionState } from "react";
import { addToDailyWords } from "@/lib/server/mutations/user/daily-words";
import { addToWordLists } from "@/lib/server/mutations/user/word-lists";
import { toast } from "sonner";

interface UserActionButtonProps {
  tooltip: string;
  icon: ReactNode;
  action: () => void;
}

function UserActionButton(props: UserActionButtonProps) {
  const { tooltip, icon, action } = props;
  const [, formAction, isPending] = useActionState(action, undefined);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <form>
          <Button
            variant="ghost"
            size="icon"
            disabled={isPending}
            formAction={formAction}
          >
            {isPending ? <Loader2 className="animate-spin" /> : icon}
          </Button>
        </form>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface UserActionProps {
  translationId: number;
}

export default function UserActionBlock({ translationId }: UserActionProps) {
  return (
    <div className="flex items-center gap-2 text-primary">
      <UserActionButton
        tooltip="Add to daily words"
        icon={<CalendarSync />}
        action={async () => {
          const res = await addToDailyWords(translationId);
          toast(res.message);
        }}
      />
      <UserActionButton
        tooltip="Add to word lists"
        icon={<Folders />}
        action={() => addToWordLists()}
      />
    </div>
  );
}
