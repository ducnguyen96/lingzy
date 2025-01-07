"use client";

import { CalendarSync } from "lucide-react";
import { addToDailyWords } from "@/lib/server/mutations/user/daily-words";
import { toast } from "sonner";
import UserActionButton from "../user-action-button";
import AddToWordListDialog from "../wordlist/add-to-wordlist-dialog";

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
      <AddToWordListDialog
        title="Add to your WordLists"
        translationId={translationId}
      />
    </div>
  );
}
