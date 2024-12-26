import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import UserButton from "../user-button";
import { ModeToggle } from "../mode-toggle";
import { learnFeatures } from "@/config/features";
import { cn } from "@/lib/utils";

const { SITE_NAME } = process.env;

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 py-10 md:p-12 lg:px-28 xl:px-52 2xl:px-80">
      <div className="flex items-center gap-4">
        <Link href="/" prefetch={true}>
          <div className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2666C8] via-[#9465e7] to-[#9465E7] dark:from-[#56AEFF] dark:to-55% dark:to-[#B57AFF]">
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
            <NavigationMenuItem>
              <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
              <NavigationMenuContent>
                {learnFeatures.map(({ title, href, color }, idx) => (
                  <Link key={idx} href={href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        color.icon,
                        "w-full",
                      )}
                    >
                      {title}
                    </NavigationMenuLink>
                  </Link>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <SidebarTrigger className="md:hidden" />
        <div className="hidden md:block cursor-pointer">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
