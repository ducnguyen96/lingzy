import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import UserButton from "../user-button";
import { ModeToggle } from "../mode-toggle";

const { SITE_NAME } = process.env;

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 md:p-12 lg:px-28 xl:px-52">
      <div className="flex items-center gap-4">
        <Link href="/" prefetch={true}>
          <div className="font-bold text-xl lg:text-2xl text-blue-500">
            {SITE_NAME}
          </div>
        </Link>
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dictionary" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dictionary
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <SidebarTrigger className="md:hidden" />
        <div className="hidden md:block">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
