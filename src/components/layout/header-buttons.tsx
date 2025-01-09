import { SidebarTrigger } from "@/components/ui/sidebar";
import UserButton from "../user-button";
import { ModeToggle } from "../mode-toggle";

export default function HeaderButtons() {
  return (
    <div className="flex items-center gap-2">
      <ModeToggle />
      <SidebarTrigger />
      <UserButton />
    </div>
  );
}
