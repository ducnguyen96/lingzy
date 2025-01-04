"use client";

import { useGlobalLoading } from "./providers/global-loading-provider";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { ArrowDownToLine } from "lucide-react";

export default function GlobalLoadingIndicator() {
  const [progress, setProgress] = useState(0);
  const { loading } = useGlobalLoading();

  useEffect(() => {
    let interval;

    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 95) {
            return prev + Math.random() * 20;
          }
          return prev;
        });
      }, 200);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 300);
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <>
      {loading && (
        <div className="flex flex-col items-center gap-1 w-6 lg:w-8 fixed bottom-4 lg:bottom-8 right-4 lg:right-8 2xl:bottom-10 2xl:right-12">
          <ArrowDownToLine className="animate-bounce w-5 h-5" />
          <Progress value={progress} className="h-1" />
        </div>
      )}
    </>
  );
}
