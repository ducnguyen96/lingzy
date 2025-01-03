import { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NavNormalItem {
  title: string;
  href: string;
  Icon: LucideIcon;
}

interface NavNormalProps {
  label: string;
  pathname: string;
  items: NavNormalItem[];
}

export default function NavNormal(props: NavNormalProps) {
  const { label, items, pathname } = props;
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base">{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {items.map(({ title, href, Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <SidebarMenuItem key={title} className="">
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(href)}
                  className={cn(
                    "p-4 py-6 rounded-3xl",
                    isActive ? "!text-purple-500 !bg-primary/10" : "",
                  )}
                >
                  <Link href={href} className="[&>svg]:size-5">
                    <Icon />
                    <span className="text-base">{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
