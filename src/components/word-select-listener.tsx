"use client";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function WordSelectListener() {
  const [selectionInfo, setSelectionInfo] = useState({
    text: "",
    top: 0,
    left: 0,
    show: false,
  });

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setSelectionInfo((prev) => ({ ...prev, show: false }));
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const container = document.querySelector("main");
      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      setSelectionInfo({
        text: selection.toString(),
        top: rect.top - containerRect.top + container.scrollTop,
        left: rect.left - containerRect.left + rect.width / 2,
        show: true,
      });
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("keyup", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("keyup", handleSelection);
    };
  }, []);
  return (
    <Popover open>
      <PopoverTrigger asChild>
        <span
          style={{
            position: "absolute",
            top: `${selectionInfo.top}px`,
            left: `${selectionInfo.left}px`,
            width: 0,
            height: 0,
          }}
        />
      </PopoverTrigger>
      <PopoverContent
        align="center"
        side="top"
        className={selectionInfo.show ? "p-0 w-fit flex" : "hidden"}
      >
        <Separator orientation="vertical" className="h-fit" />
        <Button variant="ghost" size="icon">
          <Save />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
