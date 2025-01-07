import { ReactNode, useActionState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface UserActionButtonProps {
  tooltip: string;
  icon: ReactNode;
  action: () => void;
}

export default function UserActionButton(props: UserActionButtonProps) {
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
            className="[&_svg]:size-5"
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
