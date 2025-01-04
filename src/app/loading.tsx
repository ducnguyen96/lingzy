"use client";
import { useGlobalLoading } from "@/components/providers/global-loading-provider";
import { useEffect } from "react";

export default function Loading() {
  const { setLoading } = useGlobalLoading();
  useEffect(() => {
    setLoading(true);
    return () => {
      setLoading(false);
    };
  }, []);
}
