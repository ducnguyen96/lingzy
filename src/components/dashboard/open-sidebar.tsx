"use client";

import { useEffect } from "react";
import { useSidebar } from "../ui/sidebar";

export default function OpenSidebar() {
  const { toggleSidebar, open } = useSidebar();
  useEffect(() => {
    if (!open) toggleSidebar();
  }, []);

  return <></>;
}
