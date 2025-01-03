import { ChevronRight, LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { NavNormalItem } from "./nav-normal";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NavNestedItem {
  title: string;
  href: string;
  Icon: LucideIcon;
  items: NavNormalItem[];
}

interface NavNestedProps {
  label: string;
  pathname: string;
  items: NavNestedItem[];
}

export default function NavNested(props: NavNestedProps) {
  const { label, pathname, items } = props;
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base">{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(({ items, title, href, Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Collapsible
              key={title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={title}
                    className={cn("p-4 py-6 [&>svg]:size-5 rounded-3xl")}
                  >
                    <Icon />
                    <span className="text-base">{title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {items.map(({ Icon, href, title }) => {
                      const isActive = pathname.startsWith(href);
                      return (
                        <SidebarMenuSubItem key={title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive}
                            className={cn(
                              "p-4 py-6 rounded-3xl",
                              isActive ? "!text-purple-500 !bg-primary/10" : "",
                            )}
                          >
                            <Link href={href} className="[&>svg]:size-5">
                              <Icon
                                className={isActive ? "!text-purple-500" : ""}
                              />
                              <span className="text-base">{title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
