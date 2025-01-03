"use client";

import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { BookA, Layers, List, PanelsTopLeft } from "lucide-react";
import NavNormal from "./nav-normal";
import { learnFeatures } from "@/config/features";
import NavNested, { NavNestedItem } from "./nav-nested";

const applications = [
  {
    title: "Dictionary",
    href: "/dictionary",
    Icon: BookA,
  },
];

const dashboard: NavNestedItem[] = [
  {
    title: "Daily Words",
    href: "/dashboard/daily-words",
    Icon: Layers,
    items: [
      {
        title: "Overview",
        href: "/dashboard/daily-words/overview",
        Icon: PanelsTopLeft,
      },
      {
        title: "Listing",
        href: "/dashboard/daily-words/list",
        Icon: List,
      },
    ],
  },
];

export function AppSidebar() {
  // On mobile
  //  - always display
  //  - default is closed
  //
  // On desktop
  //  - only display on /dashboard
  //    - default is open

  const { isMobile, setOpen } = useSidebar();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const display = isMobile || isDashboard;

  useEffect(() => {
    if (isDashboard && !isMobile) setOpen(true);
  }, [pathname]);

  return (
    <>
      {display && (
        <Sidebar collapsible="icon">
          <SidebarContent className="bg-background">
            <NavNested
              pathname={pathname}
              items={dashboard}
              label="Dashboard"
            />
            <NavNormal
              pathname={pathname}
              items={applications}
              label="Applications"
            />
            <NavNormal
              pathname={pathname}
              items={learnFeatures}
              label="Learn"
            />
          </SidebarContent>
        </Sidebar>
      )}
    </>
  );
}
